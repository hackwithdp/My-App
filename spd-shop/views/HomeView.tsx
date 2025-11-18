import React from 'react';
import { ClassicalCard, ClassicalButton, SectionHeading } from '../components/ClassicalUI';
import { Game, ViewState } from '../types';
import { Play, ArrowRight, Trophy } from 'lucide-react';

interface HomeViewProps {
  onChangeView: (view: ViewState) => void;
}

const FEATURED_GAMES: Game[] = [
  {
    id: 'g1',
    title: 'The Oracle\'s Challenge',
    description: 'Test your wits against the ancient Oracle of Delphi in this trivia challenge.',
    reward: 'Up to 50 Coins',
    image: 'https://picsum.photos/400/200?random=1'
  },
  {
    id: 'g2',
    title: 'Gladiator\'s Arena',
    description: 'Strategic card battles. Coming soon to the arena.',
    reward: 'Coming Soon',
    image: 'https://picsum.photos/400/200?random=2',
    isLocked: true
  },
];

export const HomeView: React.FC<HomeViewProps> = ({ onChangeView }) => {
  return (
    <div className="max-w-5xl mx-auto animate-fade-in">
      <SectionHeading title="Aureus Ludi" subtitle="Welcome back, Noble Player" />

      {/* Hero Section */}
      <ClassicalCard className="mb-12 bg-gradient-to-r from-[#fdfbf7] to-[#f5e6d3]">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <h3 className="text-3xl font-heading text-[#4a0404] mb-4">Daily Quest Awaits</h3>
            <p className="text-lg text-[#2c1810] mb-6 leading-relaxed">
              The Emperor has decreed a new challenge. Answer three riddles of history and science to claim your daily stipend of Aureus coins.
            </p>
            <ClassicalButton 
              onClick={() => onChangeView(ViewState.EARN)} 
              icon={<Play size={18} />}
            >
              Embark Now
            </ClassicalButton>
          </div>
          <div className="w-full md:w-1/3">
            <div className="aspect-square bg-[#4a0404] p-2 rounded-full rotate-3 shadow-xl border-4 border-[#d4af37] mx-auto">
               <img 
                src="https://picsum.photos/300/300?random=3" 
                alt="Daily Quest" 
                className="w-full h-full object-cover rounded-full opacity-90 hover:opacity-100 transition-opacity"
               />
            </div>
          </div>
        </div>
      </ClassicalCard>

      {/* Game Grid */}
      <h3 className="text-2xl font-heading text-[#4a0404] mb-6 pl-4 border-l-4 border-[#8b5a2b]">The Arena</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {FEATURED_GAMES.map((game) => (
          <ClassicalCard key={game.id} className={game.isLocked ? 'opacity-70 grayscale' : ''}>
             <div className="h-40 w-full mb-4 overflow-hidden border border-[#d4af37]">
               <img 
                 src={game.image} 
                 alt={game.title} 
                 className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
               />
             </div>
             <h4 className="text-xl font-heading text-[#2c1810] mb-2">{game.title}</h4>
             <p className="text-sm text-[#5c4033] mb-4 italic">{game.description}</p>
             <div className="flex items-center justify-between mt-4">
               <span className="text-[#8b5a2b] font-bold text-sm flex items-center gap-1">
                 <Trophy size={14} /> {game.reward}
               </span>
               <ClassicalButton 
                 variant={game.isLocked ? 'outline' : 'secondary'} 
                 disabled={game.isLocked}
                 onClick={() => onChangeView(ViewState.EARN)}
                 className="py-2 px-4 text-xs"
               >
                 {game.isLocked ? 'Locked' : 'Enter'}
               </ClassicalButton>
             </div>
          </ClassicalCard>
        ))}
      </div>

      {/* Call to Action */}
      <div className="flex justify-between items-center bg-[#2c1810] p-6 rounded-sm text-[#fdfbf7] border-t-4 border-[#d4af37]">
        <div>
          <h4 className="font-heading text-lg text-[#d4af37]">Your Treasury</h4>
          <p className="text-sm opacity-80">Check your earnings and history.</p>
        </div>
        <ClassicalButton 
          variant="outline" 
          className="!border-[#d4af37] !text-[#d4af37] hover:!bg-[#d4af37] hover:!text-[#2c1810]"
          onClick={() => onChangeView(ViewState.WALLET)}
        >
          Open Wallet <ArrowRight size={16} />
        </ClassicalButton>
      </div>
    </div>
  );
};