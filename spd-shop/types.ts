export interface Transaction {
  id: string;
  title: string;
  amount: number;
  date: string;
  type: 'credit' | 'debit';
}

export interface UserState {
  coins: number;
  username: string;
  transactions: Transaction[];
}

export interface TriviaQuestion {
  question: string;
  options: string[];
  correctAnswer: string; // The string value of the correct option
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export enum ViewState {
  HOME = 'HOME',
  EARN = 'EARN',
  WALLET = 'WALLET',
  SETTINGS = 'SETTINGS'
}

export interface Game {
  id: string;
  title: string;
  description: string;
  reward: string;
  image: string;
  isLocked?: boolean;
}