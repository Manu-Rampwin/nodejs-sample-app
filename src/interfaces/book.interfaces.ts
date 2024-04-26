import { Types } from "mongoose";

export interface IAddBookPayload {
    title : string;
    author: string;
    publication_year: number;
}
export interface IAddBook{
    book: IAddBookPayload;              
}

export interface IBook{
    _id?: Types.ObjectId;
    title? : string;
    author?: string;
    publication_year?: number;
}