import {gql} from 'apollo-boost';

const getBookQuery = gql`
{
  books {
    id
    name
    genre
  }
}
`

const getAuthorQuery = gql`
{
  authors {
    id
    name
  }
}
`

const getSingleBookQuery = gql`
  query($id: ID!) {
    book(id: $id) {
      name
      genre
      id
      author {
        id
        name
        books {
          id
          name
        }
      }
    }
  }
`

const addBookMutation = gql`
mutation($name:String!, $genre:String!, $authorId:ID!) {
  addBook(name:$name, genre:$genre, authorId:$authorId){
    id
    name
  }
}
`

export {getBookQuery, getAuthorQuery, addBookMutation, getSingleBookQuery}; 