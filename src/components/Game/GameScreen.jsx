import { useState, useEffect } from 'react';
import { useGame } from '../../context/GameContext';
import {
  calculateLCM,
  randomNumber,
  generateWrongAnswers,
  shuffleArray,
  generateMultiples,
} from '../../utils/mathUtils';

const GameScreen = ({ onLevelComplete }) => {
  const { currentLevel, updateStats, gameStats } = useGame();
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [options, setOptions] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [levelScore, setLevelScore] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);

  const questionsPerLevel = 5;

  useEffect(() => {
    generateQuestion();
  }, [currentQuestion]);

  const generateQuestion = () => {
    let n1, n2;

    if (currentLevel === 1) {
      n1 = randomNumber(2, 5);
      n2 = randomNumber(2, 5);
    } else if (currentLevel === 2) {
      n1 = randomNumber(3, 8);
      n2 = randomNumber(3, 8);
    } else if (currentLevel === 3) {
      n1 = randomNumber(5, 12);
      n2 = randomNumber(5, 12);
    } else {
      n1 = randomNumber(6, 15);
      n2 = randomNumber(6, 15);
    }

    setNum1(n1);
    setNum2(n2);

    const lcm = calculateLCM(n1, n2);
    setCorrectAnswer(lcm);

    const wrongAnswers = generateWrongAnswers(lcm, 3);
    const allOptions = shuffleArray([lcm, ...wrongAnswers]);
    setOptions(allOptions);

    setSelectedAnswer(null);
    setFeedback(null);
    setShowHint(false);
    setHintsUsed(0);
  };

  const handleAnswer = (answer) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(answer);
    const isCorrect = answer === correctAnswer;

    let points = 10;
    if (isCorrect) {
      if (gameStats.streak > 2) points += 5;
      if (hintsUsed === 0) points += 5;
      setLevelScore(prev => prev + points);
      setFeedback({ type: 'success', message: `🎉 Correct! +${points} points` });
    } else {
      setFeedback({ type: 'error', message: `❌ Incorrect! The answer is ${correctAnswer}` });
    }

    updateStats(isCorrect);

    setTimeout(() => {
      if (currentQuestion < questionsPerLevel) {
        setCurrentQuestion(prev => prev + 1);
      } else {
        onLevelComplete(levelScore);
      }
    }, 2500);
  };

  const handleShowHint = () => {
    setShowHint(true);
    setHintsUsed(1);
  };

  const progress = ((currentQuestion - 1) / questionsPerLevel) * 100;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="card max-w-4xl mx-auto">
        {/* Level Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-primary mb-4">Level {currentLevel}</h2>
          <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
            <div
              className="bg-gradient-to-r from-primary to-secondary h-4 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-gray-600">
            Question {currentQuestion} of {questionsPerLevel}
          </p>
        </div>

        {/* Question */}
        <h3 className="text-3xl font-bold text-center mb-8">
          Find the LCM of{' '}
          <span className="text-primary text-5xl">{num1}</span> and{' '}
          <span className="text-primary text-5xl">{num2}</span>
        </h3>

        {/* Hint Button */}
        <div className="text-center mb-6">
          <button
            onClick={handleShowHint}
            disabled={showHint}
            className="btn btn-warning"
          >
            💡 Get Hint
          </button>
        </div>

        {/* Hint Display */}
        {showHint && (
          <div className="bg-yellow-100 border-2 border-warning rounded-lg p-6 mb-6 animate-fade-in">
            <p className="font-semibold mb-2">Hint:</p>
            <p>Multiples of {num1}: {generateMultiples(num1, 5).join(', ')}...</p>
            <p>Multiples of {num2}: {generateMultiples(num2, 5).join(', ')}...</p>
            <p className="font-semibold mt-2">Look for the smallest common number!</p>
          </div>
        )}

        {/* Answer Options */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(option)}
              disabled={selectedAnswer !== null}
              className={`p-8 text-3xl font-bold rounded-xl border-4 transition-all duration-300 ${
                selectedAnswer === null
                  ? 'border-primary text-primary bg-white hover:bg-primary hover:text-white hover:-translate-y-2'
                  : selectedAnswer === option
                  ? option === correctAnswer
                    ? 'border-success bg-success text-white scale-105'
                    : 'border-error bg-error text-white animate-shake'
                  : option === correctAnswer
                  ? 'border-success bg-success text-white'
                  : 'border-gray-300 bg-gray-100 text-gray-400'
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        {/* Feedback */}
        {feedback && (
          <div
            className={`p-4 rounded-lg text-center text-lg font-semibold animate-fade-in ${
              feedback.type === 'success'
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
            {feedback.message}
          </div>
        )}

        {/* Game Stats */}
        <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t-2 border-gray-200">
          <div className="text-center">
            <p className="text-gray-600 text-sm">Correct</p>
            <p className="text-3xl font-bold text-primary">{gameStats.correct}</p>
          </div>
          <div className="text-center">
            <p className="text-gray-600 text-sm">Incorrect</p>
            <p className="text-3xl font-bold text-error">{gameStats.incorrect}</p>
          </div>
          <div className="text-center">
            <p className="text-gray-600 text-sm">Streak</p>
            <p className="text-3xl font-bold text-warning">{gameStats.streak}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameScreen;
