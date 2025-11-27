import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { NutritionData, Translations } from '../types';

interface NutritionChartProps {
  data: NutritionData;
  texts: Translations;
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b']; // Blue (Protein), Green (Carbs), Amber (Fat)

const NutritionChart: React.FC<NutritionChartProps> = ({ data, texts }) => {
  const chartData = [
    { name: texts.protein, value: data.protein_g },
    { name: texts.carbs, value: data.carbs_g },
    { name: texts.fat, value: data.fat_g },
  ];

  // Filter out zero values to avoid empty segments looking weird
  const activeData = chartData.filter(d => d.value > 0);

  return (
    <div className="w-full h-64">
      <h3 className="text-lg font-semibold text-gray-700 text-center mb-2">{texts.macrosBreakdown}</h3>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={activeData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {activeData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value: number) => `${value}g`}
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
          />
          <Legend verticalAlign="bottom" height={36}/>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default NutritionChart;
