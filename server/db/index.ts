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

export const User = mongoose.model('User', userSchema);
export const Video = mongoose.model('Video', videoSchema);
