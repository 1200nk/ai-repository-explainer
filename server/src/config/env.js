import dotenv from "dotenv";

dotenv.config();

export default {
    PORT: process.env.PORT || 5000,

    GROQ_API_KEY: process.env.GROQ_API_KEY,

    GITHUB_TOKEN: process.env.GITHUB_TOKEN
};