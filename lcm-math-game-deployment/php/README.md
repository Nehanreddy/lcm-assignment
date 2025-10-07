# LCM Master - Math Learning Game

## 🎮 Project Description
An interactive educational game for learning Lowest Common Multiple (LCM) concepts, designed for students in grades 4-7.

## 🛠️ Tech Stack
- **Frontend**: React.js + Vite + Tailwind CSS
- **Backend**: PHP
- **Database**: MySQL
- **Authentication**: Session-based with password hashing

## 📋 Features
- User authentication (signup/login)
- Interactive LCM tutorial with visual animations
- Progressive difficulty levels
- Hint system
- Score tracking and achievements
- Responsive design

## 🚀 Installation Instructions

### Prerequisites
- PHP 7.4 or higher
- MySQL 5.7 or higher
- Apache web server

### Step 1: Database Setup
1. Create a MySQL database named `math_game_db`
2. Import the SQL file from `database/schema.sql`

### Step 2: Configure Database Connection
1. Open `php/config.php`
2. Update the database credentials:
define('DB_HOST', 'localhost');
define('DB_USER', 'your_username');
define('DB_PASS', 'your_password');
define('DB_NAME', 'math_game_db');


### Step 3: Deploy Files
1. Upload all files to your web server's public directory
2. Ensure the `.htaccess` file is uploaded
3. Set proper file permissions (755 for folders, 644 for files)

### Step 4: Access the Application
Open your browser and navigate to your domain/hosting URL

## 🎯 How to Play
1. Create an account or login
2. Watch the interactive tutorial
3. Start playing through progressive levels
4. Use hints when needed
5. Track your progress and earn achievements

## 📁 Project Structure
lcm-math-game/
├── index.html # Main entry point
├── assets/ # JS, CSS, and static files
├── php/ # Backend API files
├── database/ # SQL schema
└── .htaccess # Apache configuration


## 👨‍💻 Developer
Developed by [Your Name] for teaching mathematics through interactive games.

## 📝 License
Educational project for demonstration purposes.


# 1. Copy everything from dist folder to deployment folder root
# 2. Add php folder
# 3. Add database folder
# 4. Add .htaccess
# 5. Add README.md
