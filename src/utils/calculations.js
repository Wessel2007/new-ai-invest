/**
 * New AI Invest - Utilitários de Cálculos Financeiros
 * 
 * Módulo responsável por todos os cálculos matemáticos e financeiros
 * da aplicação, incluindo validações robustas e tratamento de erros.
 * 
 * @author Luiz Wessel
 * @version 1.0.0
 */

/**
 * Calcula o valor total de um ativo baseado na quantidade e preço
 * @param {number} quantity - Quantidade do ativo
 * @param {number} price - Preço unitário do ativo
 * @returns {number} Valor total do ativo (quantidade × preço)
 */
export const calculateAssetValue = (quantity, price) => {
  // Validação e sanitização de entrada
  const qty = parseFloat(quantity) || 0;
  const prc = parseFloat(price) || 0;
  
  // Verificar se os valores são válidos e não negativos
  if (isNaN(qty) || isNaN(prc) || qty < 0 || prc < 0) {
    return 0;
  }
  
  return qty * prc;
};

/**
 * Calcula o valor total do portfólio somando todos os ativos
 * @param {Array} assets - Array de objetos representando os ativos
 * @returns {number} Valor total do portfólio
 */
export const calculateTotalPortfolio = (assets) => {
  // Validação de entrada: deve ser um array
  if (!Array.isArray(assets)) {
    return 0;
  }
  
  // Soma o valor de todos os ativos válidos
  return assets.reduce((total, asset) => {
    // Verificar se asset tem as propriedades necessárias
    if (!asset || typeof asset !== 'object') {
      return total;
    }
    
    return total + calculateAssetValue(asset.quantity, asset.price);
  }, 0);
};

export const calculateAllocationByClass = (assets) => {
  const total = calculateTotalPortfolio(assets);
  if (total === 0) return {};

  const allocation = {};
  assets.forEach(asset => {
    // Verificar se asset tem classe válida
    if (!asset || !asset.class || typeof asset.class !== 'string') {
      return;
    }
    
    const value = calculateAssetValue(asset.quantity, asset.price);
    const percentage = (value / total) * 100;
    
    if (allocation[asset.class]) {
      allocation[asset.class] += percentage;
    } else {
      allocation[asset.class] = percentage;
    }
  });

  return allocation;
};

export const calculateAllocationDifference = (currentAllocation, idealAllocation) => {
  const difference = {};
  
  // Verificar se os parâmetros são objetos válidos
  const current = currentAllocation && typeof currentAllocation === 'object' ? currentAllocation : {};
  const ideal = idealAllocation && typeof idealAllocation === 'object' ? idealAllocation : {};
  
  // Incluir todas as classes (atuais e ideais)
  const allClasses = new Set([
    ...Object.keys(current),
    ...Object.keys(ideal)
  ]);

  allClasses.forEach(className => {
    const currentValue = parseFloat(current[className]) || 0;
    const idealValue = parseFloat(ideal[className]) || 0;
    difference[className] = currentValue - idealValue;
  });

  return difference;
};

export const calculateRebalancing = (assets, idealAllocation, totalPortfolio) => {
  const currentAllocation = calculateAllocationByClass(assets);
  const rebalancing = {};

  // Verificar se idealAllocation é válido
  if (!idealAllocation || typeof idealAllocation !== 'object') {
    return rebalancing;
  }

  Object.keys(idealAllocation).forEach(className => {
    const idealPercent = parseFloat(idealAllocation[className]) || 0;
    const currentPercent = parseFloat(currentAllocation[className]) || 0;
    
    const currentValue = (currentPercent * totalPortfolio) / 100;
    const idealValue = (idealPercent * totalPortfolio) / 100;
    rebalancing[className] = idealValue - currentValue;
  });

  return rebalancing;
};

export const calculateRebalancingWithContribution = (assets, idealAllocation, contribution) => {
  const totalPortfolio = calculateTotalPortfolio(assets);
  const contributionValue = parseFloat(contribution) || 0;
  const newTotal = totalPortfolio + contributionValue;
  
  const rebalancing = {};
  const currentAllocation = calculateAllocationByClass(assets);

  // Verificar se idealAllocation é válido
  if (!idealAllocation || typeof idealAllocation !== 'object') {
    return rebalancing;
  }

  Object.keys(idealAllocation).forEach(className => {
    const idealPercent = parseFloat(idealAllocation[className]) || 0;
    const currentPercent = parseFloat(currentAllocation[className]) || 0;
    
    const currentValue = (currentPercent * totalPortfolio) / 100;
    const idealValue = (idealPercent * newTotal) / 100;
    rebalancing[className] = idealValue - currentValue;
  });

  return rebalancing;
};

export const getAssetClasses = () => {
  return [
    'Ações',
    'Fundos Imobiliários',
    'Renda Fixa',
    'Internacional',
    'Criptomoedas',
    'Commodities',
    'Outros'
  ];
};

export const formatCurrency = (value) => {
  const numValue = parseFloat(value);
  if (isNaN(numValue)) {
    return 'R$ 0,00';
  }
  
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(numValue);
};

export const formatPercentage = (value) => {
  const numValue = parseFloat(value);
  if (isNaN(numValue)) {
    return '0,00%';
  }
  
  return `${numValue.toFixed(2)}%`;
};
