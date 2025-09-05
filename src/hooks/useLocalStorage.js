/**
 * New AI Invest - Hook de Persistência Local
 * 
 * Hook personalizado para gerenciar dados no localStorage com validação
 * robusta e tratamento de erros. Garante que os dados sejam sempre
 * válidos e do tipo esperado.
 * 
 * @author Luiz Wessel
 * @version 1.0.0
 */

import { useState } from 'react';

/**
 * Hook para persistência de dados no localStorage com validação
 * @param {string} key - Chave para armazenar no localStorage
 * @param {*} initialValue - Valor inicial caso não exista dados salvos
 * @returns {Array} [valor, setValor] - Similar ao useState
 */
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Verificar se localStorage está disponível
      if (typeof window === 'undefined' || !window.localStorage) {
        return initialValue;
      }
      
      const item = window.localStorage.getItem(key);
      if (item === null) {
        return initialValue;
      }
      
      const parsed = JSON.parse(item);
      
      // Validação básica de tipo
      if (key === 'assets' && !Array.isArray(parsed)) {
        return initialValue;
      }
      if (key === 'idealAllocation' && (typeof parsed !== 'object' || parsed === null)) {
        return initialValue;
      }
      if (key === 'contribution' && typeof parsed !== 'number') {
        return initialValue;
      }
      
      return parsed;
    } catch (error) {
      console.error(`Erro ao carregar ${key} do localStorage:`, error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      // Verificar se localStorage está disponível
      if (typeof window === 'undefined' || !window.localStorage) {
        return;
      }
      
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // Validação antes de salvar
      if (key === 'assets' && !Array.isArray(valueToStore)) {
        console.warn('Tentativa de salvar assets inválido');
        return;
      }
      if (key === 'idealAllocation' && (typeof valueToStore !== 'object' || valueToStore === null)) {
        console.warn('Tentativa de salvar alocação inválida');
        return;
      }
      if (key === 'contribution' && typeof valueToStore !== 'number') {
        console.warn('Tentativa de salvar contribuição inválida');
        return;
      }
      
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Erro ao salvar ${key} no localStorage:`, error);
    }
  };

  return [storedValue, setValue];
}
