import { useGame } from '../../context/GameContext';
import { logout } from '../../utils/api';

const Header = ({ onLogout }) => {
  const { user, totalScore } = useGame();

  const handleLogout = async () => {
    if (window.confirm('Are you sure you want to logout?')) {
      await logout();
      onLogout();
    }
  };

  return (
    <header className="bg-white shadow-lg">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold text-primary">🎮 LCM Master</h1>
          {user && (
            <span className="text-gray-600 text-sm">👋 {user.username}</span>
          )}
        </div>
        <div className="flex items-center gap-6">
          <span className="text-xl font-semibold text-primary">
            Score: {totalScore}
          </span>
          {user && (
            <button onClick={handleLogout} className="btn btn-primary text-sm">
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
