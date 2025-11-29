import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const cleanText = (text: string | undefined): string => {
  if (!text) return "";
  // Remove markdown bolding (**) and trim
  return text.replace(/\*\*/g, '').trim();
};

export const generateProductDescription = async (productName: string, category: string): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    const prompt = `Rédige une description courte, chic et vendeuse (maximum 30 mots) pour un produit nommé "${productName}" dans la catégorie "${category}". Le produit est vendu par la marque Chall en Algérie. Si c'est un vêtement, parle du tissu et du style. Si c'est un cosmétique, parle des bienfaits naturels.`;
    
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });

    return cleanText(response.text) || "Description non disponible.";
  } catch (error) {
    console.error("Error generating description:", error);
    return "Impossible de générer la description pour le moment.";
  }
};

export const generateMarketingSlogan = async (): Promise<string> => {
    try {
      const model = 'gemini-2.5-flash';
      const prompt = `Génère un slogan court, moderne et percutant (max 1 phrase) pour "Chall", une marque algérienne de vêtements tendance (Homme/Femme) et de cosmétiques naturels. Le ton doit être élégant. Ne mets pas de guillemets.`;
      
      const response = await ai.models.generateContent({
        model: model,
        contents: prompt,
      });
  
      return cleanText(response.text) || "L'élégance à l'algérienne.";
    } catch (error) {
      console.error("Error generating slogan:", error);
      return "L'élégance à l'algérienne.";
    }
  };