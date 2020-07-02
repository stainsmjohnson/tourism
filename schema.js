exports.typeDefs = `

type Recipe {
    _id: ID
    name: String!
    category: String!
    description: String!
    instructions: String!
    createDate: String
    likes: Int
    username: String
    image: String
}


type User {
    _id: ID
    username: String! @unique
    password: String!
    email: String!
    joinDate: String
    favorites: [Recipe]
}

type Token {
    token: String!
}


type Query {
    getAllRecipes: [Recipe]
    getCurrentUser: User
    getRecipe(_id: ID!): Recipe
}


type Mutation {
    addRecipe(name: String!, description: String!, category: String!, instructions: String!, username: String): Recipe
    signIn(username:String!, password: String!): Token
    signUp(username: String!, email: String!, password: String!): Token
}


`;