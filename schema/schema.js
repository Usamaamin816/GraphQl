const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLSchema, GraphQLInt, GraphQLList } = graphql;
const _ = require('lodash');
const Author = require('../models/Author')
const Book = require('../models/Book')

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        authorId:{type:GraphQLString},
        author: {
            type: AuthorType,
            resolve(parent, args) {
                // console.log(parent)
                // return _.find(authors, { id: parent.authorid })
            return Author.findById(parent.authorId);
            }
        }
    })
})

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
        //         // return _.filter(books, { authorid: parent.id })
        return Book.find({authorId:parent.id})
            }


        }
    })
})
const RestaurantBranches = new GraphQLObjectType({
    name: "Branch",
    fields: () => ({
        branch_id: { type: GraphQLID },
        phone: { type: GraphQLString },
        location: { type: GraphQLString },
        restaurant: {
            type: RestaurantType,
            resolve(parent, args) {
                //    return _.find(restaurants,{id:parent.rest_id})
                
            }
        }
    })
})
const RestaurantType = new GraphQLObjectType({
    name: 'Restaurant',
    fields: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        type: { type: GraphQLString },
        branches: {
            type: new GraphQLList(RestaurantBranches),
            resolve(parent, args) {
                // return _.filter(branches,{
                //     rest_id:parent.id
                // })
            }
        }
    }
})


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                //     return _.find(books, { id: args.id })
                return Book.findById(args.id)
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                //     return _.find(authors, { id: args.id })
                return Author.findById(args.id)
            }
        },
        getAllBooks: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                //     return books;
                return Book.find({})
            }

        },
        getAllAuthor: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                //     return authors;
                return Author.find({})
            }
        }


    }

})
const rootQuerySec = new GraphQLObjectType({
    name: 'RootQueryTypeSec',
    fields: {
        restaurants: {
            type: RestaurantType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                //     return _.find(restaurants,{id:args.id})
            }
        },
        branches: {
            type: RestaurantBranches,
            args: { id: { type: GraphQLID } },

        }
    },


})
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: { type: GraphQLString },
                age: { type: GraphQLInt }
            },
            async resolve(parent, args) {

                let newAuthor = await Author.create({
                    name: args.name,
                    age: args.age

                })

                return newAuthor;
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: { type: GraphQLString },
                genre: { type: GraphQLString },
                authorId: { type: GraphQLString }
            },
            async resolve(parent, args) {
                let newBook = await Book.create({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId

                })
                return newBook;
            }
        }
    }
})

module.exports = new GraphQLSchema({

    query: RootQuery,
    mutation: Mutation
})