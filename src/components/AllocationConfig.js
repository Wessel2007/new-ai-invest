import React, { useState } from 'react';
import { getAssetClasses } from '../utils/calculations';
import { validateAllocation } from '../utils/validation';

const AllocationConfig = ({ idealAllocation, onSave }) => {
  const [allocation, setAllocation] = useState(idealAllocation);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = validateAllocation(allocation);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (className, value) => {
    setAllocation(prev => ({
      ...prev,
      [className]: value
    }));

    // Limpar erro quando usuário começar a digitar
    if (errors[className]) {
      setErrors(prev => ({
        ...prev,
        [className]: ''
      }));
    }
    if (errors.total) {
      setErrors(prev => ({
        ...prev,
        total: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSave(allocation);
    }
  };

  const addClass = () => {
    const availableClasses = getAssetClasses().filter(className => !allocation[className]);
    if (availableClasses.length > 0) {
      setAllocation(prev => ({
        ...prev,
        [availableClasses[0]]: 0
      }));
    }
  };

  const removeClass = (className) => {
    setAllocation(prev => {
      const newAllocation = { ...prev };
      delete newAllocation[className];
      return newAllocation;
    });
  };

  const calculateTotal = () => {
    return Object.values(allocation).reduce((sum, value) => sum + (parseFloat(value) || 0), 0);
  };

  const total = calculateTotal();

  return (
    <div className="card">
      <h3 className="text-xl font-semibold mb-4">
        Configuração de Alocação Ideal
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-3">
          {Object.keys(allocation).map(className => (
            <div key={className} className="flex items-center gap-3">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  {className}
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={allocation[className]}
                    onChange={(e) => handleChange(className, e.target.value)}
                    step="0.01"
                    min="0"
                    max="100"
                    className={`input-field flex-1 ${errors[className] ? 'border-danger-500' : ''}`}
                    placeholder="0.00"
                  />
                  <span className="text-gray-400">%</span>
                </div>
                {errors[className] && (
                  <p className="text-danger-500 text-sm mt-1">{errors[className]}</p>
                )}
              </div>
              <button
                type="button"
                onClick={() => removeClass(className)}
                className="text-danger-400 hover:text-danger-300 transition-colors mt-6"
                title="Remover classe"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>

        {Object.keys(allocation).length < getAssetClasses().length && (
          <button
            type="button"
            onClick={addClass}
            className="btn-secondary w-full"
          >
            + Adicionar Classe
          </button>
        )}

        <div className="border-t border-gray-700 pt-4">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-medium text-gray-300">Total:</span>
            <span className={`text-lg font-bold ${Math.abs(total - 100) < 0.01 ? 'text-success-400' : 'text-danger-400'}`}>
              {total.toFixed(2)}%
            </span>
          </div>
          
          {errors.total && (
            <p className="text-danger-500 text-sm mb-4">{errors.total}</p>
          )}

          <button type="submit" className="btn-primary w-full">
            Salvar Alocação Ideal
          </button>
        </div>
      </form>
    </div>
  );
};

export default AllocationConfig;
