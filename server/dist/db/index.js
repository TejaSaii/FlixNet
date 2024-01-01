"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Video = exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    email: String,
    password: String,
    age: Number,
});
const videoSchema = new mongoose_1.default.Schema({
    show_id: String,
    type: String,
    title: String,
    director: String,
    cast: String,
    country: String,
    date_added: String,
    release_year: Number,
    rating: String,
    duration: String,
    listed_in: String,
    description: String,
});
// {
//   "_id": {
//     "$oid": "658f048655e4519c3761f50f"
//   },
//   "show_id": "s1",
//   "type": "Movie",
//   "title": "Dick Johnson Is Dead",
//   "director": "Kirsten Johnson",
//   "cast": "",
//   "country": "United States",
//   "date_added": "September 25, 2021",
//   "release_year": 2020,
//   "rating": "PG-13",
//   "duration": "90 min",
//   "listed_in": "Documentaries",
//   "description": "As her father nears the end of his life, filmmaker Kirsten Johnson stages his death in inventive and comical ways to help them both face the inevitable."
// }
exports.User = mongoose_1.default.model('User', userSchema);
exports.Video = mongoose_1.default.model('Video', videoSchema);
