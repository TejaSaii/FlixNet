import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  age: Number,
});

const videoSchema = new mongoose.Schema({
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

export const User = mongoose.model('User', userSchema);
export const Video = mongoose.model('Video', videoSchema);