
import { GoogleGenAI } from "@google/genai";
import { Product } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const cleanText = (text: string | undefined): string => {
  if (!text) return "";
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

export const chatWithSupport = async (message: string, contextInfo: string, language: string): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    const prompt = `
      You are "ChallBot", the helpful and polite AI customer support agent for 'Chall', an Algerian online store selling traditional/modern clothes and cosmetics.
      
      Current Language: ${language} (You MUST reply in this language).
      
      User Context (Orders/Info):
      ${contextInfo}
      
      User Message: "${message}"
      
      Instructions:
      1. Answer the user's question concisely and professionally.
      2. If they ask about their order, check the "User Context" above.
      3. If they have a problem, offer to contact support at +213 659 82 77 82 or aouadichamseddine@gmail.com.
      4. Keep the tone warm and welcoming.
      5. Do not use Markdown formatting (like bold ** or *), just plain text.
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });

    return cleanText(response.text) || (language === 'ar' ? "آسف، لا أستطيع الرد حالياً." : "Désolé, je ne peux pas répondre pour le moment.");
  } catch (error) {
    console.error("Error in chat support:", error);
    return language === 'ar' ? "حدث خطأ، يرجى المحاولة لاحقاً." : "Une erreur est survenue, veuillez réessayer.";
  }
};

export const importProductFromWeb = async (keyword: string, source: 'amazon' | 'alibaba'): Promise<Partial<Product>> => {
  try {
    const model = 'gemini-2.5-flash';
    // This prompt simulates a scraper by asking the AI to hallucinate realistic product data
    const prompt = `
      Act as an e-commerce scraper agent. I need you to generate a REALISTIC product listing for the keyword: "${keyword}" from ${source}.
      
      Return ONLY a valid JSON object with the following structure (no markdown, no extra text):
      {
        "name": "A professional product title (French)",
        "price": 5000 (Estimate price in Algerian Dinar DZD),
        "description": "A compelling description (French)",
        "category": "Choose closest: Homme, Femme, Cosmétique, Accessoires, Électronique, Maison",
        "specs": { "Material": "...", "Weight": "...", "Origin": "..." },
        "features": ["Feature 1", "Feature 2", "Feature 3"]
      }
    `;

    const response = await ai.models.generateContent({
        model: model,
        contents: prompt,
        config: { responseMimeType: "application/json" }
    });

    const data = JSON.parse(response.text);
    return {
        ...data,
        image: `https://source.unsplash.com/800x800/?${encodeURIComponent(keyword)}`, // Fallback image since we can't scrape real URLs
        stock: 50,
        rating: 4.5,
        reviews: 0
    };
  } catch (error) {
    console.error("Import error:", error);
    throw new Error("Failed to import product.");
  }
};
