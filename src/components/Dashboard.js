import React from 'react';
import { usePortfolioCalculations } from '../hooks/usePortfolioCalculations';
import DashboardKPIs from './DashboardKPIs';
import AllocationCharts from './AllocationCharts';

const Dashboard = ({ assets, idealAllocation, contribution = 0 }) => {
  const {
    totalPortfolio,
    currentAllocation,
    allocationDifference,
    maxDeviation,
    maxDeviationClass,
    totalWithContribution
  } = usePortfolioCalculations(assets, idealAllocation, contribution);

  return (
    <div className="space-y-6">
      <DashboardKPIs
        totalPortfolio={totalPortfolio}
        contribution={contribution}
        maxDeviation={maxDeviation}
        maxDeviationClass={maxDeviationClass}
        totalWithContribution={totalWithContribution}
      />
      
      <AllocationCharts
        currentAllocation={currentAllocation}
        allocationDifference={allocationDifference}
      />
    </div>
  );
};

export default Dashboard;
