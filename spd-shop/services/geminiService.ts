import { GoogleGenAI, Type } from "@google/genai";
import { TriviaQuestion } from "../types";

// Initialize the client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateTriviaQuestions = async (topic: string = "general knowledge", count: number = 3): Promise<TriviaQuestion[]> => {
  try {
    const modelId = "gemini-2.5-flash";
    
    const response = await ai.models.generateContent({
      model: modelId,
      contents: `Generate ${count} unique multiple-choice trivia questions about ${topic}. The questions should be challenging but answerable.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              question: { type: Type.STRING },
              options: { 
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "A list of 4 possible answers."
              },
              correctAnswer: { 
                type: Type.STRING,
                description: "Must be exactly one of the strings from the options array."
              },
              difficulty: {
                type: Type.STRING,
                enum: ["Easy", "Medium", "Hard"]
              }
            },
            required: ["question", "options", "correctAnswer", "difficulty"]
          }
        }
      }
    });

    const text = response.text;
    if (!text) return [];
    
    return JSON.parse(text) as TriviaQuestion[];
  } catch (error) {
    console.error("Failed to generate trivia:", error);
    // Fallback questions in case of API failure or limits
    return [
      {
        question: "Which ancient civilization built the Machu Picchu complex?",
        options: ["Aztec", "Maya", "Inca", "Olmec"],
        correctAnswer: "Inca",
        difficulty: "Easy"
      },
      {
        question: "Who painted 'The School of Athens'?",
        options: ["Michelangelo", "Leonardo da Vinci", "Raphael", "Donatello"],
        correctAnswer: "Raphael",
        difficulty: "Medium"
      },
      {
        question: "What is the chemical symbol for Gold?",
        options: ["Ag", "Au", "Fe", "Cu"],
        correctAnswer: "Au",
        difficulty: "Easy"
      }
    ];
  }
};