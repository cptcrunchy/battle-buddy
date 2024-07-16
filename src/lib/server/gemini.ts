import { GoogleGenerativeAI } from "@google/generative-ai";
import { GOOGLE_GEMINI_API_KEY } from "$env/static/private";

const gemini = new GoogleGenerativeAI(GOOGLE_GEMINI_API_KEY);