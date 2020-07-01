import { gql } from 'apollo-boost';


/*Recipe Query */
export const GET_ALL_RECIPES = gql`

query{
    getAllRecipes {
        _id
        name
        description
        category
        likes
        instructions
        createDate
        
    }
}
`;

export const GET_RECIPE = gql`

query($_id: ID!) {
  getRecipe(_id:$_id){
    _id
    name
    category
    description
    instructions
    createDate
    likes
    username
  }
}
`;


/*Recipe Mutation */

/*User Query */
export const GET_CURRENT_USER = gql`

query {
  getCurrentUser {
    username
    email
  }
}
`;


/*User Mutation */

export const SIGNIN_USER = gql`

mutation($username: String!,$password:String!) {
  signIn(username:$username, password: $password){
    token
  }
}

`;

export const SIGNUP_USER = gql`

mutation($username: String!, $email: String!, $password: String!) {
    signUp(username:$username,email:$email, password:$password){
      token
    }
  }

`;