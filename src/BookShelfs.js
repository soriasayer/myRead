import React from 'react';
import { Link } from 'react-router-dom';

//FUNCTIONAL COMPONENT: This is a functional component. Since it is a stateless component so, we don't need a class component here.
const BookShelfs = ({books, selectHandler}) => {
    
    //THUMBNAILS: this functiorn is for missing thumbnail, if a book does not have thumbnail by giving this condition we can prevent form errore.
   const imgaCondintion = (book) => {
        if(book && book.imageLinks && book.imageLinks.thumbnail) {
            return (<div className="book-cover" style={{ width: 128, height: 193, backgroundImage:`url(${book.imageLinks.thumbnail})`}}></div>)
        } else {
            return (<div className="book-cover" style={{ width: 128, height: 193, backgroundColor: 'gray'}}></div>)
        }
     }

     //SHELVES: By passing this function we can prevent from same hard coding for different sheleves. 
    const renderShelf = (books, shelfName, shelfTitle) =>  {

        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{shelfTitle}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {books.map(book => {
                            if(book.shelf === shelfName) {
                                return (
                                    <li key={book.id} >
                                        <div className="book">
                                        <div className="book-top">
                                           {imgaCondintion(book)}
                                            <div className="book-shelf-changer">
                                            <select onChange={(e)=> selectHandler(e, book.id)} value={book.shelf} >
                                                <option value="move" disabled>Move to...</option>
                                                <option value="currentlyReading">Currently Reading</option>
                                                <option value="wantToRead">Want to Read</option>
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
                        })}
                    </ol>
                </div>
            </div>
        );
    }

    return(
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <div>
                    {renderShelf(books, "currentlyReading", "Currently Reading")}
                    {renderShelf(books, "wantToRead", "Want To Read")}
                    {renderShelf(books, "read", "Read")}
                </div>
            </div>
            <div className="open-search">
                <Link to="/search" >
                    <button>Add a book</button>
                </Link>
            </div>
        </div>
    );
}

export default BookShelfs;