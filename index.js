const express = require("express");

//Database
const database = require("./database");

//Initialise express
const booky = express();

/*
Route           /
Description     Get all the Books
Access          PUBLIC
Parameter       NONE
Methods         GET
*/
booky.get("/",(req,res) => {
    return res.json({books: database.books});
});

/*
Route           /is
Description     Get Specific book on ISBN
Access          PUBLIC
Parameter       ISBN
Methods         GET
*/
booky.get("/is/:isbn",(req,res) => {
    const getSpecificBook = database.books.filter(
        (book) => book.ISBN === req.params.isbn
    );

    if(getSpecificBook.length === 0) {
        return res.json({error: `No book found for the ISBN of ${req.params.isbn}`});
    }

    return res.json({book: getSpecificBook});
});

/*
Route           /c
Description     Get list of books based on category
Access          PUBLIC
Parameter       Category
Methods         GET
*/
booky.get("/c/:category",(req,res) => {
    const getCategoryBook = database.books.filter(
        (book) => book.category.includes(req.params.category)
    );

    if(getCategoryBook.length === 0) {
        return res.json({error: `No book found for the category of ${req.params.category}`});
    }

    return res.json({book: getCategoryBook});
});

/*
Route           /l
Description     Get list of books based on language
Access          PUBLIC
Parameter       Language
Methods         GET
*/
booky.get("/l/:language",(req,res) => {
    const getLanguageBook = database.books.filter(
        (book) => book.language === req.params.language
    );

    if(getLanguageBook.length === 0) {
        return res.json({error: `No book found for the language of ${req.params.language}`});
    }

    return res.json({book: getLanguageBook});
});

/*
Route           /author
Description     Get list of books of all author
Access          PUBLIC
Parameter       NONE
Methods         GET
*/
booky.get("/author",(req,res) => {
    return res.json({Author: database.author})
});

/*
Route           /s
Description     Get list of books based on Author
Access          PUBLIC
Parameter       Author
Methods         GET
*/
booky.get("/s/:authorName",(req,res) => {
    const getAuthorBook = database.author.filter(
        (author) => author.name === req.params.authorName
    );

    if(getAuthorBook.length === 0) {
        return res.json({error:`No book found for the Author of ${req.params.authorName}`});
    }

    return res.json({author: getAuthorBook});
});

/*
Route           /author/book
Description     Get list of author based on isbn
Access          PUBLIC
Parameter       isbn
Methods         GET
*/
booky.get("/author/book/:isbn",(req,res) => {
    const getSpecificAuthor = database.author.filter(
        (author) => author.books.includes(req.params.isbn)
    );

    if(getSpecificAuthor.length === 0) {
        return res.json({error:`No author found for book of ${req.params.isbn}`});
    }

    return res.json({author: getSpecificAuthor});
});

/*
Route           /publication
Description     Get list of books of all publications
Access          PUBLIC
Parameter       NONE
Methods         GET
*/
booky.get("/publication",(req,res) => {
    return res.json({Publication: database.publication})
});

/*
Route           /spe
Description     Get list of books of given publications
Access          PUBLIC
Parameter       Publication Name
Methods         GET
*/
booky.get("/spe/:publicationName",(req,res) => {
    const getPublicationBook = database.publication.filter(
        (publication) => publication.name === req.params.publicationName
    );

    if(getPublicationBook.length === 0) {
        return res.json({error: `No book found for publication of ${req.params.publicationName}`});
    }

    return res.json({publication: getPublicationBook});
});

/*
Route           /publication/book
Description     Get list of publication with given isbn
Access          PUBLIC
Parameter       Book isbn
Methods         GET
*/
booky.get("/publication/book/:isbn",(req,res)=>{
    const getSpecificPublication = database.publication.filter(
        (publication) => publication.books.includes(req.params.isbn)
    );

    if(getSpecificPublication.length === 0){
        return res.json({error: `No publication found for book of ${req.params.isbn}`});
    }

    return res.json({pub: getSpecificPublication});
});

booky.listen(3000,() => {
    console.log("Server is up and running");
});