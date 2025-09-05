# 🚀 New AI Invest

Um aplicativo web moderno e inteligente para gestão de patrimônio e rebalanceamento de investimentos, desenvolvido em React com Tailwind CSS. O New AI Invest utiliza algoritmos avançados para análise de portfólio e recomendações personalizadas de rebalanceamento.

## 👨‍💻 Desenvolvedor

**Luiz Wessel** - Estudante em IA na Faculdade Donaduzzi.

- 🐙 **GitHub**: [@Wessel2007](https://github.com/Wessel2007)
- 📧 **Email**: heyxist3r@gmail.com

## 🚀 Funcionalidades

### ✅ Gestão de Ativos
- **CRUD completo**: Cadastrar, editar e excluir ativos
- **Campos**: Ticker, classe, quantidade e preço
- **Validação**: Formulários com validação em tempo real
- **Persistência**: Dados salvos no localStorage do navegador

### ⚖️ Alocação Ideal
- **Configuração flexível**: Defina percentuais por classe de ativo
- **Validação**: Soma deve ser exatamente 100%
- **Classes disponíveis**: Ações, FIIs, Renda Fixa, Internacional, Criptomoedas, etc.

### 📊 Dashboard Interativo
- **KPIs principais**: Patrimônio total, aporte planejado, maior desvio
- **Gráfico de pizza**: Visualização da alocação atual
- **Gráfico de barras**: Desvios da alocação ideal
- **Cards informativos**: Métricas importantes em destaque

### 🔄 Rebalanceamento Inteligente
- **Cálculo automático**: Quanto comprar/vender em cada classe
- **Aporte planejado**: Simulação com valores de aporte
- **Plano detalhado**: Tabela com ações específicas por classe
- **Saldo líquido**: Resumo de compras vs vendas necessárias

### 💡 Insights Automáticos
- **Análise de desvios**: Classe mais acima/abaixo do ideal
- **Score de diversificação**: Pontuação baseada na distribuição
- **Ações recomendadas**: Lista priorizada de ajustes necessários
- **Impacto do aporte**: Análise do efeito de novos investimentos

### 📄 Exportação
- **CSV**: Exportar lista de ativos para planilhas
- **PDF**: Geração de relatório de rebalanceamento (em desenvolvimento)

### 🌙 Interface Moderna
- **Dark mode**: Tema escuro por padrão
- **Design responsivo**: Funciona em desktop e mobile
- **Tailwind CSS**: Interface moderna e consistente
- **UX otimizada**: Navegação intuitiva por abas

## 🛠️ Stack Tecnológica

### Frontend
- **React 18** - Framework principal com hooks modernos
- **Tailwind CSS** - Framework CSS utilitário para design responsivo
- **Recharts** - Biblioteca de gráficos interativos e responsivos
- **JavaScript ES6+** - Linguagem moderna com recursos avançados

### Persistência e Dados
- **LocalStorage API** - Armazenamento local seguro
- **JSON** - Serialização de dados estruturados
- **Validação Robusta** - Sanitização e validação de entrada

### Ferramentas de Desenvolvimento
- **Create React App** - Boilerplate e build system
- **PostCSS** - Processamento de CSS
- **ESLint** - Linting e qualidade de código
- **Git** - Controle de versão

### Segurança
- **Error Boundaries** - Captura e tratamento de erros
- **Input Sanitization** - Prevenção de ataques de injeção
- **Data Validation** - Validação robusta de tipos e valores

## 📦 Instalação

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/luizwessel/new-ai-invest.git
   cd new-ai-invest
   ```

2. **Instale as dependências**:
   ```bash
   npm install
   ```

3. **Execute o projeto**:
   ```bash
   npm start
   ```

4. **Acesse no navegador**:
   ```
   http://localhost:3000
   ```

## 🎯 Como Usar

### 1. Cadastrar Ativos
- Vá para a aba "Ativos"
- Clique em "Adicionar Ativo"
- Preencha: ticker, classe, quantidade e preço
- Salve o ativo

### 2. Configurar Alocação Ideal
- Vá para a aba "Alocação"
- Defina os percentuais desejados para cada classe
- Certifique-se de que a soma seja 100%
- Salve a configuração

### 3. Acompanhar Dashboard
- Na aba "Dashboard", visualize:
  - Patrimônio total atual
  - Gráficos de alocação
  - KPIs importantes
- Ajuste o "Aporte Planejado" para simulações

### 4. Planejar Rebalanceamento
- Na aba "Rebalanceamento", veja:
  - Quanto comprar/vender em cada classe
  - Plano detalhado de ações
  - Saldo líquido de operações

### 5. Analisar Insights
- Na aba "Insights", encontre:
  - Classes mais desbalanceadas
  - Score de diversificação
  - Ações recomendadas
  - Impacto de aportes

## 📊 Arquitetura do Projeto

```
new-ai-invest/
├── public/                 # Arquivos estáticos
│   └── index.html         # Template HTML principal
├── src/                   # Código fonte da aplicação
│   ├── components/        # Componentes React reutilizáveis
│   │   ├── AssetForm.js          # Formulário de cadastro/edição de ativos
│   │   ├── AssetTable.js         # Tabela de exibição de ativos
│   │   ├── AllocationConfig.js   # Configuração de alocação ideal
│   │   ├── Dashboard.js          # Dashboard principal com KPIs
│   │   ├── DashboardKPIs.js      # Cards de métricas principais
│   │   ├── AllocationCharts.js   # Gráficos de alocação
│   │   ├── RebalancingPlan.js    # Plano de rebalanceamento
│   │   ├── Insights.js           # Análises e insights automáticos
│   │   ├── ContributionInput.js  # Input de aporte reutilizável
│   │   ├── KPICard.js            # Card de métrica reutilizável
│   │   └── ErrorBoundary.js      # Captura de erros React
│   ├── hooks/             # Hooks customizados
│   │   ├── useLocalStorage.js        # Hook para persistência local
│   │   └── usePortfolioCalculations.js # Hook para cálculos otimizados
│   ├── utils/             # Utilitários e helpers
│   │   ├── calculations.js    # Cálculos financeiros e matemáticos
│   │   ├── validation.js     # Validação e sanitização de dados
│   │   └── export.js         # Exportação de dados (CSV/PDF)
│   ├── data/              # Dados de exemplo e configurações
│   │   └── sampleData.js      # Dados de demonstração
│   ├── App.js             # Componente raiz da aplicação
│   ├── index.js           # Ponto de entrada da aplicação
│   └── index.css          # Estilos globais e Tailwind
├── package.json           # Dependências e scripts
├── tailwind.config.js     # Configuração do Tailwind CSS
├── postcss.config.js      # Configuração do PostCSS
└── README.md              # Documentação do projeto
```

### 🏗️ Padrões Arquiteturais

- **Component-Based Architecture**: Componentes reutilizáveis e modulares
- **Custom Hooks**: Lógica de negócio encapsulada em hooks
- **Separation of Concerns**: Separação clara entre UI, lógica e dados
- **Error Boundaries**: Tratamento robusto de erros
- **Defensive Programming**: Validação e sanitização em todas as camadas

## 🔧 Personalização

### Adicionar Novas Classes de Ativo
Edite o arquivo `src/utils/calculations.js` e adicione na função `getAssetClasses()`:

```javascript
export const getAssetClasses = () => {
  return [
    'Ações',
    'Fundos Imobiliários',
    'Renda Fixa',
    'Internacional',
    'Criptomoedas',
    'Commodities',
    'Outros',
    'Sua Nova Classe' // Adicione aqui
  ];
};
```

### Modificar Cores do Tema
Edite o arquivo `tailwind.config.js` para personalizar as cores:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Suas cores personalizadas
      }
    }
  }
}
```

## 🚀 Roadmap de Desenvolvimento

### Próximas Funcionalidades
- [ ] **Geração de PDF** - Relatórios detalhados com jsPDF
- [ ] **Importação CSV** - Carregamento de dados externos
- [ ] **Histórico de Preços** - Tracking de performance temporal
- [ ] **Notificações** - Alertas de rebalanceamento
- [ ] **Múltiplos Portfólios** - Gestão de várias carteiras
- [ ] **Sincronização Cloud** - Backup e sincronização online
- [ ] **Análise de Performance** - Métricas avançadas de retorno
- [ ] **Metas de Investimento** - Planejamento de objetivos

### Melhorias Técnicas
- [ ] **Testes Automatizados** - Jest e React Testing Library
- [ ] **TypeScript** - Tipagem estática para maior robustez
- [ ] **PWA** - Progressive Web App capabilities
- [ ] **API Integration** - Conexão com APIs de mercado
- [ ] **Real-time Updates** - Atualizações em tempo real

## 🤝 Contribuição

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Suporte

Se encontrar algum problema ou tiver sugestões, abra uma issue no repositório.

## 📈 Demonstração

### Screenshots
- **Dashboard**: Visão geral com KPIs e gráficos
- **Gestão de Ativos**: Interface intuitiva para CRUD
- **Rebalanceamento**: Plano automático de ajustes
- **Insights**: Análises inteligentes e recomendações

## 🏆 Destaques Técnicos

- ✅ **Zero Dependências Externas** - Apenas React e bibliotecas essenciais
- ✅ **Performance Otimizada** - useMemo e useCallback para cálculos
- ✅ **Código Limpo** - Padrões de código profissional e documentado
- ✅ **Responsivo** - Funciona perfeitamente em todos os dispositivos
- ✅ **Acessível** - Seguindo boas práticas de acessibilidade
- ✅ **Seguro** - Validação e sanitização em todas as camadas

---

**Desenvolvido com ❤️ por Luiz Wessel para a comunidade de investidores**

*Este projeto demonstra habilidades avançadas em React, JavaScript moderno, e desenvolvimento de aplicações financeiras robustas.*
