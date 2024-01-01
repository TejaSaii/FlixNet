import { User } from "../db";
import { UserInterface } from "../types";

const getUserByEmail = async (email: string) => {
  try {
    const user = await User.findOne({ email });
    return user;
  }
  catch (error) {
    throw new Error('Unable to fetch user by email '+error);
  }
}

const getUserByUserId = async (_id: UserInterface["_id"]) => {
  try {
    const user = await User.findById({ _id });
    return user;
  }
  catch (error) {
    throw new Error('Unable to fetch user by Id');
  }
}

const getUserByEmailPassword = async (email: string, password: string) => {
  try {
    const user = await User.findOne({ email, password });
    return user;
  }
  catch (error) {
    throw new Error('Unable to fetch user by email and password');
  }
}

const saveUser = async (user: UserInterface) => {
  try {
    if (user) {
      const newUser = new User(user);
      await newUser.save();
      return newUser;

    }
  }
  catch (error) {
    throw new Error('Unable to save user');
  }
}

export default { getUserByEmail, getUserByUserId, saveUser, getUserByEmailPassword };