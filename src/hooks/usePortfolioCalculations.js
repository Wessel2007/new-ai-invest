import { useMemo } from 'react';
import { 
  calculateTotalPortfolio, 
  calculateAllocationByClass, 
  calculateAllocationDifference,
  calculateRebalancingWithContribution
} from '../utils/calculations';

export const usePortfolioCalculations = (assets, idealAllocation, contribution = 0) => {
  return useMemo(() => {
    const totalPortfolio = calculateTotalPortfolio(assets);
    const currentAllocation = calculateAllocationByClass(assets);
    const allocationDifference = calculateAllocationDifference(currentAllocation, idealAllocation);
    const rebalancing = calculateRebalancingWithContribution(assets, idealAllocation, contribution);
    const totalWithContribution = totalPortfolio + contribution;

    // KPIs calculados
    const deviationValues = Object.values(allocationDifference).map(Math.abs);
    const maxDeviation = deviationValues.length > 0 ? Math.max(...deviationValues) : 0;
    const maxDeviationClass = Object.entries(allocationDifference)
      .find(([, diff]) => Math.abs(diff) === maxDeviation)?.[0];

    // Diversificação
    const numClasses = Object.keys(currentAllocation).length;
    const allocationValues = Object.values(currentAllocation);
    const maxAllocation = allocationValues.length > 0 ? Math.max(...allocationValues) : 0;
    const diversificationScore = numClasses > 0 ? (1 - maxAllocation / 100) * 100 : 0;

    // Insights de rebalanceamento
    const rebalancingInsights = Object.entries(allocationDifference)
      .filter(([, diff]) => Math.abs(diff) > 1)
      .map(([className, diff]) => ({
        className,
        diff,
        action: diff > 0 ? 'reduzir' : 'aumentar',
        amount: Math.abs(diff) * totalPortfolio / 100
      }))
      .sort((a, b) => Math.abs(b.diff) - Math.abs(a.diff));

    return {
      totalPortfolio,
      currentAllocation,
      allocationDifference,
      rebalancing,
      totalWithContribution,
      maxDeviation,
      maxDeviationClass,
      diversificationScore,
      rebalancingInsights
    };
  }, [assets, idealAllocation, contribution]);
};
