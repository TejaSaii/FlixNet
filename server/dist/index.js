"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const auth_1 = __importDefault(require("./routes/auth"));
const video_1 = __importDefault(require("./routes/video"));
const mongoose_1 = __importDefault(require("mongoose"));
const port = 3000;
const cors_1 = __importDefault(require("cors"));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/auth", auth_1.default);
app.use("/app", video_1.default);
//add middleware for movies route
app.listen(port, () => {
    console.log(`Example app running at ${port}`);
});
//connect mongo using mongoose
mongoose_1.default.connect("mongodb+srv://Tejas7844:Tejas7844@cluster0.p7ngkpk.mongodb.net/flixnet");
