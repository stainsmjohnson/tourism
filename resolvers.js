const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const createToken = (user, secret) => {//,expiresIn
    const { username, email } = user;
    return jwt.sign({ username, email }, secret)//, { expiresIn }
}

const Recipe = require("./models/Recipe");

exports.resolvers = {
    Query: {
        getAllRecipes: async (root, args, { Recipe }) => {
            const allRecipes = await Recipe.find()
            return await allRecipes
        },
        getRecipe: async (root, { _id },{ Recipe }) => {
            const recipe = await Recipe.findOne({ _id });
            return recipe;
        },
        getCurrentUser: async (root, args, { currentUser, User }) => {
            if(!currentUser){
                return null;
            }
            const { username } = currentUser;
            const user = await User.findOne({ username })
                .populate({
                    path: 'favorites',
                    model: 'Recipe'
                });
            return user;
        }
    }
    ,

    Mutation: {
        addRecipe: async (root, { name, description, category, instructions, username }, { Recipe }) => {
            const newRecipe = await new Recipe({
                name,
                description,
                category,
                instructions,
                username
            }).save();

            return newRecipe;
        },
        signIn: async (root, { username, password }, { User }) => {
            const user = await User.findOne({ username });
            if(!user){
                throw new Error('No user Found!');
            }
            const passwordValid = await bcrypt.compare(password, user.password);
            if(!passwordValid){
                throw new Error('Wrong Password!');
            }
            return { token: createToken(user, process.env.SECRET) }
        },
        signUp: async (root, { username, email, password }, { User }) => {
            const user = await User.findOne({ username });
            if(user){
                throw new Error('User Already Exists!')
            }
            const newUser = await new User({
                username,
                email,
                password
            }).save();

            return { token: createToken(newUser, process.env.SECRET) }//,'1hr'
        }
    }


};