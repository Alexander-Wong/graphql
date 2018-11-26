const graphql  = require('graphql');
const Book = require('../models/book');
const Author = require('../models/author');

const _  = require('lodash');
const {
  GraphQLObjectType, 
  GraphQLString, 
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull 
} = graphql;

//dummy data

/*var books = [
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
];*/

const BookType = new GraphQLObjectType({
  name:'Book',
  fields: () => ({
    id:{type:GraphQLID}, 
    name:{type:GraphQLString},
    genre:{type:GraphQLString},
    author: {
          type:AuthorType,
          resolve(parent, args) {
            return Author.findById(parent.authorId); 
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
        return Book.find({authorId: parent.id }); 
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
         return Book.findById(args.id ); 
      }
    },
    
    author: {
      type: AuthorType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args) {
         return Author.findById(args.id); 
      }
    },

    books: {
      type:new GraphQLList(BookType),
      resolve(parent, args) {
         return Book.find({},'',{lean:true}); 
      }
    },

    authors: {
      type:new GraphQLList(AuthorType),
      resolve(parent, args) {
         return Author.find({}, '', {lean: true}); 
      }
    }

  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addAuthor: {
      type: AuthorType,
      args:{
        name: {type: new GraphQLNonNull(GraphQLString)},
        age: {type: new GraphQLNonNull(GraphQLInt)}
      },
      resolve(parent, args){
        let newAuthor = new Author({name: args.name, age: args.age});
        return newAuthor.save();
      }
    },
    addBook: {
      type: BookType,
      args:{
        name: {type: new GraphQLNonNull(GraphQLString)},
        genre: {type: new GraphQLNonNull(GraphQLString)},
        authorId: {type: new GraphQLNonNull(GraphQLID)}
      },
      resolve(parent, args){
        let newBook = new Book({name: args.name, genre: args.genre, authorId: args.authorId});
        return newBook.save();
      }
    },
  }
})
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});