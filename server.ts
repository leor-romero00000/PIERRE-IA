import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check endpoint
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", chef: "PIERRE Atelier" });
  });

  // Gemini AI Culinary Assistant endpoint
  app.post("/api/gemini/chat", async (req, res) => {
    try {
      const { message, history, context } = req.body;

      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey) {
        // High gastronomy expert fallback if no API key is set
        const defaultResponses = [
          `Como Chef de Cuisine, te aconsejo vigilar siempre el porcentaje de merma en el corte primario. Un 3% de desviación en la lubina altera el margen de servicio un 6%. ¿Deseas que analicemos la técnica de cocción a baja temperatura o el maridaje con vinos minerales?`,
          `Excelente propuesta culinaria. Para elevar este plato a nivel de 2 estrellas Michelin, te sugiero contrastar la untuosidad del puré de chirivía con una reducción ácida de cidra o unas gotas de clorofila de acedera fresca. Esto potenciará el sabor sin añadir costo significativo al escandallo.`,
          `Para optimizar el escandallo sin comprometer la alta cocina: negocia compras estacionales directas de lonja y aprovecha las espinas y recortes para un fondo oscuro tostado que sirva de glaseado para otro servicio.`,
          `El equilibrio del menú degustación reside en la cadencia: tras un bocado graso como el magret o la mantequilla noisette, introduce una nota herbácea crujiente para limpiar el paladar antes del pase dulce.`
        ];
        const randomResp = defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
        return res.json({
          reply: randomResp,
          source: "atelier-engine"
        });
      }

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });

      const systemInstruction = `Eres PIERRE, un Executive Chef y Maître Cuisinier de alta gastronomía internacional con 2 estrellas Michelin y maestro en escandallos financieros y cocina de vanguardia.
Hablas con un tono distinguido, elegante, pedagógico y apasionado ("Chef", "Colega", "Estimado Chef").
Tus conocimientos abarcan:
1. Escandallos precisos (costo de materia prima, mermas, rendimientos, PVP sugerido, margen bruto del 65% al 85% en alta cocina).
2. Técnicas culinarias (sous-vide, confitado, reducciones, emulsiones, clarificados, fermentaciones).
3. Armonía de sabores, texturas y emplatados contemporáneos en vajilla oscura/artesanal.
4. Maridajes y diseño de menús degustación.
Responde de manera concisa pero profunda y profesional en español, aportando siempre un consejo técnico y un tip de rentabilidad si es pertinente. Contexto del plato actual si existe: ${JSON.stringify(context || {})}`;

      let conversationPrompt = `Mensaje del chef: ${message}`;
      if (history && Array.isArray(history) && history.length > 0) {
        const historyText = history
          .slice(-6)
          .map((h: { sender: string; text: string }) => `${h.sender === "user" ? "Chef" : "Pierre"}: ${h.text}`)
          .join("\n");
        conversationPrompt = `Historial previo:\n${historyText}\n\nChef: ${message}`;
      }

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: conversationPrompt,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      res.json({
        reply: response.text || "Un placer colaborar en su atelier, Chef. ¿Qué otro aspecto culinario desea pulir?",
        source: "gemini"
      });
    } catch (error: any) {
      console.error("Gemini API error:", error);
      res.json({
        reply: "Estimado Chef, he tomado nota de su consulta. En el atelier consideramos primordial mantener un margen bruto superior al 70% equilibrando la proteína noble con vegetales de estación como la chirivía o tubérculos asados a la sal. ¿Continuamos con el escandallo de la receta?",
        source: "atelier-fallback"
      });
    }
  });

  // Vite middleware for development vs static build in production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`PIERRE Atelier server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
