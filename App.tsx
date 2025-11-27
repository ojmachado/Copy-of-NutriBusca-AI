import React, { useState } from 'react';
import { Search, Loader2, Apple } from 'lucide-react';
import { Language, NutritionData } from './types';
import { TEXTS } from './constants';
import { analyzeFood } from './services/geminiService';
import LanguageToggle from './components/LanguageToggle';
import NutritionCard from './components/NutritionCard';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('pt-BR');
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<NutritionData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const texts = TEXTS[lang];

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setData(null);

    try {
      const result = await analyzeFood(query, lang);
      setData(result);
    } catch (err) {
      console.error(err);
      setError(texts.errorGeneric);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800 selection:bg-green-200">
      
      {/* Header / Nav */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="bg-green-600 p-2 rounded-lg text-white">
              <Apple size={24} fill="currentColor" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-gray-900">{texts.title}</h1>
          </div>
          <LanguageToggle currentLang={lang} onToggle={setLang} />
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8 md:py-12 flex flex-col items-center">
        
        {/* Hero Section */}
        <div className="text-center mb-10 w-full animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-600 pb-1">
            {texts.nutritionalInfo}
          </h2>
          <p className="text-lg text-gray-500 max-w-lg mx-auto">
            {texts.subtitle}
          </p>
        </div>

        {/* Search Bar */}
        <div className="w-full max-w-2xl relative mb-12 group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-green-600 transition-colors">
            <Search size={20} />
          </div>
          <form onSubmit={handleSearch}>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={texts.searchPlaceholder}
              className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-2xl shadow-sm text-lg outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all placeholder:text-gray-300"
            />
            <button
              type="submit"
              disabled={loading || !query.trim()}
              className="absolute right-2 top-2 bottom-2 bg-gray-900 hover:bg-green-600 text-white px-6 rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                texts.searchButton
              )}
            </button>
          </form>
        </div>

        {/* Content Area */}
        <div className="w-full">
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl text-center border border-red-100 animate-fade-in">
              {error}
            </div>
          )}

          {data && !loading && (
            <NutritionCard data={data} texts={texts} />
          )}
          
          {/* Empty State / Initial placeholder suggestion if desired, or just whitespace */}
          {!data && !loading && !error && (
            <div className="hidden md:flex justify-center opacity-30 mt-8">
               <Apple size={120} className="text-gray-300" />
            </div>
          )}
        </div>

      </main>

      <footer className="mt-auto py-6 text-center text-sm text-gray-400 bg-white border-t border-gray-100">
        <p>© {new Date().getFullYear()} {texts.title}. Powered by Gemini.</p>
      </footer>
    </div>
  );
};

export default App;
