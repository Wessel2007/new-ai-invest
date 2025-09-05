/**
 * New AI Invest - Aplicativo de Gestão de Investimentos
 * 
 * Componente principal da aplicação que gerencia o estado global
 * e coordena a navegação entre diferentes seções.
 * 
 * @author Luiz Wessel
 * @version 1.0.0
 */

import React, { useState } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { exportToCSV, generateRebalancingPDF } from './utils/export';
import { calculateTotalPortfolio, calculateRebalancingWithContribution } from './utils/calculations';
import { loadSampleData } from './data/sampleData';
import AssetForm from './components/AssetForm';
import AssetTable from './components/AssetTable';
import AllocationConfig from './components/AllocationConfig';
import Dashboard from './components/Dashboard';
import RebalancingPlan from './components/RebalancingPlan';
import Insights from './components/Insights';
import ContributionInput from './components/ContributionInput';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  // ===== ESTADO GLOBAL DA APLICAÇÃO =====
  
  // Dados dos ativos do usuário (persistidos no localStorage)
  const [assets, setAssets] = useLocalStorage('assets', []);
  
  // Configuração de alocação ideal por classe de ativo
  const [idealAllocation, setIdealAllocation] = useLocalStorage('idealAllocation', {});
  
  // Valor de aporte planejado para simulações
  const [contribution, setContribution] = useLocalStorage('contribution', 0);
  
  // Estado da interface
  const [activeTab, setActiveTab] = useState('dashboard');
  const [editingAsset, setEditingAsset] = useState(null);
  const [showAssetForm, setShowAssetForm] = useState(false);

  // ===== HANDLERS DE GESTÃO DE ATIVOS =====
  
  /**
   * Adiciona um novo ativo ao portfólio
   * @param {Object} assetData - Dados do ativo (ticker, classe, quantidade, preço)
   */
  const handleAddAsset = (assetData) => {
    const newAsset = {
      id: Date.now().toString(), // ID único baseado em timestamp
      ...assetData
    };
    setAssets(prev => [...prev, newAsset]);
    setShowAssetForm(false);
  };

  /**
   * Edita um ativo existente no portfólio
   * @param {Object} assetData - Novos dados do ativo
   */
  const handleEditAsset = (assetData) => {
    setAssets(prev => prev.map(asset => 
      asset.id === editingAsset.id ? { ...asset, ...assetData } : asset
    ));
    setEditingAsset(null);
  };

  /**
   * Remove um ativo do portfólio
   * @param {string} assetId - ID do ativo a ser removido
   */
  const handleDeleteAsset = (assetId) => {
    setAssets(prev => prev.filter(asset => asset.id !== assetId));
  };

  /**
   * Inicia o processo de edição de um ativo
   * @param {Object} asset - Ativo a ser editado
   */
  const handleStartEdit = (asset) => {
    setEditingAsset(asset);
    setShowAssetForm(true);
  };

  /**
   * Cancela a edição de um ativo
   */
  const handleCancelEdit = () => {
    setEditingAsset(null);
    setShowAssetForm(false);
  };

  // ===== HANDLERS DE CONFIGURAÇÃO =====
  
  /**
   * Salva a configuração de alocação ideal
   * @param {Object} allocation - Objeto com percentuais por classe
   */
  const handleSaveAllocation = (allocation) => {
    setIdealAllocation(allocation);
  };

  // ===== HANDLERS DE EXPORTAÇÃO =====
  
  /**
   * Exporta os dados dos ativos para CSV
   */
  const handleExportCSV = () => {
    exportToCSV(assets);
  };

  /**
   * Gera relatório PDF do plano de rebalanceamento
   */
  const handleGeneratePDF = () => {
    const rebalancing = calculateRebalancingWithContribution(assets, idealAllocation, contribution);
    generateRebalancingPDF(assets, idealAllocation, rebalancing, contribution);
  };

  /**
   * Carrega dados de exemplo para demonstração
   */
  const handleLoadSampleData = () => {
    if (window.confirm('Isso irá substituir todos os dados atuais. Deseja continuar?')) {
      const sampleData = loadSampleData();
      setAssets(sampleData.assets);
      setIdealAllocation(sampleData.idealAllocation);
      setContribution(sampleData.contribution);
    }
  };

  // ===== CÁLCULOS E CONFIGURAÇÕES =====
  
  // Calcula o patrimônio total atual
  const totalPortfolio = calculateTotalPortfolio(assets);

  // Configuração das abas de navegação
  const tabs = [
    { id: 'dashboard', name: 'Dashboard', icon: '📊' },
    { id: 'assets', name: 'Ativos', icon: '💼' },
    { id: 'allocation', name: 'Alocação', icon: '⚖️' },
    { id: 'rebalancing', name: 'Rebalanceamento', icon: '🔄' },
    { id: 'insights', name: 'Insights', icon: '💡' }
  ];

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-900">
        {/* Header */}
        <header className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-white">
                🚀 New AI Invest
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-300">
                Patrimônio: <span className="font-medium text-primary-400">
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format(totalPortfolio)}
                </span>
              </div>
              <button
                onClick={handleLoadSampleData}
                className="btn-secondary text-sm"
              >
                📊 Dados de Exemplo
              </button>
              <button
                onClick={handleExportCSV}
                className="btn-secondary text-sm"
              >
                📄 Exportar CSV
              </button>
              <button
                onClick={handleGeneratePDF}
                className="btn-primary text-sm"
              >
                📋 Gerar PDF
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-400'
                    : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Dashboard</h2>
              <ContributionInput
                value={contribution}
                onChange={setContribution}
                className="flex gap-4"
              />
            </div>
            <Dashboard 
              assets={assets} 
              idealAllocation={idealAllocation} 
              contribution={contribution}
            />
          </div>
        )}

        {/* Assets Tab */}
        {activeTab === 'assets' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Gestão de Ativos</h2>
              <button
                onClick={() => setShowAssetForm(true)}
                className="btn-primary"
              >
                + Adicionar Ativo
              </button>
            </div>

            {showAssetForm && (
              <AssetForm
                asset={editingAsset}
                onSubmit={editingAsset ? handleEditAsset : handleAddAsset}
                onCancel={handleCancelEdit}
                isEditing={!!editingAsset}
              />
            )}

            <AssetTable
              assets={assets}
              onEdit={handleStartEdit}
              onDelete={handleDeleteAsset}
            />
          </div>
        )}

        {/* Allocation Tab */}
        {activeTab === 'allocation' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Configuração de Alocação Ideal</h2>
            <AllocationConfig
              idealAllocation={idealAllocation}
              onSave={handleSaveAllocation}
            />
          </div>
        )}

        {/* Rebalancing Tab */}
        {activeTab === 'rebalancing' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Plano de Rebalanceamento</h2>
              <ContributionInput
                value={contribution}
                onChange={setContribution}
                className="flex gap-4"
              />
            </div>
            <RebalancingPlan
              assets={assets}
              idealAllocation={idealAllocation}
              contribution={contribution}
            />
          </div>
        )}

        {/* Insights Tab */}
        {activeTab === 'insights' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Insights e Análises</h2>
              <ContributionInput
                value={contribution}
                onChange={setContribution}
                className="flex gap-4"
              />
            </div>
            <Insights
              assets={assets}
              idealAllocation={idealAllocation}
              contribution={contribution}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 border-t border-gray-700 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-gray-400">
            <p>New AI Invest - Gestão Inteligente de Patrimônio e Rebalanceamento</p>
            <p className="text-sm mt-1">
              Desenvolvido por Luiz Wessel • Dados salvos localmente no seu navegador
            </p>
          </div>
        </div>
      </footer>
      </div>
    </ErrorBoundary>
  );
}

export default App;
