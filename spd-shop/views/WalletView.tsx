import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { ClassicalCard, SectionHeading } from '../components/ClassicalUI';
import { Transaction } from '../types';
import { Coins, TrendingUp, History } from 'lucide-react';

interface WalletViewProps {
  balance: number;
  transactions: Transaction[];
}

export const WalletView: React.FC<WalletViewProps> = ({ balance, transactions }) => {
  // Prepare data for chart (last 7 transactions or grouping by day - simplified for UI)
  const data = transactions.slice(0, 7).reverse().map(t => ({
    name: t.id.slice(0, 4), // Short ID
    amount: t.amount,
    type: t.type
  }));

  return (
    <div className="max-w-5xl mx-auto">
      <SectionHeading title="Royal Treasury" subtitle="Manage your wealth" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Balance Card */}
        <ClassicalCard className="md:col-span-1 bg-[#2c1810] !border-[#d4af37]">
          <div className="flex flex-col items-center text-[#fdfbf7] py-4">
            <div className="p-4 border-2 border-[#d4af37] rounded-full mb-4 shadow-[0_0_15px_rgba(212,175,55,0.5)]">
              <Coins size={40} className="text-[#d4af37]" />
            </div>
            <span className="text-sm uppercase tracking-widest opacity-80 mb-1">Total Balance</span>
            <h2 className="text-5xl font-heading text-[#d4af37] mb-2">{balance}</h2>
            <span className="text-xs text-[#d4af37] italic">Aureus Coins</span>
          </div>
        </ClassicalCard>

        {/* Analytics Card */}
        <ClassicalCard className="md:col-span-2 flex flex-col">
          <div className="flex items-center gap-2 mb-4 text-[#8b5a2b]">
            <TrendingUp size={20} />
            <h3 className="font-heading text-lg">Recent Activity Flow</h3>
          </div>
          <div className="h-48 w-full flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e0d0" vertical={false} />
                <XAxis dataKey="name" stroke="#8b5a2b" fontSize={12} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fdfbf7', borderColor: '#8b5a2b', fontFamily: 'serif' }}
                  itemStyle={{ color: '#4a0404' }}
                  cursor={{fill: 'rgba(139, 90, 43, 0.1)'}}
                />
                <Bar dataKey="amount" radius={[4, 4, 0, 0]}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.type === 'credit' ? '#d4af37' : '#4a0404'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ClassicalCard>
      </div>

      {/* Transaction List */}
      <ClassicalCard title="Ledger History">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-[#d4af37] text-[#8b5a2b] font-heading text-sm">
                <th className="py-3 pl-2">Date</th>
                <th className="py-3">Description</th>
                <th className="py-3 text-right pr-4">Amount</th>
              </tr>
            </thead>
            <tbody className="text-[#2c1810]">
              {transactions.length === 0 ? (
                <tr>
                  <td colSpan={3} className="py-8 text-center italic opacity-60">No records found in the ledger.</td>
                </tr>
              ) : (
                transactions.map((t) => (
                  <tr key={t.id} className="border-b border-[#e5e0d0] hover:bg-[#f8f4e6] transition-colors">
                    <td className="py-4 pl-2 text-sm font-serif whitespace-nowrap">
                      {new Date(t.date).toLocaleDateString()}
                    </td>
                    <td className="py-4 font-serif font-medium">
                      <div className="flex items-center gap-3">
                        <span className={`p-1 rounded-full ${t.type === 'credit' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {t.type === 'credit' ? <TrendingUp size={14} /> : <History size={14} />}
                        </span>
                        {t.title}
                      </div>
                    </td>
                    <td className={`py-4 pr-4 text-right font-bold ${t.type === 'credit' ? 'text-green-700' : 'text-red-700'}`}>
                      {t.type === 'credit' ? '+' : '-'}{t.amount}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </ClassicalCard>
    </div>
  );
};