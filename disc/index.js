"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app_1 = __importDefault(require("./app"));
const database_1 = require("./config/database");
const PORT = process.env.PORT || 8000;
// connect Mongodb database
(0, database_1.connectMongoDB)();
app_1.default.listen(PORT, () => {
    console.log(`Searver listen on http://localhost:${PORT}`);
});
