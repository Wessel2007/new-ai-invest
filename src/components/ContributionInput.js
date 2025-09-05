import React from 'react';

const ContributionInput = ({ value, onChange, className = "" }) => {
  const handleChange = (e) => {
    const inputValue = e.target.value;
    
    // Sanitizar entrada - apenas números, ponto e vírgula
    const sanitizedValue = inputValue.replace(/[^0-9.,]/g, '');
    const normalizedValue = sanitizedValue.replace(',', '.');
    
    // Converter para número
    const numValue = parseFloat(normalizedValue);
    
    // Validar e limitar valor
    if (isNaN(numValue)) {
      onChange(0);
    } else if (numValue < 0) {
      onChange(0);
    } else if (numValue > 10000000) { // Limite de 10 milhões
      onChange(10000000);
    } else {
      onChange(numValue);
    }
  };

  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-300 mb-1">
        Aporte Planejado
      </label>
      <input
        type="text"
        value={value || ''}
        onChange={handleChange}
        className="input-field w-40"
        placeholder="0.00"
        maxLength={12}
      />
    </div>
  );
};

export default ContributionInput;
