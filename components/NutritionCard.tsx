import React from 'react';
import { NutritionData, Translations } from '../types';
import NutritionChart from './NutritionChart';
import { Flame, Scale, Wheat, Droplet } from 'lucide-react';

interface NutritionCardProps {
  data: NutritionData;
  texts: Translations;
}

const NutritionCard: React.FC<NutritionCardProps> = ({ data, texts }) => {
  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 animate-fade-in-up">
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-white">
        <h2 className="text-3xl font-bold capitalize">{data.foodName}</h2>
        <p className="opacity-90 mt-1 text-sm font-medium">
          {texts.servingSize}: {data.servingSize}
        </p>
      </div>

      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Col: Stats */}
        <div className="space-y-6">
          <div className="flex items-center space-x-4 bg-orange-50 p-4 rounded-2xl border border-orange-100">
            <div className="p-3 bg-orange-500 rounded-full text-white shadow-lg shadow-orange-200">
              <Flame size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-semibold uppercase tracking-wider">{texts.calories}</p>
              <p className="text-3xl font-extrabold text-gray-800">{data.calories} <span className="text-base font-normal text-gray-400">kcal</span></p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <MacroItem 
              label={texts.protein} 
              value={data.protein_g} 
              color="text-blue-600" 
              bgColor="bg-blue-50" 
              icon={<Scale size={16} />}
            />
            <MacroItem 
              label={texts.carbs} 
              value={data.carbs_g} 
              color="text-green-600" 
              bgColor="bg-green-50" 
              icon={<Wheat size={16} />}
            />
            <MacroItem 
              label={texts.fat} 
              value={data.fat_g} 
              color="text-amber-600" 
              bgColor="bg-amber-50" 
              icon={<Droplet size={16} />}
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4 text-sm text-gray-600">
             <div className="flex justify-between border-b border-gray-100 pb-2">
                <span>{texts.fiber}</span>
                <span className="font-bold">{data.fiber_g || 0}g</span>
             </div>
             <div className="flex justify-between border-b border-gray-100 pb-2">
                <span>{texts.sugar}</span>
                <span className="font-bold">{data.sugar_g || 0}g</span>
             </div>
          </div>
        </div>

        {/* Right Col: Chart */}
        <div className="flex items-center justify-center bg-gray-50 rounded-2xl border border-gray-100 p-2">
          <NutritionChart data={data} texts={texts} />
        </div>
      </div>
    </div>
  );
};

const MacroItem = ({ label, value, color, bgColor, icon }: { label: string, value: number, color: string, bgColor: string, icon: React.ReactNode }) => (
  <div className={`flex flex-col items-center justify-center p-3 rounded-xl ${bgColor} border border-transparent hover:border-gray-200 transition-colors`}>
    <div className={`mb-1 ${color} opacity-80`}>{icon}</div>
    <span className="text-xl font-bold text-gray-800">{value}g</span>
    <span className={`text-xs font-semibold uppercase ${color} mt-1`}>{label}</span>
  </div>
);

export default NutritionCard;
