import React from 'react';
import { 
  calculateTotalPortfolio, 
  calculateRebalancingWithContribution,
  formatCurrency,
  formatPercentage
} from '../utils/calculations';

const RebalancingPlan = ({ assets, idealAllocation, contribution = 0 }) => {
  const totalPortfolio = calculateTotalPortfolio(assets);
  const rebalancing = calculateRebalancingWithContribution(assets, idealAllocation, contribution);

  const totalToBuy = Object.values(rebalancing)
    .filter(value => value > 0)
    .reduce((sum, value) => sum + value, 0);

  const totalToSell = Object.values(rebalancing)
    .filter(value => value < 0)
    .reduce((sum, value) => sum + Math.abs(value), 0);

  const netRebalancing = totalToBuy - totalToSell;

  return (
    <div className="card">
      <h3 className="text-xl font-semibold mb-4">
        Plano de Rebalanceamento
      </h3>
      
      {contribution > 0 && (
        <div className="mb-6 p-4 bg-primary-900/30 border border-primary-700 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <svg className="h-5 w-5 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-medium text-primary-300">Aporte Planejado</span>
          </div>
          <p className="text-primary-200">
            Com um aporte de <strong>{formatCurrency(contribution)}</strong>, 
            seu patrimônio total será de <strong>{formatCurrency(totalPortfolio + contribution)}</strong>.
          </p>
        </div>
      )}

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="text-center p-4 bg-success-900/30 border border-success-700 rounded-lg">
            <div className="text-2xl font-bold text-success-400">
              {formatCurrency(totalToBuy)}
            </div>
            <div className="text-sm text-success-300">Total para Comprar</div>
          </div>
          
          <div className="text-center p-4 bg-danger-900/30 border border-danger-700 rounded-lg">
            <div className="text-2xl font-bold text-danger-400">
              {formatCurrency(totalToSell)}
            </div>
            <div className="text-sm text-danger-300">Total para Vender</div>
          </div>
          
          <div className={`text-center p-4 rounded-lg border ${
            netRebalancing > 0 
              ? 'bg-success-900/30 border-success-700' 
              : netRebalancing < 0 
                ? 'bg-danger-900/30 border-danger-700'
                : 'bg-gray-800 border-gray-700'
          }`}>
            <div className={`text-2xl font-bold ${
              netRebalancing > 0 
                ? 'text-success-400' 
                : netRebalancing < 0 
                  ? 'text-danger-400'
                  : 'text-gray-400'
            }`}>
              {formatCurrency(Math.abs(netRebalancing))}
            </div>
            <div className={`text-sm ${
              netRebalancing > 0 
                ? 'text-success-300' 
                : netRebalancing < 0 
                  ? 'text-danger-300'
                  : 'text-gray-400'
            }`}>
              {netRebalancing > 0 ? 'Saldo Positivo' : netRebalancing < 0 ? 'Saldo Negativo' : 'Equilibrado'}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="table-header">
                <th className="table-cell text-left">Classe</th>
                <th className="table-cell text-right">Alocação Ideal</th>
                <th className="table-cell text-right">Valor Ideal</th>
                <th className="table-cell text-right">Ação</th>
                <th className="table-cell text-right">Valor</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(rebalancing).map(([className, value]) => {
                const idealPercentage = idealAllocation[className] || 0;
                const idealValue = (idealPercentage / 100) * (totalPortfolio + contribution);
                const action = value > 0 ? 'Comprar' : value < 0 ? 'Vender' : 'Manter';
                const actionColor = value > 0 ? 'text-success-400' : value < 0 ? 'text-danger-400' : 'text-gray-400';
                
                return (
                  <tr key={className} className="hover:bg-gray-700/50">
                    <td className="table-cell font-medium">{className}</td>
                    <td className="table-cell text-right">
                      {formatPercentage(idealPercentage)}
                    </td>
                    <td className="table-cell text-right">
                      {formatCurrency(idealValue)}
                    </td>
                    <td className={`table-cell text-right font-medium ${actionColor}`}>
                      {action}
                    </td>
                    <td className={`table-cell text-right font-medium ${actionColor}`}>
                      {value !== 0 ? formatCurrency(Math.abs(value)) : '-'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {Object.values(rebalancing).every(value => Math.abs(value) < 0.01) && (
          <div className="text-center py-8">
            <div className="text-success-400 mb-2">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h4 className="text-lg font-medium text-gray-300 mb-2">
              Portfólio Equilibrado!
            </h4>
            <p className="text-gray-400">
              Sua alocação atual está próxima da ideal. Não são necessárias operações de rebalanceamento.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RebalancingPlan;
