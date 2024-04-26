import express from "express";
import passport from "passport";

import { addBook, deleteBook, getBooks, updateBook } from "../controllers/book.controllers";
require('../util/passport');

const router=express.Router();

router.post('/add-book', passport.authenticate("jwt", { session: false }), addBook );
router.get('/get-books', passport.authenticate("jwt", { session: false }), getBooks );
router.put('/update-book/:bookId', passport.authenticate("jwt", { session: false }), updateBook );
router.delete('/delete-book/:bookId', passport.authenticate("jwt", { session: false }), deleteBook );

export default router;