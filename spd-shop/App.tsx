import React, { useState, useEffect } from 'react';
import { ViewState, Transaction, UserState } from './types';
import { HomeView } from './views/HomeView';
import { EarnView } from './views/EarnView';
import { WalletView } from './views/WalletView';
import { SettingsView } from './views/SettingsView';
import { Home, Gamepad2, Wallet, Settings, Coins } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.HOME);
  const [userState, setUserState] = useState<UserState>({
    coins: 100,
    username: "NoblePlayer",
    transactions: [
      { id: 'txn_1', title: 'Welcome Bonus', amount: 100, date: new Date().toISOString(), type: 'credit' }
    ]
  });

  const handleEarn = (amount: number, description: string) => {
    const newTxn: Transaction = {
      id: `txn_${Date.now()}`,
      title: description,
      amount: amount,
      date: new Date().toISOString(),
      type: 'credit'
    };

    setUserState(prev => ({
      ...prev,
      coins: prev.coins + amount,
      transactions: [...prev.transactions, newTxn]
    }));
  };

  const renderView = () => {
    switch (currentView) {
      case ViewState.HOME:
        return <HomeView onChangeView={setCurrentView} />;
      case ViewState.EARN:
        return <EarnView onEarn={handleEarn} />;
      case ViewState.WALLET:
        return <WalletView balance={userState.coins} transactions={userState.transactions} />;
      case ViewState.SETTINGS:
        return <SettingsView />;
      default:
        return <HomeView onChangeView={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar Navigation (Desktop) / Bottom Bar (Mobile) */}
      <nav className="
        bg-[#2c1810] text-[#fdfbf7] border-r-4 border-[#d4af37]
        w-full md:w-64 md:min-h-screen fixed md:relative bottom-0 z-50 md:z-auto
        shadow-[0_0_20px_rgba(0,0,0,0.5)]
      ">
        <div className="p-6 hidden md:block text-center border-b border-[#8b5a2b]">
          <h1 className="text-2xl font-heading text-[#d4af37] tracking-wider">Aureus Ludi</h1>
          <p className="text-xs text-[#a89f91] mt-2 uppercase tracking-widest">Classical Gaming</p>
        </div>

        {/* User Mini-Profile (Desktop) */}
        <div className="hidden md:flex flex-col items-center p-6 bg-[#1a0e09] border-b border-[#8b5a2b]">
           <div className="w-16 h-16 rounded-full border-2 border-[#d4af37] mb-3 overflow-hidden">
             <img src="https://picsum.photos/200/200?grayscale" alt="Avatar" className="w-full h-full object-cover"/>
           </div>
           <span className="font-serif text-lg">{userState.username}</span>
           <div className="mt-2 flex items-center gap-2 text-[#d4af37] bg-[#2c1810] px-3 py-1 rounded-full border border-[#8b5a2b]">
             <Coins size={14} />
             <span className="font-bold">{userState.coins}</span>
           </div>
        </div>

        <div className="flex md:flex-col justify-around md:justify-start p-2 md:p-4 gap-1 md:gap-4">
          <NavItem 
            icon={<Home size={20} />} 
            label="Home" 
            active={currentView === ViewState.HOME} 
            onClick={() => setCurrentView(ViewState.HOME)} 
          />
          <NavItem 
            icon={<Gamepad2 size={20} />} 
            label="Earn" 
            active={currentView === ViewState.EARN} 
            onClick={() => setCurrentView(ViewState.EARN)} 
          />
          <NavItem 
            icon={<Wallet size={20} />} 
            label="Wallet" 
            active={currentView === ViewState.WALLET} 
            onClick={() => setCurrentView(ViewState.WALLET)} 
          />
          <NavItem 
            icon={<Settings size={20} />} 
            label="Settings" 
            active={currentView === ViewState.SETTINGS} 
            onClick={() => setCurrentView(ViewState.SETTINGS)} 
          />
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-8 pb-24 md:pb-8 overflow-y-auto">
        {/* Mobile Header with Coin Balance */}
        <div className="md:hidden flex justify-between items-center mb-6 bg-[#fdfbf7] p-4 rounded-lg border border-[#d4af37] shadow-md sticky top-4 z-40">
           <span className="font-heading text-[#4a0404] text-lg">Aureus Ludi</span>
           <div className="flex items-center gap-2 text-[#8b5a2b] font-bold">
             <Coins size={16} className="text-[#d4af37]" />
             {userState.coins}
           </div>
        </div>

        {renderView()}
      </main>
    </div>
  );
};

// Helper Component for Navigation Items
interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, active, onClick }) => {
  return (
    <button 
      onClick={onClick}
      className={`
        flex flex-col md:flex-row items-center md:gap-4 p-2 md:px-6 md:py-3 rounded-md transition-all duration-300
        ${active 
          ? 'bg-[#d4af37] text-[#4a0404] font-bold shadow-lg translate-y-[-2px]' 
          : 'text-[#a89f91] hover:bg-[#3e2215] hover:text-[#fdfbf7]'
        }
        w-full md:w-auto md:justify-start justify-center
      `}
    >
      <span className={`${active ? 'scale-110' : ''} transition-transform`}>{icon}</span>
      <span className="text-[10px] md:text-base uppercase md:normal-case tracking-widest md:tracking-normal mt-1 md:mt-0 font-serif">
        {label}
      </span>
    </button>
  );
};

export default App;