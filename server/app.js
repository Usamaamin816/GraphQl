const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('../schema/schema');
const app = express();
const mongoose = require('mongoose')
const cors = require('cors');
app.use(cors());

mongoose.connect('mongodb+srv://usamaaminskylinxtech:3O9CsNnzJxl6pf35@cluster0.uptj3lf.mongodb.net/natours', {

}).then(() => {
    console.log("Connected to MongoDB")
}).catch((err) => {
    console.log("error", err);
})


app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log("Server is running on port 4000");
})