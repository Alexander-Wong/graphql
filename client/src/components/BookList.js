import React, { Component } from 'react';
import {gql} from 'apollo-boost';
import {graphql} from 'react-apollo';


const getBookQuery = gql`
{
  books {
    id
    name
    genre
  }
}
`
class BookList extends Component {
  books(){
   let data = this.props.data;
   if (data.loading){
     return <div>Loding books</div>
   } else {
     return data.books.map(book => {
       return <li key={book.id}>{book.name}</li>
     })
   } 
  }
  render() {
    return (
      <div>
        <ul id="book-list">  
          {this.books()}
        </ul>
      </div>
    );
  }
}

export default graphql(getBookQuery)(BookList);
