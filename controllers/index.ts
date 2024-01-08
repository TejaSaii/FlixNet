import userService from '../services/userService';
import { Request, Response } from 'express';
import { SECRET } from "../middleware";
import jwt from 'jsonwebtoken';
import { userInputProps } from '../zod/userInputProps';
import videoService from '../services/videoService';

const signupUser = async (req: Request, res: Response) => {
  //validate if input is correct
  const parsedUserInput = userInputProps.safeParse(req.body);
  if (!parsedUserInput.success) {
    res.status(411).json({
      mes: parsedUserInput.error
    })
    return;
  }
  //get data, check in db if not present, then save
  try {
    const userData = parsedUserInput.data;
    const user = await userService.getUserByEmail(userData.email);
    if (user) {
      res.status(403).json({ message: 'User already exists' });
    }
    else {
      const newUser = await userService.saveUser(userData);
      if (newUser === undefined) {
        res.status(500).json({ message: 'Unable to create new user' });
      }
      else {
        const token = jwt.sign({ id: newUser._id }, SECRET, { expiresIn: '1h' });
        res.json({
          message: 'User created successfully',
          token: token,
        });
      }
    }
  }
  catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

const loginUser = async (req: Request, res: Response) => {
  //if user is present then success else invalid
  const { email, password } = req.body;
  try {
    const user = await userService.getUserByEmailPassword(email, password);
    if (user === null) {
      res.status(403).json({ message: 'Invalid username or password' });
    }
    else {
      const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: '1h' })
      res.json({ message: 'Logged in successfully', token });
    }
  }
  catch (error: any) {
    res.status(403).json({ message: error.message });
  }
};

const getVideos = async (req: Request, res: Response) => {
  const age = parseInt(req.headers.age as string);
  const pageNumber = parseInt(req.query.page as string) || 1;
  const { keyword, type } = req.query;
  try {
    const query = generateQuery(age, keyword as string, type as string);
    console.log(JSON.stringify(query))
    paginate(pageNumber, query, res);
  }
  catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const getVideo = async (req: Request, res: Response) => {
  const showId: string = req.params.id;
  const age: number = parseInt(req.headers.age as string);
  try {
    let query = generateQuery(age);
    query = {
      $and: [
        { ...query },
        { show_id: showId },
      ]
    };
    const details = await videoService.getVideoDetails(query);
    res.json({ result: details[0] });
  }
  catch (error: any) {
    res.status(404).json({ message: error.message });
  }
}

//helper function to paginate the data from query and return response
const paginate = async (pageNumber: number, query: Object, res: Response) => {
  const pageSize = 15;
  const totalVideos = await videoService.getVideoCount(query);
  if (!totalVideos) {
    res.status(500).json({ message: 'Error fetching video count' });
    return;
  }
  const totalPages = Math.ceil(totalVideos as number / pageSize);
  if (pageNumber > totalPages) pageNumber = totalPages;
  const skip = (pageNumber - 1) * pageSize;
  const videos = await videoService.getVideos(query, skip, pageSize);
  if (videos === undefined) {
    res.status(404).json({ message: 'Error fetching data' });
    return;
  }
  else {
    res.json({
      result: videos,
      meta_data: {
        page: pageNumber,
        size: pageSize,
        total_records: totalVideos,
        total_pages: totalPages,
      }
    });
  }
};

//helper function to generate the query based on conditions
const generateQuery = (age: number, keyword: string = "", type: string = "") => {
  const conditions: Array<Object> = [];
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
    if (type === 'movie') conditions.push({ type: 'Movie' });
    else if (type === 'tvshow') conditions.push({ type: 'TV Show' });
  }
  if (conditions.length === 1) return conditions[0];
  return (conditions.length !== 0) ? { $and: conditions } : {};
}

export { signupUser, loginUser, getVideos, getVideo };
