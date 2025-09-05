// Utilitários de validação simplificados
export const validateAsset = (formData) => {
  const errors = {};

  // Validação de ticker
  if (!formData.ticker?.trim()) {
    errors.ticker = 'Ticker é obrigatório';
  } else if (formData.ticker.length > 20) {
    errors.ticker = 'Ticker deve ter no máximo 20 caracteres';
  } else if (!/^[A-Z0-9]+$/.test(formData.ticker.trim())) {
    errors.ticker = 'Ticker deve conter apenas letras maiúsculas e números';
  }

  // Validação de classe
  if (!formData.class) {
    errors.class = 'Classe é obrigatória';
  }

  // Validação de quantidade
  const quantity = parseFloat(formData.quantity);
  if (isNaN(quantity) || quantity <= 0) {
    errors.quantity = 'Quantidade deve ser um número maior que zero';
  } else if (quantity > 1000000) {
    errors.quantity = 'Quantidade não pode ser maior que 1.000.000';
  }

  // Validação de preço
  const price = parseFloat(formData.price);
  if (isNaN(price) || price <= 0) {
    errors.price = 'Preço deve ser um número maior que zero';
  } else if (price > 1000000) {
    errors.price = 'Preço não pode ser maior que 1.000.000';
  }

  return errors;
};

export const validateAllocation = (allocation) => {
  const errors = {};
  
  // Verificar se allocation é um objeto válido
  if (!allocation || typeof allocation !== 'object') {
    errors.total = 'Alocação inválida';
    return errors;
  }

  const total = Object.values(allocation).reduce((sum, value) => {
    const numValue = parseFloat(value);
    return sum + (isNaN(numValue) ? 0 : numValue);
  }, 0);
  
  if (Math.abs(total - 100) > 0.01) {
    errors.total = `A soma deve ser exatamente 100%. Atual: ${total.toFixed(2)}%`;
  }

  Object.keys(allocation).forEach(className => {
    const value = parseFloat(allocation[className]);
    
    if (isNaN(value)) {
      errors[className] = 'Valor deve ser um número válido';
    } else if (value < 0) {
      errors[className] = 'Valor não pode ser negativo';
    } else if (value > 100) {
      errors[className] = 'Valor não pode ser maior que 100%';
    }
  });

  return errors;
};
