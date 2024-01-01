"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserDetail = exports.authenticateJwt = exports.SECRET = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userService_1 = __importDefault(require("../services/userService"));
exports.SECRET = 'SeCret';
const authenticateJwt = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jsonwebtoken_1.default.verify(token, exports.SECRET, (err, payload) => {
            if (err) {
                return res.sendStatus(403);
            }
            if (!payload || typeof payload == 'string') {
                return res.sendStatus(403);
            }
            //sending userId from headers to next request
            req.headers.userId = payload.id;
            next();
        });
    }
    else {
        res.sendStatus(401);
    }
};
exports.authenticateJwt = authenticateJwt;
const getUserDetail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const user = yield userService_1.default.getUserByUserId(req.headers.userId);
        if (user) {
            req.headers.email = user.email;
            req.headers.age = (_a = user.age) === null || _a === void 0 ? void 0 : _a.toString();
            next();
        }
        else
            res.status(403).json({ message: 'User not logged in' });
    }
    catch (error) {
        res.status(403).json({ message: 'Unable to fetch user details' });
    }
});
exports.getUserDetail = getUserDetail;
