const API_BASE = 'http://localhost/lcm-math-game/php';

export const signup = async (userData) => {
  try {
    const response = await fetch(`${API_BASE}/signup.php`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(userData),
    });
    
    const text = await response.text();
    console.log('Signup response:', text);
    
    try {
      return JSON.parse(text);
    } catch (e) {
      console.error('JSON parse error:', e);
      return { success: false, message: 'Server error: ' + text.substring(0, 100) };
    }
  } catch (error) {
    console.error('Signup error:', error);
    return { success: false, message: 'Network error: ' + error.message };
  }
};

export const login = async (credentials) => {
  try {
    const response = await fetch(`${API_BASE}/login.php`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(credentials),
    });
    
    const text = await response.text();
    console.log('Login response:', text);
    
    try {
      return JSON.parse(text);
    } catch (e) {
      console.error('JSON parse error:', e);
      return { success: false, message: 'Server error: ' + text.substring(0, 100) };
    }
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, message: 'Network error: ' + error.message };
  }
};

export const logout = async () => {
  try {
    const response = await fetch(`${API_BASE}/logout.php`, {
      method: 'POST',
      credentials: 'include',
    });
    return await response.json();
  } catch (error) {
    console.error('Logout error:', error);
    return { success: false, message: 'Logout failed' };
  }
};

export const saveScore = async (scoreData) => {
  try {
    const response = await fetch(`${API_BASE}/save_score.php`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(scoreData),
    });
    return await response.json();
  } catch (error) {
    console.error('Save score error:', error);
    return { success: false, message: 'Failed to save score' };
  }
};
