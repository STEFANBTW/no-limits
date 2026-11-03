import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes FIRST
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.post("/api/chat", async (req, res) => {
    try {
      const { messages, input, productsContent } = req.body;
      
      const ai = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      const navigateToProductTool = {
        functionDeclarations: [{
          name: "navigateToProduct",
          description: "Navigate the user to a specific product's detail page. Use this when the user asks to see a product, wants to view a 3D model, or wants more details about a specific piece.",
          parameters: {
            type: Type.OBJECT,
            properties: {
              slug: {
                type: Type.STRING,
                description: "The unique slug of the product to navigate to.",
              },
              message: {
                type: Type.STRING,
                description: "A short, sophisticated confirmation message to tell the user while navigating.",
              }
            },
            required: ["slug", "message"],
          },
        }]
      };

      const systemInstruction = `You are Sawyer, the Master Joiner and AI assistant for 'No Limits Furniture'. You are sophisticated, knowledgeable about carpentry, furniture design, and architectural history. 
        
        CURRENT CATALOG:
        ${productsContent}
        
        IMPORTANT GUIDELINES:
        1. If a user asks to see a product or a 3D model, USE the navigateToProduct tool immediately.
        2. When guiding to a 3D model, EXPLICITLY mention it is on the SIXTH SLIDE of the gallery.
        3. Tone: Professional, slightly poetic, and helpful. 
        4. Keep responses concise but elegant.`;

      const history = messages.map((m: any) => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }]
      }));

      const chat = ai.chats.create({ 
        model: "gemini-3-flash-preview",
        config: {
          systemInstruction,
          tools: [navigateToProductTool],
        },
        history
      });
      
      const result = await chat.sendMessage({ message: input });
      
      const functionCalls = result.functionCalls;
      if (functionCalls && functionCalls.length > 0) {
        const call = functionCalls[0];
        if (call.name === "navigateToProduct") {
          return res.json({ 
            toolCall: {
              name: call.name,
              args: call.args
            }
          });
        }
      }

      const aiContent = result.text || "I apologize, but I seem to have lost my train of thought. How else can I help?";
      res.json({ text: aiContent });

    } catch (e: any) {
      console.error(e);
      res.status(500).json({ error: e.message || "Server error" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
