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
exports.getVideo = exports.getVideos = exports.loginUser = exports.signupUser = void 0;
const userService_1 = __importDefault(require("../services/userService"));
const middleware_1 = require("../middleware");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userInputProps_1 = require("../zod/userInputProps");
const videoService_1 = __importDefault(require("../services/videoService"));
const signupUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //validate if input is correct
    const parsedUserInput = userInputProps_1.userInputProps.safeParse(req.body);
    if (!parsedUserInput.success) {
        res.status(411).json({
            mes: parsedUserInput.error
        });
        return;
    }
    //get data, check in db if not present, then save
    try {
        const userData = parsedUserInput.data;
        const user = yield userService_1.default.getUserByEmail(userData.email);
        if (user) {
            res.status(403).json({ message: 'User already exists' });
        }
        else {
            const newUser = yield userService_1.default.saveUser(userData);
            if (newUser === undefined) {
                res.status(500).json({ message: 'Unablet to create new user' });
            }
            else {
                const token = jsonwebtoken_1.default.sign({ id: newUser._id }, middleware_1.SECRET, { expiresIn: '1h' });
                res.json({
                    message: 'User created successfully',
                    token: token,
                    _id: newUser._id,
                });
            }
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.signupUser = signupUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsedUserInput = userInputProps_1.userInputProps.safeParse(req.body);
    if (!parsedUserInput.success) {
        return res.status(411).json({
            mes: parsedUserInput.error,
        });
    }
    //if user is present then success else invalid
    const { email, password } = parsedUserInput.data;
    try {
        const user = yield userService_1.default.getUserByEmailPassword(email, password);
        if (user === null) {
            res.status(403).json({ message: 'User not found' });
        }
        else {
            const token = jsonwebtoken_1.default.sign({ id: user._id }, middleware_1.SECRET, { expiresIn: '1h' });
            res.json({ message: 'Logged in successfully', token });
        }
    }
    catch (error) {
        res.status(403).json({ message: error.message });
    }
});
exports.loginUser = loginUser;
const getVideos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const age = parseInt(req.headers.age);
    const { keyword, type } = req.query;
    try {
        const query = generateQuery(age, keyword, type);
        paginate(req, query, res);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getVideos = getVideos;
const getVideo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const showId = req.query.showId;
    const age = parseInt(req.headers.age);
    try {
        let query = generateQuery(age);
        query = {
            $and: [
                Object.assign({}, query),
                { show_id: showId },
            ]
        };
        const details = videoService_1.default.getVideoDetails(query);
        res.json({ details });
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
});
exports.getVideo = getVideo;
//helper function to paginate the data from query and return response
const paginate = (req, query, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pageNumber = parseInt(req.query.page) || 1;
    const pageSize = 15;
    const skip = (pageNumber - 1) * pageSize;
    const totalVideos = yield videoService_1.default.getVideoCount(query);
    if (!totalVideos) {
        res.status(500).json({ message: 'Error fetching video count' });
    }
    const totalPages = Math.ceil(totalVideos / pageSize);
    const videos = yield videoService_1.default.getVideos(query, skip, pageSize);
    if (!videos) {
        res.status(404).json({ message: 'Error fetching data' });
    }
    res.json({
        result: videos,
        meta_data: {
            page: pageNumber,
            size: pageSize,
            total_records: totalVideos,
            total_pages: totalPages,
        }
    });
});
//helper function to generate the query based on conditions
const generateQuery = (age, keyword = "", type = "") => {
    const conditions = [];
    const isAbove18 = (age >= 18) ? true : false;
    if (!isAbove18) {
        conditions.push({ rating: { $ne: "R" } });
    }
    if (keyword) {
        conditions.push({
            $or: [
                { title: { $regex: keyword, $options: 'i' } },
                { cast: { $regex: keyword, $options: 'i' } }
            ]
        });
    }
    if (type) {
        conditions.push({ type: type });
    }
    return (conditions.length !== 0) ? { $and: conditions } : {};
};
