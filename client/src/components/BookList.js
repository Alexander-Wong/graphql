import React, { Component } from 'react';
import {graphql} from 'react-apollo';
import BookDetails from './BookDetails'
import {getBookQuery} from '../queries/queries';

class BookList extends Component {
  constructor (props){
    super(props);
    this.state = { 
      selectedBook : null
    }
  }
  selectBook(book){
    this.setState({selectedBook: book.id});
  }
  books(){
   let data = this.props.data;
   if (data.loading){
     return <div>Loding books</div>
   } else {
     return data.books.map(book => {
       return <li key={book.id} onClick={(e)=> this.selectBook(book)}>{book.name}</li>
     })
   } 
  }
  render() {
    return (
      <div>
        <ul id="book-list">  
          {this.books()}
        </ul>
        <BookDetails bookId= {this.state.selectedBook}/>
      </div>
    );
  }
}

export default graphql(getBookQuery)(BookList);
