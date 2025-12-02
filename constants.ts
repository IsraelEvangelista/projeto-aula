import { Category, Transaction, KPI } from './types';
import { TrendingUp, TrendingDown, DollarSign, Wallet } from 'lucide-react';

export const MOCK_CATEGORIES: Category[] = [
  { id: '1', name: 'Vendas', color: '#10b981' },
  { id: '2', name: 'Serviços', color: '#3b82f6' },
  { id: '3', name: 'Aluguel', color: '#f59e0b' },
  { id: '4', name: 'Marketing', color: '#ef4444' },
  { id: '5', name: 'Software', color: '#8b5cf6' },
];

export const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: 't1',
    description: 'Pagamento Cliente A',
    amount: 5000.00,
    type: 'INCOME',
    category: MOCK_CATEGORIES[0],
    date: '2025-12-01T10:00:00',
    status: 'COMPLETED'
  },
  {
    id: 't2',
    description: 'Assinatura AWS',
    amount: 1200.50,
    type: 'EXPENSE',
    category: MOCK_CATEGORIES[4],
    date: '2025-12-02T14:30:00',
    status: 'COMPLETED'
  },
  {
    id: 't3',
    description: 'Campanha Google Ads',
    amount: 3200.00,
    type: 'EXPENSE',
    category: MOCK_CATEGORIES[3],
    date: '2025-12-03T09:15:00',
    status: 'PENDING'
  },
  {
    id: 't4',
    description: 'Consultoria Técnica',
    amount: 8500.00,
    type: 'INCOME',
    category: MOCK_CATEGORIES[1],
    date: '2025-12-04T16:00:00',
    status: 'COMPLETED'
  },
   {
    id: 't5',
    description: 'Aluguel Escritório',
    amount: 4000.00,
    type: 'EXPENSE',
    category: MOCK_CATEGORIES[2],
    date: '2025-12-05T08:00:00',
    status: 'PENDING'
  },
];

export const MOCK_KPIS: KPI[] = [
  { label: 'Receita Total', value: 125000, change: 12.5, isPositive: true },
  { label: 'Despesas', value: 45000, change: -5.2, isPositive: true }, // Negative change in expense is good
  { label: 'Lucro Líquido', value: 80000, change: 22.1, isPositive: true },
  { label: 'Caixa Atual', value: 32450, change: -2.4, isPositive: false },
];

export const CHART_DATA_MONTHLY = [
  { name: 'Jan', receita: 40000, despesa: 24000 },
  { name: 'Fev', receita: 30000, despesa: 13980 },
  { name: 'Mar', receita: 20000, despesa: 9800 },
  { name: 'Abr', receita: 27800, despesa: 39080 },
  { name: 'Mai', receita: 18900, despesa: 4800 },
  { name: 'Jun', receita: 23900, despesa: 3800 },
  { name: 'Jul', receita: 34900, despesa: 4300 },
];

export const CHART_DATA_PIE = [
  { name: 'Vendas', value: 400 },
  { name: 'Serviços', value: 300 },
  { name: 'Outros', value: 300 },
  { name: 'Invest.', value: 200 },
];