export type TransactionType = 'INCOME' | 'EXPENSE' | 'TRANSFER';
export type TransactionStatus = 'PENDING' | 'COMPLETED' | 'CANCELLED';

export interface Category {
  id: string;
  name: string;
  color: string;
  icon?: string;
}

export interface Transaction {
  id: string;
  amount: number;
  description: string;
  type: TransactionType;
  category: Category;
  date: string; // ISO Date
  status: TransactionStatus;
}

export interface KPI {
  label: string;
  value: number;
  change: number; // Percentage change
  isPositive: boolean; // For color coding
}

export type ViewState = 'DASHBOARD' | 'TRANSACTIONS' | 'REPORTS' | 'SETTINGS';