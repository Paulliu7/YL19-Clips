import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "YL19-Clips API is running" });
  });

  // Mock AI Processing Route
  app.post("/api/process-video", async (req, res) => {
    const { url, rules } = req.body;
    
    // In a real app, we would:
    // 1. Download/Fetch video
    // 2. Transcribe using Whisper
    // 3. Analyze with Gemini
    // 4. Cut with FFmpeg
    
    // For this demo, we'll simulate the AI analysis
    const isImageToVideo = rules.toLowerCase().includes('image to video');
    const isMusicSync = rules.toLowerCase().includes('music beat-sync');

    setTimeout(() => {
      res.json({
        success: true,
        clips: [
          {
            id: "1",
            title: isImageToVideo ? "3D Parallax: Hero Image" : "The Hook: Product Reveal",
            startTime: 0,
            endTime: 15,
            score: 98,
            reason: isImageToVideo 
              ? "Successfully transformed static image into a 3D parallax motion clip." 
              : "Strong visual hook in the first 3 seconds as requested in rules.",
            transcript: isImageToVideo ? "[Visual Motion Only]" : "Look at this amazing new feature we just launched...",
            editingNotes: isMusicSync 
              ? "Beat-synced cuts at 0:04, 0:08, and 0:12. Intensity matches action."
              : "Zoom in at 0:02, add dynamic captions with 'NEW' highlight."
          },
          {
            id: "2",
            title: isMusicSync ? "High-Intensity: Action Spike" : "Emotional Spike: Success Story",
            startTime: 45,
            endTime: 75,
            score: 92,
            reason: isMusicSync 
              ? "Cuts perfectly aligned with music transients and bass drops."
              : "High emotional intensity detected through voice modulation.",
            transcript: "...and that's when I realized this changes everything for my business.",
            editingNotes: isImageToVideo 
              ? "Added ken-burns effect with AI-generated depth map."
              : "Slow zoom out, add soft background music swell."
          },
          {
            id: "3",
            title: "The Punchline: Soft Sell",
            startTime: 120,
            endTime: 150,
            score: 85,
            reason: "Perfect transition from education to soft-selling product.",
            transcript: "You don't need to be an expert to get these results yourself.",
            editingNotes: "Jump cut on key phrases, use TikTok-style captions."
          }
        ]
      });
    }, 2000);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
