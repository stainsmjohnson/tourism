import React from 'react';
import { withRouter } from 'react-router-dom';
import { Query } from 'react-apollo';
import { GET_RECIPE } from '../../queries'

const Recipe = ({ match }) => {
    const { _id } = match.params;

    return (
        <div>
            Recipe page.....
            <Query query={GET_RECIPE} variables={{ _id }}>
                {
                    ({ data, loading, error }) => {

                        if(error) return <p>{error.message}</p>
                        if(loading) return <p>Loading</p>
                        const recipe = data.getRecipe
                        console.log(recipe)
                        return(
                            <>
                        <p>{recipe.name}</p>
                        <p>{recipe.category}</p>
                        <p>{recipe.instructions}</p>
                        <p>{recipe.description}</p>
                        <p>{recipe.likes}</p>
                        <p>{recipe.createDate}</p>
                        <p>{recipe.username}</p>
                        </>
                        )
                    }
                }
            </Query>
        </div>
    )
}
export default withRouter(Recipe);