import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Mock implementation for API Auth
  app.post("/api/auth/signup", (req, res) => {
    const { email, password, name } = req.body;
    console.log("Signup request:", { email, name });
    // In a real app, you'd save the user and generate a JWT
    res.json({ token: "mock-jwt-token", user: { email, name } });
  });

  app.post("/api/auth/signin", (req, res) => {
    const { email, password } = req.body;
    console.log("Signin request:", { email });
    // In a real app, you'd verify credentials and generate a JWT
    res.json({ token: "mock-jwt-token", user: { email } });
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
