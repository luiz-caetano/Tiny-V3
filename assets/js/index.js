import axios from "axios";



const CLIENT_ID = "tiny-api-25f28f3ed79f02a4ddfa27c2d8a126443cf5995d-1752515544";
const REDIRECT_URI = "https://tiny-v3.vercel.app/";
const AUTH_URL = "https://accounts.tiny.com.br/realms/tiny/protocol/openid-connect/auth";

document.getElementById('authBtn').onclick = () => {
  const url = `${AUTH_URL}?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=openid&response_type=code`;
  window.location.href = url;
};

const urlParams = new URLSearchParams(window.location.search);
const code = urlParams.get('code');

const result = document.getElementById('result');

if (code) {
  console.log("Code recebido:", code);
  result.textContent = "Code recebido via GET: " + code;
} else {
  result.textContent = "Nenhum code na URL ainda.";
}