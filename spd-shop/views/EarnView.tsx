import React, { useState, useCallback } from 'react';
import { ClassicalCard, ClassicalButton, SectionHeading } from '../components/ClassicalUI';
import { TriviaQuestion } from '../types';
import { generateTriviaQuestions } from '../services/geminiService';
import { Brain, CheckCircle, XCircle, Loader2, Coins } from 'lucide-react';

interface EarnViewProps {
  onEarn: (amount: number, description: string) => void;
}

export const EarnView: React.FC<EarnViewProps> = ({ onEarn }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<TriviaQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [gameFinished, setGameFinished] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const startGame = async () => {
    setLoading(true);
    setIsPlaying(true);
    setGameFinished(false);
    setScore(0);
    setCurrentQuestionIndex(0);
    
    // Randomize topic for variety
    const topics = ["Ancient History", "Renaissance Art", "Classical Music", "Natural Philosophy", "Mythology"];
    const randomTopic = topics[Math.floor(Math.random() * topics.length)];
    
    const fetchedQuestions = await generateTriviaQuestions(randomTopic, 3);
    setQuestions(fetchedQuestions);
    setLoading(false);
  };

  const handleAnswer = (option: string) => {
    if (selectedOption) return; // Prevent double answering

    setSelectedOption(option);
    const currentQ = questions[currentQuestionIndex];
    const correct = option === currentQ.correctAnswer;
    
    setIsCorrect(correct);
    if (correct) {
      setScore(prev => prev + 1);
    }

    // Wait a moment before next question
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedOption(null);
        setIsCorrect(null);
      } else {
        finishGame(correct ? score + 1 : score);
      }
    }, 1500);
  };

  const finishGame = useCallback((finalScore: number) => {
    setGameFinished(true);
    // Calculate rewards: 10 coins per correct answer, plus 20 bonus for perfect score
    let reward = finalScore * 10;
    if (finalScore === questions.length && questions.length > 0) {
      reward += 20;
    }

    if (reward > 0) {
      onEarn(reward, `Oracle's Challenge Reward (${finalScore}/${questions.length})`);
    }
  }, [questions.length, onEarn]);

  if (!isPlaying) {
    return (
      <div className="max-w-3xl mx-auto">
        <SectionHeading title="The Hall of Trials" subtitle="Prove your worth to earn Aureus" />
        
        <ClassicalCard className="text-center py-12">
          <div className="w-24 h-24 bg-[#f5e6d3] rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-[#8b5a2b]">
            <Brain size={48} className="text-[#4a0404]" />
          </div>
          <h3 className="text-2xl font-heading text-[#4a0404] mb-4">The Oracle's Trivia</h3>
          <p className="text-[#2c1810] mb-8 max-w-md mx-auto text-lg">
            The Oracle will generate 3 questions from the realms of history and art. 
            <br/>Answer wisely.
          </p>
          <div className="flex justify-center gap-8 text-sm mb-8 text-[#5c4033]">
            <div className="flex flex-col items-center">
              <span className="font-bold text-xl">3</span>
              <span>Questions</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-bold text-xl">50</span>
              <span>Max Coins</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-bold text-xl">AI</span>
              <span>Generated</span>
            </div>
          </div>
          <ClassicalButton onClick={startGame} className="w-full max-w-xs mx-auto">
            Summon the Oracle
          </ClassicalButton>
        </ClassicalCard>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto text-center py-20">
        <Loader2 className="animate-spin mx-auto text-[#8b5a2b] mb-4" size={48} />
        <h3 className="text-xl font-heading text-[#4a0404]">Consulting the Scrolls...</h3>
        <p className="text-[#5c4033] italic mt-2">Gemini is weaving your fate.</p>
      </div>
    );
  }

  if (gameFinished) {
    return (
      <div className="max-w-3xl mx-auto">
        <SectionHeading title="Trial Complete" />
        <ClassicalCard className="text-center py-10">
          <div className="mb-6">
            {score === questions.length ? (
              <TrophyIcon />
            ) : (
              <div className="text-6xl mb-4">📜</div>
            )}
          </div>
          <h3 className="text-3xl font-heading text-[#4a0404] mb-2">
            {score === questions.length ? "Perfection!" : "Well Fought!"}
          </h3>
          <p className="text-xl text-[#2c1810] mb-6">
            You answered {score} out of {questions.length} correctly.
          </p>
          <div className="bg-[#f5e6d3] p-4 rounded-lg inline-block mb-8 border border-[#d4af37]">
            <span className="block text-sm uppercase tracking-widest text-[#5c4033] mb-1">Reward Earned</span>
            <span className="text-3xl font-bold text-[#8b5a2b] flex items-center justify-center gap-2">
              <Coins size={24} />
              {(score * 10) + (score === questions.length ? 20 : 0)}
            </span>
          </div>
          <div className="flex justify-center gap-4">
            <ClassicalButton variant="outline" onClick={() => setIsPlaying(false)}>Return Home</ClassicalButton>
            <ClassicalButton onClick={startGame}>Challenge Again</ClassicalButton>
          </div>
        </ClassicalCard>
      </div>
    );
  }

  const currentQ = questions[currentQuestionIndex];

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-between items-end mb-4">
        <h2 className="text-xl font-heading text-[#8b5a2b]">Question {currentQuestionIndex + 1}/{questions.length}</h2>
        <span className="text-sm text-[#5c4033] uppercase tracking-wider">{currentQ.difficulty}</span>
      </div>
      
      <ClassicalCard className="min-h-[400px] flex flex-col justify-center">
        <h3 className="text-2xl md:text-3xl text-center font-serif text-[#2c1810] mb-12 leading-tight">
          {currentQ.question}
        </h3>

        <div className="grid grid-cols-1 gap-4">
          {currentQ.options.map((option, idx) => {
            let btnVariant: 'primary' | 'secondary' | 'outline' = 'outline';
            let icon = null;

            if (selectedOption === option) {
               if (isCorrect) {
                 btnVariant = 'primary'; // Re-purposing primary as success green-ish visual logic via class override below if needed, or sticking to theme
                 icon = <CheckCircle size={20} />;
               } else {
                 btnVariant = 'secondary'; // Fail state
                 icon = <XCircle size={20} />;
               }
            } else if (selectedOption && option === currentQ.correctAnswer) {
                // Show correct answer if user picked wrong
                btnVariant = 'primary';
            }

            // Override styles for success/fail explicitly for better UX
            const extraClasses = selectedOption === option 
              ? isCorrect 
                ? "!bg-green-700 !border-green-800 !text-white" 
                : "!bg-red-800 !border-red-900 !text-white"
              : selectedOption && option === currentQ.correctAnswer
                ? "!bg-green-700 !border-green-800 !text-white opacity-70" // Highlight correct answer
                : "";

            return (
              <button
                key={idx}
                onClick={() => handleAnswer(option)}
                disabled={selectedOption !== null}
                className={`
                  w-full text-left p-4 border-2 rounded-sm transition-all duration-200 flex items-center justify-between
                  ${extraClasses}
                  ${!selectedOption && "border-[#d4af37] hover:bg-[#f5e6d3] text-[#4a0404]"}
                  ${selectedOption && !extraClasses && "border-gray-300 text-gray-400 cursor-not-allowed"}
                  font-serif text-lg
                `}
              >
                <span>{option}</span>
                {icon}
              </button>
            );
          })}
        </div>
      </ClassicalCard>
    </div>
  );
};

const TrophyIcon = () => (
  <svg className="w-24 h-24 text-[#d4af37] mx-auto animate-bounce" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11c0-1.2.4-2.3 1.09-3.2a4 4 0 015.82 0A4.001 4.001 0 0115 11c0 2.21-1.79 4-4 4a4 4 0 01-4-4z" />
  </svg>
);