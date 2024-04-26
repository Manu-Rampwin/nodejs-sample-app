import { NextFunction, Request, Response } from "express";
import { bookSchemaValidator } from "../validators/book.validators";
import HttpException from "../util/http-exception.util";
import constants from "../config/constants";
import { IBook } from "../interfaces/book.interfaces";
import { BookService } from "../services/book.services";
import { Types } from "mongoose";

const bookObj=new BookService();

export const addBook = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      console.log(req.user);
      const { error } =bookSchemaValidator(req.body);
      if (error) {
        throw new HttpException(
          constants.statusCode.BAD_REQUEST,
          error.details[0].message,
          "addBook"
        );
      }

      const {title, author, publication_year}=req.body.book;

      const bookFound=await bookObj.findOneBook({title, author});
      if(bookFound){
        throw new HttpException(
          constants.statusCode.BAD_REQUEST,
          "Book Already Exists",
          "addBook"
        );
      }

      const book:IBook={
        title, author, publication_year
      };

      const bookAdded=await bookObj.createBook(book);
      res.status(constants.statusCode.CREATED).json({
        success: true,
        data: {
          book: bookAdded
        },
      });
    } catch (error) {
      next(error);
    }
};  

export const getBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const page = Number(req.query?.page);
    const limit = Number(req.query?.limit);
    const searchQuery = req.query?.searchQuery
      ? String(req.query?.searchQuery)
      : "";

    const query = {
      $or: [
        { title: { $regex: searchQuery, $options: "i" } },
        { author: { $regex: searchQuery, $options: "i" } },
        {publication_year: isNaN(Number(searchQuery)) ? "" : Number(searchQuery)}
      ],
    };

    const books=await bookObj.findBooks(page*limit, limit, query);
    const booksCount=await bookObj.getBooksCount(query);
    
    res.status(constants.statusCode.CREATED).json({
      success: true,
      data:{
        records: books,
        totalRecordsCount: booksCount
      },
    });
  } catch (error) {
    next(error);
  }
};

export const updateBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.params.bookId) {
      throw new HttpException(
        constants.statusCode.BAD_REQUEST,
        "bookId is required",
        "updateBook"
      );
    }
    const { error } =bookSchemaValidator(req.body);
    if (error) {
      throw new HttpException(
        constants.statusCode.BAD_REQUEST,
        error.details[0].message,
        "updateBook"
      );
    }

    const bookId=req.params.bookId;
    const bookFound=await bookObj.findOneBook({_id: new Types.ObjectId(bookId)});
    if(!bookFound){
      throw new HttpException(
        constants.statusCode.BAD_REQUEST,
        "Book Not Exists",
        "updateBook"
      );
    }
    const updatedDetails=req.body.book;
    const bookUpdated=await bookObj.updateBook(bookId, updatedDetails);
        
    res.status(constants.statusCode.SUCCESS).json({
      success: true,
      data:{
        book: bookUpdated
      },
    });
  } catch (error) {
    next(error);
  }
};


export const deleteBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.params.bookId) {
      throw new HttpException(
        constants.statusCode.BAD_REQUEST,
        "bookId is required",
        "updateBook"
      );
    }

    const bookId=req.params.bookId;
    const bookFound=await bookObj.findOneBook({_id: new Types.ObjectId(bookId)});
    if(!bookFound){
      throw new HttpException(
        constants.statusCode.BAD_REQUEST,
        "Book Not Exists",
        "updateBook"
      );
    }

    const bookDeleted=await bookObj.deleteBook(bookId);    
    res.status(constants.statusCode.SUCCESS).json({
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

