import React, { Component } from 'react';
import {graphql} from 'react-apollo';
import {getSingleBookQuery} from '../queries/queries';

class BookDetails extends Component {
  displayBookDetails(){
    var {book} = this.props.data;
    if (!book)
    return (<div>Loding book details</div>);
    else
    return (
      <div>
        <p>name: {book.name}</p>
        <p>Genre: {book.genre}</p>
        <p>Author: {book.author.name}</p>
      </div>
    );
  }
  render() {
    return (
      <div>
        <p>Book Details</p>
        {this.displayBookDetails()}
      </div>
    );
  }
}

export default graphql(getSingleBookQuery, {
  options: (props) => {
    return {
      variables: {
        id: props.bookId
      }
    }
  }
})(BookDetails);
