import { useState } from 'react';
import { GameProvider, useGame } from './context/GameContext';
import Header from './components/Layout/Header';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import WelcomeScreen from './components/Game/WelcomeScreen';
import TutorialScreen from './components/Game/TutorialScreen';
import GameScreen from './components/Game/GameScreen';
import CompletionScreen from './components/Game/CompletionScreen';

function AppContent() {
  const { user, setUser, setCurrentLevel, resetStats } = useGame();
  const [view, setView] = useState('login'); // login, signup, welcome, tutorial, game, completion
  const [showSignup, setShowSignup] = useState(false);
  const [levelScore, setLevelScore] = useState(0);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setView('welcome');
  };

  const handleLogout = () => {
    setUser(null);
    setView('login');
    setCurrentLevel(1);
    resetStats();
  };

  const handleStartTutorial = () => {
    setView('tutorial');
  };

  const handleTutorialComplete = () => {
    setView('game');
    resetStats();
  };

  const handleLevelComplete = (score) => {
    setLevelScore(score);
    setView('completion');
  };

  const handleNextLevel = () => {
    setCurrentLevel(prev => prev + 1);
    resetStats();
    setView('game');
  };

  const handleReplayLevel = () => {
    resetStats();
    setView('game');
  };

  const handleMainMenu = () => {
    setCurrentLevel(1);
    resetStats();
    setView('welcome');
  };

  if (!user) {
    return showSignup ? (
      <Signup
        onSuccess={handleLoginSuccess}
        onSwitchToLogin={() => setShowSignup(false)}
      />
    ) : (
      <Login
        onSuccess={handleLoginSuccess}
        onSwitchToSignup={() => setShowSignup(true)}
      />
    );
  }

  return (
    <div className="min-h-screen">
      <Header onLogout={handleLogout} />

      {view === 'welcome' && <WelcomeScreen onStart={handleStartTutorial} />}
      {view === 'tutorial' && <TutorialScreen onComplete={handleTutorialComplete} />}
      {view === 'game' && <GameScreen onLevelComplete={handleLevelComplete} />}
      {view === 'completion' && (
        <CompletionScreen
          levelScore={levelScore}
          onNextLevel={handleNextLevel}
          onReplay={handleReplayLevel}
          onMainMenu={handleMainMenu}
        />
      )}
    </div>
  );
}

function App() {
  return (
    <GameProvider>
      <AppContent />
    </GameProvider>
  );
}

export default App;
