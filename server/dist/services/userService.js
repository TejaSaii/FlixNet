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
const getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield db_1.User.findOne({ email });
        return user;
    }
    catch (error) {
        throw new Error('Unable to fetch user by email');
    }
});
const getUserByUserId = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield db_1.User.findOne({ _id });
        return user;
    }
    catch (error) {
        throw new Error('Unable to fetch user by Id');
    }
});
const getUserByEmailPassword = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield db_1.User.findOne({ email, password });
        return user;
    }
    catch (error) {
        throw new Error('Unable to fetch user by email and password');
    }
});
const saveUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (user) {
            const newUser = new db_1.User(user);
            yield newUser.save();
            return newUser;
        }
    }
    catch (error) {
        throw new Error('Unable to save user');
    }
});
exports.default = { getUserByEmail, getUserByUserId, saveUser, getUserByEmailPassword };
