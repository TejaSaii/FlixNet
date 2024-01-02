import { Schema } from "mongoose";

export interface UserInterface {
    _id?: Schema.Types.ObjectId;
    email: string;
    password: string;
    age: number;
}
export interface VideoInterface{
    show_id: String;
    type: String;
    title: String;
    director: String;
    cast: String;
    country: String;
    date_added: String;
    release_year: Number;
    rating: String;
    duration: String;
    listed_in: String;
    description: String;
}

export interface Error {
    message: string;
}
