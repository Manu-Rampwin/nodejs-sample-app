import { IBook } from "../interfaces/book.interfaces";
import Book from "../models/book.model";

export class BookService{
    async findOneBook(book: IBook) {
        const bookFound = await Book.findOne(book);
        return bookFound;
    }

    async findBooks(skip:number, limit: number,filter:object){
        const books = await Book.find(filter).skip(skip).limit(limit);
        return books;
    }

    async getBooksCount(filter: object) {
        const count = await Book.countDocuments(filter);
        return count;
    }

    async createBook(book: IBook) {
        const bookCreated = await Book.create(book);
        return bookCreated;
    }

    async updateBook(bookId:string, updatedDetails: IBook) {
        const bookUpdated = await Book.findOneAndUpdate({_id: bookId}, updatedDetails, {new:true});
        return bookUpdated;
    }

    async deleteBook(bookId:string) {
        const bookDeleted = await Book.findOneAndDelete({_id: bookId});
        return bookDeleted;
    }
}