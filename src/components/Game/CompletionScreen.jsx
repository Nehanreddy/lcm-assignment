import { useState, useEffect } from 'react';
import { useGame } from '../../context/GameContext';
import { saveScore } from '../../utils/api';

const CompletionScreen = ({ levelScore, onNextLevel, onReplay, onMainMenu }) => {
  const { currentLevel, setTotalScore, gameStats } = useGame();
  const [timeTaken, setTimeTaken] = useState(0);
  const [achievement, setAchievement] = useState(null);

  const accuracy = Math.round(
    (gameStats.correct / (gameStats.correct + gameStats.incorrect)) * 100
  );

  useEffect(() => {
    // Save score to database
    saveScore({ score: levelScore, level: currentLevel });

    // Update total score
    setTotalScore(prev => prev + levelScore);

    // Check achievements
    if (accuracy === 100) {
      setAchievement('Perfect Score! You got all answers right!');
    } else if (gameStats.streak >= 5) {
      setAchievement('Streak Master! You achieved a 5+ answer streak!');
    }
  }, []);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="card max-w-2xl mx-auto text-center animate-slide-up">
        <h2 className="text-5xl font-bold text-primary mb-8">🎊 Level Complete!</h2>

        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-8 mb-8">
          <div className="text-6xl font-bold text-primary mb-4">{levelScore}</div>
          <p className="text-2xl text-gray-600 mb-6">Points Earned!</p>

          <div className="grid grid-cols-2 gap-4 text-left">
            <div className="bg-white rounded-lg p-4">
              <p className="text-gray-600 text-sm">Accuracy</p>
              <p className="text-3xl font-bold text-primary">{accuracy}%</p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <p className="text-gray-600 text-sm">Correct Answers</p>
              <p className="text-3xl font-bold text-success">{gameStats.correct}</p>
            </div>
          </div>
        </div>

        {achievement && (
          <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl p-6 mb-8 animate-pulse-slow">
            <h3 className="text-2xl font-bold mb-2">🏆 Achievement Unlocked!</h3>
            <p className="text-lg">{achievement}</p>
          </div>
        )}

        <div className="space-y-4">
          <button
            onClick={onNextLevel}
            className="btn btn-primary w-full text-xl py-4"
          >
            Next Level 🚀
          </button>
          <button
            onClick={onReplay}
            className="btn btn-secondary w-full text-xl py-4"
          >
            Replay Level 🔄
          </button>
          <button
            onClick={onMainMenu}
            className="btn btn-secondary w-full text-xl py-4"
          >
            Main Menu 🏠
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompletionScreen;
