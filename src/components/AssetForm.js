import React, { useState } from 'react';
import { getAssetClasses } from '../utils/calculations';
import { validateAsset } from '../utils/validation';

const AssetForm = ({ asset, onSubmit, onCancel, isEditing = false }) => {
  const [formData, setFormData] = useState({
    ticker: asset?.ticker || '',
    class: asset?.class || '',
    quantity: asset?.quantity || '',
    price: asset?.price || ''
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = validateAsset(formData);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit({
        ...formData,
        quantity: parseFloat(formData.quantity),
        price: parseFloat(formData.price)
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Sanitização de entrada
    let sanitizedValue = value;
    
    if (name === 'ticker') {
      // Apenas letras maiúsculas e números para ticker
      sanitizedValue = value.toUpperCase().replace(/[^A-Z0-9]/g, '');
    } else if (name === 'quantity' || name === 'price') {
      // Apenas números, ponto e vírgula para quantidades e preços
      sanitizedValue = value.replace(/[^0-9.,]/g, '');
      // Substituir vírgula por ponto para consistência
      sanitizedValue = sanitizedValue.replace(',', '.');
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: sanitizedValue
    }));
    
    // Limpar erro do campo quando usuário começar a digitar
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <div className="card">
      <h3 className="text-xl font-semibold mb-4">
        {isEditing ? 'Editar Ativo' : 'Adicionar Ativo'}
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Ticker *
          </label>
          <input
            type="text"
            name="ticker"
            value={formData.ticker}
            onChange={handleChange}
            className={`input-field w-full ${errors.ticker ? 'border-danger-500' : ''}`}
            placeholder="Ex: PETR4, BOVA11, CDI"
          />
          {errors.ticker && (
            <p className="text-danger-500 text-sm mt-1">{errors.ticker}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Classe *
          </label>
          <select
            name="class"
            value={formData.class}
            onChange={handleChange}
            className={`input-field w-full ${errors.class ? 'border-danger-500' : ''}`}
          >
            <option value="">Selecione uma classe</option>
            {getAssetClasses().map(className => (
              <option key={className} value={className}>
                {className}
              </option>
            ))}
          </select>
          {errors.class && (
            <p className="text-danger-500 text-sm mt-1">{errors.class}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Quantidade *
            </label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              step="0.01"
              min="0"
              className={`input-field w-full ${errors.quantity ? 'border-danger-500' : ''}`}
              placeholder="0.00"
            />
            {errors.quantity && (
              <p className="text-danger-500 text-sm mt-1">{errors.quantity}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Preço *
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              step="0.01"
              min="0"
              className={`input-field w-full ${errors.price ? 'border-danger-500' : ''}`}
              placeholder="0.00"
            />
            {errors.price && (
              <p className="text-danger-500 text-sm mt-1">{errors.price}</p>
            )}
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <button type="submit" className="btn-primary flex-1">
            {isEditing ? 'Atualizar' : 'Adicionar'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="btn-secondary flex-1"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default AssetForm;
