import React, { Component } from 'react';
import {getAuthorQuery, addBookMutation, getBookQuery} from '../queries/queries';
import {graphql, compose} from 'react-apollo';



class AddBook extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      genre: '',
      authorId: ''
    }
  }
  getAuthors(){
    let data = this.props.getAuthorQuery;
    if (data.loading){
      return (<option disabled>Loding authors</option>)
    } else {
      return data.authors.map(author => {
        return (<option key={author.id} value={author.id}>{author.name}</option>)
      })
    } 
   }

   submitForm(event){
    event.preventDefault();
    this.props.addBookMutation({
      variables: {
        name: this.state.name,
        genre: this.state.genre,
        authorId: this.state.authorId
      },
      refetchQueries:[{query: getBookQuery}]
    });
   }
  render() {
    return (
      <form id="add-book" onSubmit= {this.submitForm.bind(this)}>
        <div className="field"> 
          <label>Book name:</label>
          <input type="text" onChange = {(e) => {this.setState({name: e.target.value})}}/>
        </div>

        <div className="field"> 
          <label>Genre:</label>
          <input type="text" onChange = {(e) => {this.setState({genre: e.target.value})}}/>
        </div>

        <div className="field"> 
          <label>Author:</label>
          <select onChange = {(e) => {this.setState({authorId: e.target.value})}}>
            <option>Select author</option>
            {this.getAuthors()}
          </select>
        </div>
        <button>Add book</button>
      </form>
    );
  }
}

export default compose(
  graphql(getAuthorQuery, {name:"getAuthorQuery"}),
  graphql(addBookMutation, {name:"addBookMutation"})
)(AddBook);
