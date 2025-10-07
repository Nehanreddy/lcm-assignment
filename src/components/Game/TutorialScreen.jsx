import { useState, useEffect } from 'react';
import { generateMultiples, findCommonMultiples, calculateLCM } from '../../utils/mathUtils';

const TutorialScreen = ({ onComplete }) => {
  const [multiples1, setMultiples1] = useState([]);
  const [multiples2, setMultiples2] = useState([]);
  const [showLCM, setShowLCM] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const num1 = 3;
  const num2 = 4;
  const lcm = calculateLCM(num1, num2);

  useEffect(() => {
    animateTutorial();
  }, []);

  const animateTutorial = () => {
    const mults1 = generateMultiples(num1, 8);
    const mults2 = generateMultiples(num2, 8);
    const common = findCommonMultiples(mults1, mults2);

    // Animate first set
    mults1.forEach((mult, index) => {
      setTimeout(() => {
        setMultiples1(prev => [...prev, { value: mult, isCommon: common.includes(mult) }]);
      }, index * 300);
    });

    // Animate second set
    setTimeout(() => {
      mults2.forEach((mult, index) => {
        setTimeout(() => {
          setMultiples2(prev => [...prev, { value: mult, isCommon: common.includes(mult) }]);
        }, index * 300);
      });
    }, 1000);

    // Show LCM
    setTimeout(() => {
      setShowLCM(true);
    }, 5000);
  };

  const replayTutorial = () => {
    setMultiples1([]);
    setMultiples2([]);
    setShowLCM(false);
    animateTutorial();
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="card max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-primary mb-4">
          Interactive Tutorial
        </h2>
        <p className="text-xl text-center text-gray-600 mb-8">
          Watch as we visualize finding the LCM of <span className="font-bold text-primary">{num1}</span> and <span className="font-bold text-primary">{num2}</span>
        </p>

        <div className="space-y-8 mb-8">
          <div>
            <h3 className="text-2xl font-semibold text-center mb-4 text-primary">
              Multiples of {num1}
            </h3>
            <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
              {multiples1.map((mult, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-lg text-center font-bold text-lg transition-all duration-500 animate-fade-in ${
                    mult.isCommon
                      ? 'bg-success text-white scale-110 shadow-lg'
                      : 'bg-blue-100 text-primary border-2 border-primary'
                  }`}
                >
                  {mult.value}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-center mb-4 text-primary">
              Multiples of {num2}
            </h3>
            <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
              {multiples2.map((mult, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-lg text-center font-bold text-lg transition-all duration-500 animate-fade-in ${
                    mult.isCommon
                      ? 'bg-success text-white scale-110 shadow-lg'
                      : 'bg-purple-100 text-purple-600 border-2 border-purple-600'
                  }`}
                >
                  {mult.value}
                </div>
              ))}
            </div>
          </div>

          {showLCM && (
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-2xl p-8 text-center animate-slide-up shadow-2xl">
              <h3 className="text-3xl font-bold mb-3">🎉 LCM Found!</h3>
              <p className="text-xl mb-2">The smallest common multiple is:</p>
              <p className="text-6xl font-bold text-yellow-300">{lcm}</p>
            </div>
          )}
        </div>

        <div className="flex gap-4 justify-center">
          {showLCM && (
            <button
              onClick={onComplete}
              className="btn btn-primary text-xl px-8 py-4"
            >
              Start Playing! 🎮
            </button>
          )}
          <button
            onClick={replayTutorial}
            className="btn btn-secondary text-xl px-8 py-4"
          >
            Replay Tutorial 🔄
          </button>
        </div>
      </div>
    </div>
  );
};

export default TutorialScreen;
