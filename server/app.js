const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema =  require('./schema/schema');
const mongoose =  require('mongoose');
const app = express();


mongoose.connect('mongodb://awong:lxndrWNG7@ds139446.mlab.com:39446/awong-graphql', { useNewUrlParser: true });
mongoose.connection.once('open', ()=>{
  console.log('conected to DB');
});
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

app.listen(4000, ()=> {
  console.log('Server is listening port on 4000');
});

