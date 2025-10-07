const WelcomeScreen = ({ onStart }) => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="card max-w-4xl mx-auto animate-slide-up">
        <h2 className="text-4xl font-bold text-center text-primary mb-4">
          Welcome to LCM Master!
        </h2>
        <p className="text-xl text-center text-gray-600 mb-8">
          Learn about Lowest Common Multiple (LCM) through fun, interactive challenges!
        </p>

        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-8 mb-8">
          <h3 className="text-2xl font-bold text-primary mb-4">What is LCM?</h3>
          <p className="text-lg text-gray-700 mb-4">
            The <strong>Lowest Common Multiple</strong> (LCM) is the smallest number that is a multiple of two or more numbers.
          </p>

          <div className="bg-white rounded-lg p-6 border-l-4 border-secondary">
            <p className="font-semibold text-lg mb-2">Example:</p>
            <p className="text-gray-700 mb-1">LCM of 4 and 6:</p>
            <p className="text-gray-700">Multiples of 4: 4, 8, <span className="bg-yellow-200 px-2 py-1 rounded font-bold">12</span>, 16, 20...</p>
            <p className="text-gray-700">Multiples of 6: 6, <span className="bg-yellow-200 px-2 py-1 rounded font-bold">12</span>, 18, 24...</p>
            <p className="text-gray-700 font-bold mt-2">The LCM is <span className="text-primary text-xl">12</span></p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
            <div className="text-5xl mb-3">🎯</div>
            <h4 className="font-bold text-lg mb-2">Interactive Learning</h4>
            <p className="text-gray-600">Visual representations make LCM easy</p>
          </div>

          <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
            <div className="text-5xl mb-3">⭐</div>
            <h4 className="font-bold text-lg mb-2">Progressive Levels</h4>
            <p className="text-gray-600">Start simple, advance to challenges</p>
          </div>

          <div className="text-center p-6 bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl">
            <div className="text-5xl mb-3">🏆</div>
            <h4 className="font-bold text-lg mb-2">Track Progress</h4>
            <p className="text-gray-600">Monitor improvement and achievements</p>
          </div>
        </div>

        <button
          onClick={onStart}
          className="btn btn-primary w-full text-xl py-4 shadow-xl hover:shadow-2xl"
        >
          Start Learning! 🚀
        </button>
      </div>
    </div>
  );
};

export default WelcomeScreen;
