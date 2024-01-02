"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middleware_1 = require("../middleware");
const controllers_1 = require("../controllers");
const router = express_1.default.Router();
//route to get all videos considering R rating and pagination
router.get('/videos', middleware_1.authenticateJwt, middleware_1.getUserDetail, controllers_1.getVideos);
//route to get all the details of a single movie/show
router.get('/video/:id', middleware_1.authenticateJwt, middleware_1.getUserDetail, controllers_1.getVideo);
exports.default = router;
