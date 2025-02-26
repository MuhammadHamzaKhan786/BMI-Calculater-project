'use client';

import { useState } from 'react';

export default function Home() {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [weight, setWeight] = useState('');
  const [heightUnit, setHeightUnit] = useState('cm');
  const [heightCm, setHeightCm] = useState('');
  const [heightFt, setHeightFt] = useState('');
  const [heightIn, setHeightIn] = useState('');
  const [bmi, setBmi] = useState<number | null>(null);
  const [bmiCategory, setBmiCategory] = useState('');
  const [showResults, setShowResults] = useState(false);

  const calculateBmi = () => {
    if (!weight) return;
    
    const weightInKg = parseFloat(weight);
    let heightInM = 0;
    
    if (heightUnit === 'cm') {
      if (!heightCm) return;
      heightInM = parseFloat(heightCm) / 100;
    } else {
      if (!heightFt) return;
      const feet = parseFloat(heightFt);
      const inches = parseFloat(heightIn || '0');
      // Convert feet and inches to meters
      heightInM = (feet * 30.48 + inches * 2.54) / 100;
    }
    
    if (weightInKg <= 0 || heightInM <= 0) return;
    
    const bmiValue = weightInKg / (heightInM * heightInM);
    setBmi(parseFloat(bmiValue.toFixed(1)));
    
    // Determine BMI category
    if (bmiValue < 18.5) {
      setBmiCategory('Underweight');
    } else if (bmiValue >= 18.5 && bmiValue < 25) {
      setBmiCategory('Normal weight');
    } else if (bmiValue >= 25 && bmiValue < 30) {
      setBmiCategory('Overweight');
    } else {
      setBmiCategory('Obese');
    }
    
    setShowResults(true);
  };

  const resetForm = () => {
    setAge('');
    setGender('');
    setWeight('');
    setHeightCm('');
    setHeightFt('');
    setHeightIn('');
    setBmi(null);
    setBmiCategory('');
    setShowResults(false);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-[#0f172a]">
      <div className="w-full max-w-md p-6 rounded-lg bg-[#1e293b] shadow-xl">
        <h1 className="text-3xl font-bold text-center text-[#60a5fa] mb-2">BMI Calculator</h1>
        <p className="text-center text-gray-400 mb-6">
          Created by Muhammad Hamza Khan
          <br />
          Manage your health efficiently
        </p>

        {!showResults ? (
          <div className="space-y-4">
            <div>
              <input
                type="number"
                placeholder="Enter Age"
                className="w-full p-3 rounded bg-[#0f172a] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>

            <div>
              <p className="text-white mb-2">Select Gender:</p>
              <div className="flex space-x-2">
                <button
                  className={`px-4 py-2 rounded ${
                    gender === 'male' 
                      ? 'bg-[#3b82f6] text-white' 
                      : 'bg-[#0f172a] text-white border border-gray-700'
                  }`}
                  onClick={() => setGender('male')}
                >
                  {gender === 'male' ? '✓ Male' : 'Male'}
                </button>
                <button
                  className={`px-4 py-2 rounded ${
                    gender === 'female' 
                      ? 'bg-[#3b82f6] text-white' 
                      : 'bg-[#0f172a] text-white border border-gray-700'
                  }`}
                  onClick={() => setGender('female')}
                >
                  {gender === 'female' ? '✓ Female' : 'Female'}
                </button>
              </div>
            </div>

            <div>
              <input
                type="number"
                placeholder="Enter Weight (kg)"
                className="w-full p-3 rounded bg-[#0f172a] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <p className="text-white">Enter Height in:</p>
                <div className="flex space-x-2">
                  <button
                    className={`px-3 py-1 text-sm rounded ${
                      heightUnit === 'cm' 
                        ? 'bg-[#3b82f6] text-white' 
                        : 'bg-[#0f172a] text-white border border-gray-700'
                    }`}
                    onClick={() => setHeightUnit('cm')}
                  >
                    cm
                  </button>
                  <button
                    className={`px-3 py-1 text-sm rounded ${
                      heightUnit === 'ft' 
                        ? 'bg-[#3b82f6] text-white' 
                        : 'bg-[#0f172a] text-white border border-gray-700'
                    }`}
                    onClick={() => setHeightUnit('ft')}
                  >
                    ft
                  </button>
                </div>
              </div>
              
              {heightUnit === 'cm' ? (
                <div className="relative">
                  <input
                    type="number"
                    placeholder="Height (cm)"
                    className="w-full p-3 rounded bg-[#0f172a] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={heightCm}
                    onChange={(e) => setHeightCm(e.target.value)}
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white">cm</span>
                </div>
              ) : (
                <div className="flex space-x-2">
                  <div className="relative flex-1">
                    <input
                      type="number"
                      placeholder="Feet"
                      className="w-full p-3 rounded bg-[#0f172a] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={heightFt}
                      onChange={(e) => setHeightFt(e.target.value)}
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white">ft</span>
                  </div>
                  <div className="relative flex-1">
                    <input
                      type="number"
                      placeholder="Inches"
                      className="w-full p-3 rounded bg-[#0f172a] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={heightIn}
                      onChange={(e) => setHeightIn(e.target.value)}
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white">in</span>
                  </div>
                </div>
              )}
            </div>

            <button
              className="w-full py-3 bg-[#3b82f6] text-white rounded font-medium hover:bg-blue-600 transition-colors"
              onClick={calculateBmi}
            >
              Calculate BMI
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white">Your BMI Result</h2>
              <div className="mt-4 mb-2">
                <span className="text-4xl font-bold text-[#60a5fa]">{bmi}</span>
              </div>
              <p className="text-xl text-white">{bmiCategory}</p>
            </div>

            <div className="bg-[#0f172a] p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-white mb-2">BMI Categories:</h3>
              <ul className="space-y-1 text-sm text-gray-300">
                <li className="flex justify-between">
                  <span>Underweight</span>
                  <span>&lt; 18.5</span>
                </li>
                <li className="flex justify-between">
                  <span>Normal weight</span>
                  <span>18.5 - 24.9</span>
                </li>
                <li className="flex justify-between">
                  <span>Overweight</span>
                  <span>25 - 29.9</span>
                </li>
                <li className="flex justify-between">
                  <span>Obese</span>
                  <span>&gt;= 30</span>
                </li>
              </ul>
            </div>

            <button
              className="w-full py-3 bg-gray-700 text-white rounded font-medium hover:bg-gray-600 transition-colors"
              onClick={resetForm}
            >
              Calculate Again
            </button>
          </div>
        )}
      </div>
    </main>
  );
}