import { FilterQuery } from 'mongoose';
import { Video } from '../db';
import { VideoInterface } from '../interfaces'

const getVideoCount = async (query: FilterQuery<VideoInterface>) => {
  try {
    let count = await Video.countDocuments(query);
    return count;
  }
  catch (error) {
    throw new Error('Unable to fetch video count');
  }
}

const getVideos = async (query: FilterQuery<VideoInterface>, skip: number, pageSize: number) => {
  try {
    const videos = await Video.find(query).skip(skip).limit(pageSize);
    return videos;
  }
  catch (error) {
    throw new Error('Unable to fetch videos');
  }
}

const getVideoDetails = async (query: FilterQuery<VideoInterface>) => {
  try {
    const details = await Video.find(query);
    return details;
  }
  catch (error) {
    throw new Error('Video details not found');
  }
}


export default { getVideoCount, getVideos, getVideoDetails };
