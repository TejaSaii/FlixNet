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
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../db");
const getVideoCount = (query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let count = yield db_1.Video.countDocuments(query);
        return count;
    }
    catch (error) {
        throw new Error('Unable to fetch video count');
    }
});
const getVideos = (query, skip, pageSize) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const videos = yield db_1.Video.find(query)
            .skip(skip)
            .limit(pageSize)
            .exec();
        return videos;
    }
    catch (error) {
        throw new Error('Unable to fetch videos');
    }
});
const getVideoDetails = (query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const details = yield db_1.Video.find(query);
        return details;
    }
    catch (error) {
        throw new Error('Video details not found');
    }
});
exports.default = { getVideoCount, getVideos, getVideoDetails };
