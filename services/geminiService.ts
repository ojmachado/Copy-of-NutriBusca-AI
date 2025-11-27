import { GoogleGenAI, Type } from "@google/genai";
import { NutritionData, Language } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeFood = async (query: string, lang: Language): Promise<NutritionData> => {
  const modelId = "gemini-2.5-flash";

  const systemInstruction = `
    You are an expert nutritionist. 
    Analyze the food name provided by the user. 
    Return nutritional data for a standard serving size of that food.
    If the food is ambiguous, choose the most common variation.
    The 'foodName' and 'servingSize' fields must be translated to the requested language (${lang}).
    Return numbers for values.
  `;

  const response = await ai.models.generateContent({
    model: modelId,
    contents: query,
    config: {
      systemInstruction: systemInstruction,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          foodName: { type: Type.STRING, description: `The name of the food in ${lang}` },
          calories: { type: Type.NUMBER, description: "Total calories in kcal" },
          protein_g: { type: Type.NUMBER, description: "Protein content in grams" },
          carbs_g: { type: Type.NUMBER, description: "Carbohydrate content in grams" },
          fat_g: { type: Type.NUMBER, description: "Total fat content in grams" },
          fiber_g: { type: Type.NUMBER, description: "Fiber content in grams" },
          sugar_g: { type: Type.NUMBER, description: "Sugar content in grams" },
          servingSize: { type: Type.STRING, description: `Description of the serving size in ${lang}, e.g., '100g' or '1 unidade'` },
        },
        required: ["foodName", "calories", "protein_g", "carbs_g", "fat_g", "servingSize"],
      },
    },
  });

  const text = response.text;
  if (!text) {
    throw new Error("No data returned from Gemini");
  }

  return JSON.parse(text) as NutritionData;
};
