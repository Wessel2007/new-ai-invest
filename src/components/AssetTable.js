import React from 'react';
import { formatCurrency, calculateAssetValue } from '../utils/calculations';

const AssetTable = ({ assets, onEdit, onDelete }) => {
  const handleEdit = (asset) => {
    onEdit(asset);
  };

  const handleDelete = (assetId) => {
    if (window.confirm('Tem certeza que deseja excluir este ativo?')) {
      onDelete(assetId);
    }
  };

  if (assets.length === 0) {
    return (
      <div className="card text-center py-12">
        <div className="text-gray-400 mb-4">
          <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-300 mb-2">
          Nenhum ativo cadastrado
        </h3>
        <p className="text-gray-400">
          Adicione seus primeiros ativos para começar a acompanhar seu patrimônio.
        </p>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="table-header">
              <th className="table-cell text-left">Ticker</th>
              <th className="table-cell text-left">Classe</th>
              <th className="table-cell text-right">Quantidade</th>
              <th className="table-cell text-right">Preço</th>
              <th className="table-cell text-right">Valor Total</th>
              <th className="table-cell text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {assets.map((asset) => {
              const totalValue = calculateAssetValue(asset.quantity, asset.price);
              
              return (
                <tr key={asset.id} className="hover:bg-gray-700/50">
                  <td className="table-cell font-medium text-primary-400">
                    {asset.ticker}
                  </td>
                  <td className="table-cell">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-600 text-gray-200">
                      {asset.class}
                    </span>
                  </td>
                  <td className="table-cell text-right">
                    {asset.quantity.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="table-cell text-right">
                    {formatCurrency(asset.price)}
                  </td>
                  <td className="table-cell text-right font-medium">
                    {formatCurrency(totalValue)}
                  </td>
                  <td className="table-cell text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handleEdit(asset)}
                        className="text-primary-400 hover:text-primary-300 transition-colors"
                        title="Editar"
                      >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDelete(asset.id)}
                        className="text-danger-400 hover:text-danger-300 transition-colors"
                        title="Excluir"
                      >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssetTable;
