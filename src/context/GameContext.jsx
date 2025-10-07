import { createContext, useContext, useState } from 'react';

const GameContext = createContext();

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within GameProvider');
  }
  return context;
};

export const GameProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [totalScore, setTotalScore] = useState(0);
  const [gameStats, setGameStats] = useState({
    correct: 0,
    incorrect: 0,
    streak: 0,
  });

  const updateStats = (isCorrect) => {
    setGameStats(prev => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      incorrect: prev.incorrect + (isCorrect ? 0 : 1),
      streak: isCorrect ? prev.streak + 1 : 0,
    }));
  };

  const resetStats = () => {
    setGameStats({ correct: 0, incorrect: 0, streak: 0 });
  };

  const value = {
    user,
    setUser,
    currentLevel,
    setCurrentLevel,
    totalScore,
    setTotalScore,
    gameStats,
    updateStats,
    resetStats,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
