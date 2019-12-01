import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BookList from './BookList';

class BookSearch extends Component {
    //INPUT: This is an initial state for query input.
    state = {
        query: ''
    }

    //ONCHANGE: This method updates the state and invoke the post API function when input is on change.
    onInputChange = (e) => {
        this.setState({query: e.target.value})
        this.props.searchQuery(e.target.value);
    }

    render() {
        const { query } = this.state;

        //PROPS: These are all the props that passed from parent component and I used them the change the parent states.
        const { searchResult, books, selectHandler} = this.props;

        //MAP: This map loops through the searched book's array and passes the data into a child component named BookList. 
        const renderBooks = searchResult.map(book => {
            //FILTER: This filter method loops through book ids that are exist in the search page and as well as in shelves and provide us an array of them.
            const booksId = books.filter(bs => bs.id === book.id);
                return (<BookList 
                            key={book.id}
                            book={book} 
                            selectHandler={selectHandler}
                            booksId={booksId}
                        />);
        })
        return(
            <div className="app">
                <div className="search-books">
                    <div className="search-books-bar">
                        <Link to="/" className="close-search" >Close</Link>
                        <div className="search-books-input-wrapper">
                            {/*
                            NOTES: The search from BooksAPI is limited to a particular set of search terms.
                            You can find these search terms here:
                            https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                            However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                            you don't find a specific author or title. Every search is limited by search terms.
                            */}
                            <input type="text" placeholder="Search by title or author"
                            value={query}
                            onChange={this.onInputChange}
                            />
                        </div>
                    </div>
                    <div className="search-books-results">
                        <ol className="books-grid">
                             {renderBooks}
                        </ol>
                    </div>
                </div>
            </div>
        );
    }
}

export default BookSearch;

