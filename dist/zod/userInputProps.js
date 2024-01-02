"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userInputProps = void 0;
const zod_1 = require("zod");
exports.userInputProps = zod_1.z.object({
    email: zod_1.z.string().email().min(8),
    password: zod_1.z.string().min(4),
    age: zod_1.z.number().int().positive().min(1).max(150),
});
