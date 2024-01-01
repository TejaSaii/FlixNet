"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = require("../controllers/index");
const router = express_1.default.Router();
router.post('/signup', index_1.signupUser);
router.post('/login', index_1.loginUser);
exports.default = router;
