import React from 'react';
import { Language } from '../types';

interface LanguageToggleProps {
  currentLang: Language;
  onToggle: (lang: Language) => void;
}

const LanguageToggle: React.FC<LanguageToggleProps> = ({ currentLang, onToggle }) => {
  return (
    <div className="flex bg-white rounded-full p-1 shadow-sm border border-gray-200">
      <button
        onClick={() => onToggle('pt-BR')}
        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
          currentLang === 'pt-BR'
            ? 'bg-green-600 text-white shadow-md'
            : 'text-gray-500 hover:text-green-600'
        }`}
      >
        🇧🇷 Português
      </button>
      <button
        onClick={() => onToggle('en-US')}
        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
          currentLang === 'en-US'
            ? 'bg-blue-600 text-white shadow-md'
            : 'text-gray-500 hover:text-blue-600'
        }`}
      >
        🇺🇸 English
      </button>
    </div>
  );
};

export default LanguageToggle;
