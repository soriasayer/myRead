import React from 'react'
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookSearch from './BookSearch';
import BookShelfs from './BookShelfs';
import { debounce } from 'debounce';

// APP: This is a parent component that contain the initial data and passing it to it's child via props.
class BooksApp extends React.Component {

  constructor(props) {
    super(props);
    //DEBOUNCE: This function is controling the rate of executing searchQuery as it is not needed for every key stroke.
    this.searchQuery = debounce(this.searchQuery, 300);
    this.state = {
      /**
       * TODO: Instead of using this state variable to keep track of which page
       * we're on, use the URL in the browser's address bar. This will ensure that
       * users can use the browser's back and forward buttons to navigate between
       * pages, as well as provide a good URL they can bookmark and share.
       */
      books: [],
      // STATE: This object is for initializing the search text which is mutable.
      searchResult: []
    }
  
  }
// API: this method is for calling get API nad updates our books state with passing it into setState.
  shelfBooks = () => {
    BooksAPI.getAll()
    .then(books => {
      this.setState({books})
    });
  }

  // Mount: for mounting the get request and updating the shelves.
  componentDidMount() {
    this.shelfBooks();
  }
  
  // PUT: This method is for updating the data back to the server as a JSON.
   updateShelf = (book, shelf) => {
     BooksAPI.update(book, shelf);
     this.shelfBooks();
  }

  // UPDATE: This method updates the server with the book id and user input.
  selectHandler = (e, bookId) => {
    const {books} = this.state;
    books.map(book => {
      if(book.id === bookId) {
        book.shelf = e.target.value;
      }
      return book;
    })
    this.setState({books});
    const book = {
      id: bookId
    }
    this.updateShelf(book, e.target.value)
  }

  // POST: This method send data to the sever from user input and updates our searchResult state with setState. Aditionally, the condition inside this method is for clearing Search results when all of the text is deleted out of the search input box.
  searchQuery = (query) => {
    if(query.trim() !== "") {
      BooksAPI.search(query)
      .then(result => {
        Array.isArray(result)
        ? this.setState({searchResult: result})
        : this.setState({searchResult: []})
      })
    } else {
      this.setState({searchResult: []})
    }
      
  }

  // RENDER: This method renders the child components by possing thier data throgh props.
  render() {

    return (
      <div>
      {/* ROUTE: This component is for creating and linking pages with each other. Passing props to cummunicate between parent and chideren. */}
        <Route exact path="/" render={() => (
          <BookShelfs
            books={this.state.books}
            selectHandler={this.selectHandler}
           />
        )} />

        <Route exact path="/search" render={() => (
          <BookSearch 
            searchResult={this.state.searchResult}
            searchQuery={this.searchQuery}
            selectHandler={this.selectHandler}
            books={this.state.books}
          />
        )} />
      </div>
    )
  }
}

export default BooksApp

//{this.state.screen === 'shelfs' && ()}
//{this.state.screen === 'search' && (<BooksList />)}