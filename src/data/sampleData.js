/**
 * New AI Invest - Dados de Exemplo
 * 
 * Conjunto de dados de demonstração para mostrar as funcionalidades
 * da aplicação. Inclui ativos diversificados e alocação ideal realista.
 * 
 * @author Luiz Wessel
 * @version 1.0.0
 */

// Portfólio de exemplo com ativos diversificados
export const sampleAssets = [
  {
    id: '1',
    ticker: 'PETR4',
    class: 'Ações',
    quantity: 100,
    price: 32.50
  },
  {
    id: '2',
    ticker: 'VALE3',
    class: 'Ações',
    quantity: 50,
    price: 65.20
  },
  {
    id: '3',
    ticker: 'HGLG11',
    class: 'Fundos Imobiliários',
    quantity: 200,
    price: 95.80
  },
  {
    id: '4',
    ticker: 'BOVA11',
    class: 'Ações',
    quantity: 150,
    price: 110.45
  },
  {
    id: '5',
    ticker: 'CDI',
    class: 'Renda Fixa',
    quantity: 10000,
    price: 1.00
  },
  {
    id: '6',
    ticker: 'IVVB11',
    class: 'Internacional',
    quantity: 80,
    price: 125.30
  },
  {
    id: '7',
    ticker: 'BTC',
    class: 'Criptomoedas',
    quantity: 0.05,
    price: 200000.00
  }
];

export const sampleIdealAllocation = {
  'Ações': 40,
  'Fundos Imobiliários': 20,
  'Renda Fixa': 25,
  'Internacional': 10,
  'Criptomoedas': 5
};

// Função para carregar dados de exemplo
export const loadSampleData = () => {
  return {
    assets: sampleAssets,
    idealAllocation: sampleIdealAllocation,
    contribution: 5000
  };
};
