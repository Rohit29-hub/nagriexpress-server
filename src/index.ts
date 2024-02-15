import dotenv from 'dotenv'
dotenv.config();
import app from "./app";
import { connectMongoDB } from './config/database';
const PORT = process.env.PORT || 8000;

// connect Mongodb database
connectMongoDB();

app.listen(PORT, () => {
    console.log(`Searver listen on http://localhost:${PORT}`);
});
