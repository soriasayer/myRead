import React from 'react';

//FUNCTIONAL COMPONENT: This is a functional component. Since it is a stateless component so, we don't need a class component here.
const BookList = ({ book, selectHandler, booksId }) => {

    //THUMBNAILS: this functiorn is for missing thumbnail, if a book does not have thumbnail by giving this condition we can prevent form errore.
    const imgaCondintion = (book) => {
        if(book && book.imageLinks && book.imageLinks.thumbnail) {
            return (<div className="book-cover" style={{ width: 128, height: 193, backgroundImage:`url(${book.imageLinks.thumbnail})`}}></div>)
        } else {
            return (<div className="book-cover" style={{ width: 128, height: 193, backgroundColor: 'gray'}}></div>)
        }
     }

     //SHELF: This condition shows us the shelf which the searched book currently is.
    const currentShelf = booksId.length > 0 ? booksId[0].shelf : "none";

    return(
        <li key={book.id}>
            <div className="book">
            <div className="book-top">
                {imgaCondintion(book)}
                <div className="book-shelf-changer">
                <select value={currentShelf} onChange={(e)=> selectHandler(e, book.id)}>
                    <option value="move" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead" >Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                </select>
                </div>
            </div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">{book.authors}</div>
            </div>
        </li>
    );
}

export default BookList;