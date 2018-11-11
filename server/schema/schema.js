const graphql  = require('graphql');
const _  = require('lodash');
const {
  GraphQLObjectType, 
  GraphQLString, 
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList 
} = graphql;

//dummy data

var books = [
  {name: 'Green miles', genre:'Drama', id:'1', authorId: '1'},
  {name: 'Forrest Gump', genre:'Drama', id:'2', authorId: '3'},
  {name: 'Beatiful Mind', genre:'Drama', id:'3', authorId: '2'},
  {name: 'Saving Private Ryan', genre:'Action', id:'4', authorId: '1'},
  {name: '300', genre:'Action', id:'4', authorId: '2'},
  {name: 'Kill Bill', genre:'Action', id:'5', authorId: '3'}
];

var authors = [
  {name: 'Alex Wong', age:40, id:'1'},
  {name: 'Maria Elena', age:64, id:'2'},
  {name: 'Rachel Maring', age:37, id:'3'}
];

const BookType = new GraphQLObjectType({
  name:'Book',
  fields: () => ({
    id:{type:GraphQLID}, 
    name:{type:GraphQLString},
    genre:{type:GraphQLString},
    author: {
          type:AuthorType,
          resolve(parent, args) {
            return authors.find(author => author.id === parent.authorId ); 
          }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name:'Author',
  fields: () => ({
    id:{type:GraphQLID}, 
    name:{type:GraphQLString},
    age:{type:GraphQLInt},
    books: {
      type:new GraphQLList(BookType),
      resolve(parent, args) {
        return books.filter(book => book.authorId === parent.id ); 
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name:'RootQueryType',
  fields: {

    book: {
      type: BookType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args) {
         return books.find(book => book.id === args.id ); 
      }
    },
    
    author: {
      type: AuthorType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args) {
         return authors.find(author => author.id === args.id ); 
      }
    },

    books: {
      type:new GraphQLList(BookType),
      resolve(parent, args) {
         return books; 
      }
    },

    authors: {
      type:new GraphQLList(AuthorType),
      resolve(parent, args) {
         return authors; 
      }
    }

  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});