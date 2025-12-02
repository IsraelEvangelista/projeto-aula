import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Receipt, 
  Settings, 
  PieChart, 
  Menu, 
  X, 
  Plus, 
  Search, 
  Bell,
  Upload,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  Download,
  Filter,
  MoreHorizontal
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart as RePieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';

import { Button } from './components/Button';
import { Input } from './components/Input';
import { Modal } from './components/Modal';
import { KPI, Transaction, ViewState, Category } from './types';
import { MOCK_KPIS, MOCK_TRANSACTIONS, CHART_DATA_MONTHLY, CHART_DATA_PIE, MOCK_CATEGORIES } from './constants';

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'];

const DashboardView: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {MOCK_KPIS.map((kpi, index) => (
          <div key={index} className="overflow-hidden rounded-xl bg-white p-6 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between">
              <p className="truncate text-sm font-medium text-slate-500">{kpi.label}</p>
              <div className={`flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${kpi.isPositive ? (kpi.change > 0 ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700') : (kpi.change > 0 ? 'bg-red-50 text-red-700' : 'bg-emerald-50 text-emerald-700')}`}>
                {kpi.change > 0 ? <ArrowUpRight className="mr-1 h-3 w-3" /> : <ArrowDownRight className="mr-1 h-3 w-3" />}
                {Math.abs(kpi.change)}%
              </div>
            </div>
            <div className="mt-4 flex items-baseline">
              <p className="text-3xl font-semibold text-slate-900">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(kpi.value)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main Chart */}
        <div className="rounded-xl bg-white p-6 shadow-sm border border-slate-100 lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-900">Fluxo de Caixa</h3>
            <select className="rounded-lg border-slate-300 text-sm py-1 px-2 text-slate-600 bg-slate-50">
              <option>Últimos 6 meses</option>
              <option>Este Ano</option>
            </select>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={CHART_DATA_MONTHLY}>
                <defs>
                  <linearGradient id="colorReceita" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorDespesa" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} tickFormatter={(value) => `R$${value/1000}k`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  formatter={(value: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)}
                />
                <Area type="monotone" dataKey="receita" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorReceita)" name="Receitas" />
                <Area type="monotone" dataKey="despesa" stroke="#ef4444" strokeWidth={2} fillOpacity={1} fill="url(#colorDespesa)" name="Despesas" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="rounded-xl bg-white p-6 shadow-sm border border-slate-100">
           <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-900">Despesas por Categoria</h3>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RePieChart>
                <Pie
                  data={CHART_DATA_PIE}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {CHART_DATA_PIE.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => `R$ ${value}`} />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </RePieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Transactions Preview */}
      <div className="rounded-xl bg-white shadow-sm border border-slate-100 overflow-hidden">
        <div className="border-b border-slate-100 px-6 py-4 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-slate-900">Transações Recentes</h3>
          <Button variant="outline" size="sm">Ver todas</Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-6 py-3 font-medium">Descrição</th>
                <th className="px-6 py-3 font-medium">Categoria</th>
                <th className="px-6 py-3 font-medium">Data</th>
                <th className="px-6 py-3 font-medium">Valor</th>
                <th className="px-6 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_TRANSACTIONS.slice(0, 3).map((transaction) => (
                <tr key={transaction.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium text-slate-900">{transaction.description}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium" style={{ backgroundColor: `${transaction.category.color}20`, color: transaction.category.color }}>
                      {transaction.category.name}
                    </span>
                  </td>
                  <td className="px-6 py-4">{new Date(transaction.date).toLocaleDateString('pt-BR')}</td>
                  <td className={`px-6 py-4 font-medium ${transaction.type === 'INCOME' ? 'text-emerald-600' : 'text-slate-900'}`}>
                    {transaction.type === 'EXPENSE' ? '-' : '+'}
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(transaction.amount)}
                  </td>
                  <td className="px-6 py-4">
                     <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${transaction.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                      {transaction.status === 'COMPLETED' ? 'Pago' : 'Pendente'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const TransactionsView: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>(MOCK_TRANSACTIONS);

  // Mock Form State
  const [newTransaction, setNewTransaction] = useState({
    description: '',
    amount: '',
    type: 'EXPENSE',
    category: MOCK_CATEGORIES[0].id
  });

  const handleAddTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    const category = MOCK_CATEGORIES.find(c => c.id === newTransaction.category) || MOCK_CATEGORIES[0];
    const item: Transaction = {
      id: Math.random().toString(36).substr(2, 9),
      description: newTransaction.description,
      amount: Number(newTransaction.amount),
      type: newTransaction.type as any,
      category: category,
      date: new Date().toISOString(),
      status: 'PENDING'
    };
    setTransactions([item, ...transactions]);
    setIsModalOpen(false);
    setNewTransaction({ description: '', amount: '', type: 'EXPENSE', category: MOCK_CATEGORIES[0].id });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-slate-900">Transações</h2>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline" icon={<Upload className="w-4 h-4"/>}>Importar OFX</Button>
          <Button icon={<Plus className="w-4 h-4"/>} onClick={() => setIsModalOpen(true)}>Nova Transação</Button>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full sm:w-96">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg leading-5 bg-white placeholder-slate-500 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition duration-150 ease-in-out"
            placeholder="Buscar transações..."
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
           <Button variant="outline" size="sm" icon={<Filter className="w-4 h-4"/>}>Filtros</Button>
           <Button variant="outline" size="sm" icon={<Download className="w-4 h-4"/>}>Exportar</Button>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="rounded-xl bg-white shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-6 py-3 font-medium">Descrição</th>
                <th className="px-6 py-3 font-medium">Categoria</th>
                <th className="px-6 py-3 font-medium">Data</th>
                <th className="px-6 py-3 font-medium">Valor</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-900">{transaction.description}</div>
                    <div className="text-xs text-slate-500">ID: #{transaction.id.substring(0,6)}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium" style={{ backgroundColor: `${transaction.category.color}20`, color: transaction.category.color }}>
                      {transaction.category.name}
                    </span>
                  </td>
                  <td className="px-6 py-4">{new Date(transaction.date).toLocaleDateString('pt-BR')}</td>
                  <td className={`px-6 py-4 font-medium ${transaction.type === 'INCOME' ? 'text-emerald-600' : 'text-slate-900'}`}>
                    {transaction.type === 'EXPENSE' ? '-' : '+'}
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(transaction.amount)}
                  </td>
                  <td className="px-6 py-4">
                     <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${transaction.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                      {transaction.status === 'COMPLETED' ? 'Pago' : 'Pendente'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-slate-400 hover:text-slate-600">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex justify-between items-center text-sm text-slate-500">
          <span>Mostrando 1 a {transactions.length} de {transactions.length} resultados</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 border rounded bg-white disabled:opacity-50" disabled>Anterior</button>
            <button className="px-3 py-1 border rounded bg-white disabled:opacity-50" disabled>Próxima</button>
          </div>
        </div>
      </div>

      {/* New Transaction Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="Nova Transação"
      >
        <form onSubmit={handleAddTransaction} className="space-y-4">
          <Input 
            label="Descrição" 
            placeholder="Ex: Aluguel de Dezembro" 
            value={newTransaction.description}
            onChange={e => setNewTransaction({...newTransaction, description: e.target.value})}
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <Input 
              label="Valor (R$)" 
              type="number" 
              placeholder="0,00" 
              step="0.01"
              value={newTransaction.amount}
              onChange={e => setNewTransaction({...newTransaction, amount: e.target.value})}
              required
            />
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Tipo</label>
              <select 
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 sm:text-sm"
                value={newTransaction.type}
                onChange={e => setNewTransaction({...newTransaction, type: e.target.value})}
              >
                <option value="EXPENSE">Despesa</option>
                <option value="INCOME">Receita</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Categoria</label>
            <select 
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 sm:text-sm"
              value={newTransaction.category}
              onChange={e => setNewTransaction({...newTransaction, category: e.target.value})}
            >
              {MOCK_CATEGORIES.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
          <div className="pt-4 flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
            <Button type="submit">Salvar Transação</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewState>('DASHBOARD');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const renderContent = () => {
    switch (activeView) {
      case 'DASHBOARD': return <DashboardView />;
      case 'TRANSACTIONS': return <TransactionsView />;
      default: return <div className="p-12 text-center text-slate-500">Funcionalidade em desenvolvimento...</div>;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-slate-900/50 lg:hidden transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-slate-900 text-white transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-16 items-center px-6 font-bold text-xl tracking-tight border-b border-slate-800">
          <div className="h-8 w-8 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-lg mr-3 flex items-center justify-center">
            <TrendingUp className="h-5 w-5 text-white" />
          </div>
          FinGestor
        </div>

        <nav className="mt-6 px-3 space-y-1">
          <button 
            onClick={() => { setActiveView('DASHBOARD'); setIsSidebarOpen(false); }}
            className={`flex w-full items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
              activeView === 'DASHBOARD' 
                ? 'bg-emerald-600 text-white' 
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <LayoutDashboard className="mr-3 h-5 w-5" />
            Dashboard
          </button>
          
          <button 
            onClick={() => { setActiveView('TRANSACTIONS'); setIsSidebarOpen(false); }}
            className={`flex w-full items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
              activeView === 'TRANSACTIONS' 
                ? 'bg-emerald-600 text-white' 
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Receipt className="mr-3 h-5 w-5" />
            Transações
          </button>

          <button 
            onClick={() => { setActiveView('REPORTS'); setIsSidebarOpen(false); }}
            className={`flex w-full items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
              activeView === 'REPORTS' 
                ? 'bg-emerald-600 text-white' 
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <PieChart className="mr-3 h-5 w-5" />
            Relatórios
          </button>

          <button 
            onClick={() => { setActiveView('SETTINGS'); setIsSidebarOpen(false); }}
            className={`flex w-full items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
              activeView === 'SETTINGS' 
                ? 'bg-emerald-600 text-white' 
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Settings className="mr-3 h-5 w-5" />
            Configurações
          </button>
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-slate-800">
           <div className="flex items-center">
             <div className="h-9 w-9 rounded-full bg-indigo-500 flex items-center justify-center text-sm font-bold">JS</div>
             <div className="ml-3">
               <p className="text-sm font-medium text-white">João Silva</p>
               <p className="text-xs text-slate-400">Loja de Roupas MEI</p>
             </div>
           </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8">
          <button 
            onClick={toggleSidebar}
            className="lg:hidden p-2 rounded-md text-slate-400 hover:text-slate-500 hover:bg-slate-100 focus:outline-none"
          >
            <Menu className="h-6 w-6" />
          </button>
          
          <div className="flex-1 flex justify-end lg:justify-between items-center">
             <div className="hidden lg:block w-96 relative">
               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-slate-400" />
               </div>
               <input 
                  type="text" 
                  className="block w-full pl-10 pr-3 py-1.5 border border-slate-200 rounded-lg leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  placeholder="Buscar..."
               />
             </div>
             
             <div className="flex items-center gap-4">
               <button className="p-1.5 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-500 relative">
                 <Bell className="h-5 w-5" />
                 <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
               </button>
             </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-slate-50 p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;