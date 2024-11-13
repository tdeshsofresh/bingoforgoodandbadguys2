import React, { useEffect } from 'react';

interface VictoryProps {
  onClose: () => void;
}

export const Victory: React.FC<VictoryProps> = ({ onClose }) => {
  useEffect(() => {
    // Simple emoji animation using DOM
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.inset = '0';
    container.style.pointerEvents = 'none';
    container.style.zIndex = '100';
    document.body.appendChild(container);

    const emojis = ['🌟', '❤️', '✨', '🎉', '🎊', '🌈', '⭐'];
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      particle.style.position = 'absolute';
      particle.style.left = Math.random() * 100 + 'vw';
      particle.style.top = '-20px';
      particle.style.fontSize = Math.random() * 20 + 20 + 'px';
      particle.style.transition = 'transform 1s linear, top 1s linear';
      container.appendChild(particle);

      // Random delay for each particle
      setTimeout(() => {
        particle.style.top = '120vh';
        particle.style.transform = `translateX(${Math.random() * 200 - 100}px)`;
      }, Math.random() * 3000);
    }

    return () => {
      document.body.removeChild(container);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-xl shadow-2xl text-center max-w-md mx-4">
        <h2 className="text-6xl font-bold mb-4 text-gradient-rainbow">
          BINGO! 🎉
        </h2>
        <p className="text-xl mb-6">
          You completed a row! 
          <span className="block mt-2">
            {'🌟 '.repeat(5)}
          </span>
        </p>
        <button
          onClick={onClose}
          className="px-8 py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 
                   text-white rounded-lg font-bold text-xl hover:opacity-90 transition-opacity
                   hover:scale-105 transform duration-200"
        >
          Play Again
        </button>
      </div>
    </div>
  );
}; 