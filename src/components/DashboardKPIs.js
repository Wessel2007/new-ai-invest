import React from 'react';
import KPICard from './KPICard';
import { formatCurrency, formatPercentage } from '../utils/calculations';

const DashboardKPIs = ({ 
  totalPortfolio, 
  contribution, 
  maxDeviation, 
  maxDeviationClass, 
  totalWithContribution 
}) => {
  const icons = {
    portfolio: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
      </svg>
    ),
    contribution: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
    ),
    deviation: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
      </svg>
    ),
    total: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    )
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <KPICard
        title="Patrimônio Total"
        value={formatCurrency(totalPortfolio)}
        icon={icons.portfolio}
        color="primary"
      />
      
      <KPICard
        title="Aporte Planejado"
        value={formatCurrency(contribution)}
        icon={icons.contribution}
        color="success"
      />
      
      <KPICard
        title="Maior Desvio"
        value={formatPercentage(maxDeviation)}
        subtitle={maxDeviationClass}
        icon={icons.deviation}
        color="warning"
      />
      
      <KPICard
        title="Patrimônio + Aporte"
        value={formatCurrency(totalWithContribution)}
        icon={icons.total}
        color="primary"
      />
    </div>
  );
};

export default DashboardKPIs;
