export const calculateLCM = (a, b) => {
  return (a * b) / calculateGCD(a, b);
};

export const calculateGCD = (a, b) => {
  while (b !== 0) {
    let temp = b;
    b = a % b;
    a = temp;
  }
  return a;
};

export const generateMultiples = (num, limit) => {
  const multiples = [];
  for (let i = 1; i <= limit; i++) {
    multiples.push(num * i);
  }
  return multiples;
};

export const findCommonMultiples = (arr1, arr2) => {
  return arr1.filter(num => arr2.includes(num));
};

export const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const generateWrongAnswers = (correctAnswer, count = 3) => {
  const wrongAnswers = new Set();
  const variations = [
    correctAnswer + 1,
    correctAnswer - 1,
    correctAnswer + 2,
    correctAnswer - 2,
    correctAnswer * 2,
    Math.floor(correctAnswer / 2),
    correctAnswer + 5,
    correctAnswer - 5,
  ];
  
  const validVariations = variations.filter(ans => ans > 0 && ans !== correctAnswer);
  const shuffledVariations = shuffleArray(validVariations);
  
  for (let i = 0; i < Math.min(count, shuffledVariations.length); i++) {
    wrongAnswers.add(shuffledVariations[i]);
  }
  
  while (wrongAnswers.size < count) {
    const newWrong = correctAnswer + randomNumber(-15, 15);
    if (newWrong > 0 && newWrong !== correctAnswer) {
      wrongAnswers.add(newWrong);
    }
  }
  
  return Array.from(wrongAnswers).slice(0, count);
};
