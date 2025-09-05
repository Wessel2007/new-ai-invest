# 🚀 Instalação Rápida - Meus Investimentos

## Pré-requisitos
- Node.js (versão 16 ou superior)
- npm ou yarn

## Passos para Instalação

### 1. Instalar Dependências
```bash
npm install
```

### 2. Executar o Projeto
```bash
npm start
```

### 3. Acessar no Navegador
Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## 🎯 Primeiros Passos

### 1. Carregar Dados de Exemplo
- Clique no botão "📊 Dados de Exemplo" no header
- Confirme para carregar dados de demonstração
- Isso irá popular o app com ativos e alocação de exemplo

### 2. Explorar as Funcionalidades
- **Dashboard**: Visualize gráficos e KPIs
- **Ativos**: Gerencie seus investimentos
- **Alocação**: Configure sua alocação ideal
- **Rebalanceamento**: Veja o plano de ajustes
- **Insights**: Analise desvios e diversificação

### 3. Personalizar
- Adicione seus próprios ativos
- Configure sua alocação ideal
- Ajuste o aporte planejado
- Exporte dados em CSV

## 🔧 Comandos Disponíveis

```bash
# Desenvolvimento
npm start

# Build para produção
npm run build

# Executar testes
npm test

# Ejetar configurações (não recomendado)
npm run eject
```

## 📱 Funcionalidades Principais

✅ **CRUD de Ativos**: Cadastre, edite e exclua investimentos
✅ **Alocação Ideal**: Configure percentuais por classe
✅ **Dashboard Interativo**: Gráficos e KPIs em tempo real
✅ **Rebalanceamento**: Plano automático de compras/vendas
✅ **Insights**: Análises e recomendações
✅ **Exportação**: CSV e PDF (em desenvolvimento)
✅ **Dark Mode**: Interface moderna e escura

## 🆘 Problemas Comuns

### Erro de Dependências
```bash
# Limpar cache e reinstalar
rm -rf node_modules package-lock.json
npm install
```

### Porta 3000 Ocupada
```bash
# O React automaticamente usará a próxima porta disponível
# Ou defina uma porta específica:
PORT=3001 npm start
```

### Problemas de Build
```bash
# Limpar build anterior
rm -rf build
npm run build
```

## 📞 Suporte

Se encontrar problemas:
1. Verifique se todas as dependências foram instaladas
2. Confirme que está usando Node.js 16+
3. Tente limpar o cache: `npm cache clean --force`
4. Abra uma issue no repositório

---

**Pronto! Seu app de investimentos está funcionando! 🎉**
