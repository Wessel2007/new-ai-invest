import React from 'react';
import { usePortfolioCalculations } from '../hooks/usePortfolioCalculations';
import { formatPercentage, formatCurrency } from '../utils/calculations';

const Insights = ({ assets, idealAllocation, contribution = 0 }) => {
  const {
    totalPortfolio,
    allocationDifference,
    diversificationScore,
    rebalancingInsights
  } = usePortfolioCalculations(assets, idealAllocation, contribution);

  // Encontrar classe mais acima e abaixo do ideal
  const sortedDifferences = Object.entries(allocationDifference)
    .sort(([, a], [, b]) => b - a);

  const mostAboveIdeal = sortedDifferences[0];
  const mostBelowIdeal = sortedDifferences[sortedDifferences.length - 1];

  return (
    <div className="space-y-6">
      {/* Insights Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Classe mais desbalanceada */}
        <div className="card">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <svg className="h-5 w-5 text-warning-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Maior Desvio
          </h3>
          
          {mostAboveIdeal && Math.abs(mostAboveIdeal[1]) > 0.1 && (
            <div className="space-y-3">
              <div className="p-4 bg-warning-900/30 border border-warning-700 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-warning-300">
                    {mostAboveIdeal[0]}
                  </span>
                  <span className={`font-bold ${
                    mostAboveIdeal[1] > 0 ? 'text-warning-400' : 'text-success-400'
                  }`}>
                    {mostAboveIdeal[1] > 0 ? '+' : ''}{formatPercentage(mostAboveIdeal[1])}
                  </span>
                </div>
                <p className="text-sm text-warning-200">
                  {mostAboveIdeal[1] > 0 
                    ? `Acima do ideal em ${formatPercentage(mostAboveIdeal[1])}`
                    : `Abaixo do ideal em ${formatPercentage(Math.abs(mostAboveIdeal[1]))}`
                  }
                </p>
              </div>
            </div>
          )}

          {mostBelowIdeal && mostBelowIdeal[0] !== mostAboveIdeal[0] && Math.abs(mostBelowIdeal[1]) > 0.1 && (
            <div className="p-4 bg-success-900/30 border border-success-700 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-success-300">
                  {mostBelowIdeal[0]}
                </span>
                <span className={`font-bold ${
                  mostBelowIdeal[1] > 0 ? 'text-warning-400' : 'text-success-400'
                }`}>
                  {mostBelowIdeal[1] > 0 ? '+' : ''}{formatPercentage(mostBelowIdeal[1])}
                </span>
              </div>
              <p className="text-sm text-success-200">
                {mostBelowIdeal[1] > 0 
                  ? `Acima do ideal em ${formatPercentage(mostBelowIdeal[1])}`
                  : `Abaixo do ideal em ${formatPercentage(Math.abs(mostBelowIdeal[1]))}`
                }
              </p>
            </div>
          )}
        </div>

        {/* Score de Diversificação */}
        <div className="card">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <svg className="h-5 w-5 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Diversificação
          </h3>
          
          <div className="text-center">
            <div className={`text-4xl font-bold mb-2 ${
              diversificationScore >= 70 ? 'text-success-400' :
              diversificationScore >= 50 ? 'text-warning-400' : 'text-danger-400'
            }`}>
              {diversificationScore.toFixed(0)}
            </div>
            <div className="text-gray-400 mb-4">Pontuação de Diversificação</div>
            
            <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
              <div 
                className={`h-2 rounded-full transition-all duration-300 ${
                  diversificationScore >= 70 ? 'bg-success-500' :
                  diversificationScore >= 50 ? 'bg-warning-500' : 'bg-danger-500'
                }`}
                style={{ width: `${diversificationScore}%` }}
              />
            </div>
            
            <p className="text-sm text-gray-400">
              {diversificationScore >= 70 ? 'Excelente diversificação!' :
               diversificationScore >= 50 ? 'Boa diversificação' :
               'Considere diversificar mais'}
            </p>
          </div>
        </div>
      </div>

      {/* Ações de Rebalanceamento */}
      {rebalancingInsights.length > 0 && (
        <div className="card">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <svg className="h-5 w-5 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
            Ações Recomendadas
          </h3>
          
          <div className="space-y-3">
            {rebalancingInsights.slice(0, 5).map((insight, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${
                    insight.diff > 0 ? 'bg-warning-400' : 'bg-success-400'
                  }`} />
                  <span className="font-medium text-gray-300">
                    {insight.className}
                  </span>
                </div>
                <div className="text-right">
                  <div className={`font-medium ${
                    insight.diff > 0 ? 'text-warning-400' : 'text-success-400'
                  }`}>
                    {insight.action} {formatCurrency(insight.amount)}
                  </div>
                  <div className="text-sm text-gray-400">
                    {formatPercentage(Math.abs(insight.diff))} do patrimônio
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Resumo do Aporte */}
      {contribution > 0 && (
        <div className="card">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <svg className="h-5 w-5 text-success-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Impacto do Aporte
          </h3>
          
          <div className="p-4 bg-success-900/30 border border-success-700 rounded-lg">
            <p className="text-success-200 mb-2">
              Com um aporte de <strong>{formatCurrency(contribution)}</strong>, 
              seu patrimônio total aumentará para <strong>{formatCurrency(totalPortfolio + contribution)}</strong>.
            </p>
            <p className="text-sm text-success-300">
              Isso representa um aumento de {formatPercentage((contribution / totalPortfolio) * 100)} 
              no seu patrimônio atual.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Insights;
