import express from "express";
import fetch from "node-fetch";

const app = express();

const CLIENT_ID = "CLIENT_ID";
const CLIENT_SECRET = "CLIENT_SECRET";
const REDIRECT_URI = "http://localhost:5500/callback";

// 1. Rota para iniciar login
app.get("/login", (req, res) => {
  const authUrl = `https://accounts.tiny.com.br/realms/tiny/protocol/openid-connect/auth?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=openid&response_type=code`;
  res.redirect(authUrl);
});

// 2. Callback do Tiny com "code"
app.get("/callback", async (req, res) => {
  const code = req.query.code;

  const tokenUrl = "https://accounts.tiny.com.br/realms/tiny/protocol/openid-connect/token";

  const params = new URLSearchParams();
  params.append("grant_type", "authorization_code");
  params.append("client_id", CLIENT_ID);
  params.append("client_secret", CLIENT_SECRET);
  params.append("redirect_uri", REDIRECT_URI);
  params.append("code", code);

  try {
    const response = await fetch(tokenUrl, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params
    });

    const data = await response.json();
    console.log("Tokens recebidos:", data);

    res.json(data);
  } catch (err) {
    console.error("Erro ao buscar token:", err);
    res.status(500).send("Erro na autenticação");
  }
});

app.listen(3000, () => console.log("App rodando em http://localhost:5500"));
