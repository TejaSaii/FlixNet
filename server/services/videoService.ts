import { Video } from '../db';

const getVideoCount = async (query: any) => {
  try {
    let count = await Video.countDocuments(query);
    return count;
  }
  catch (error) {
    throw new Error('Unable to fetch video count');
  }
}

const getVideos = async (query: any, skip: number, pageSize: number) => {
  try {
    const videos = await Video.find(query).skip(skip).limit(pageSize);
    return videos;
  }
  catch (error) {
    throw new Error('Unable to fetch videos');
  }
}

const getVideoDetails = async (query: any) => {
  try {
    const details = await Video.find(query);
    console.log(details, query);
    return details;
  }
  catch (error) {
    throw new Error('Video details not found');
  }
}


export default { getVideoCount, getVideos, getVideoDetails };