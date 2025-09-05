// Utilitários para exportação de dados
// Função para escapar dados CSV e prevenir injection
const escapeCSV = (value) => {
  if (typeof value === 'string') {
    // Escapar aspas duplas e quebras de linha
    const escaped = value.replace(/"/g, '""').replace(/\n/g, ' ').replace(/\r/g, ' ');
    // Se contém vírgula, aspas ou quebra de linha, envolver em aspas
    if (escaped.includes(',') || escaped.includes('"') || escaped.includes('\n') || escaped.includes('\r')) {
      return `"${escaped}"`;
    }
    return escaped;
  }
  return value;
};

export const exportToCSV = (assets, filename = 'meus-investimentos.csv') => {
  const headers = ['Ticker', 'Classe', 'Quantidade', 'Preço', 'Valor Total'];
  
  const csvContent = [
    headers.join(','),
    ...assets.map(asset => [
      escapeCSV(asset.ticker),
      escapeCSV(asset.class),
      asset.quantity,
      asset.price,
      (asset.quantity * asset.price).toFixed(2)
    ].join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    // Limpar URL para evitar vazamentos de memória
    URL.revokeObjectURL(url);
  }
};

export const generateRebalancingPDF = (assets, idealAllocation, rebalancing, contribution = 0) => {
  // Esta função será implementada quando adicionarmos a biblioteca jsPDF
  console.log('Gerando PDF de rebalanceamento...', {
    assets,
    idealAllocation,
    rebalancing,
    contribution
  });
  
  // Por enquanto, apenas logamos os dados
  // Em uma implementação completa, usaríamos jsPDF para gerar o PDF
  alert('Funcionalidade de PDF será implementada em breve!');
};
