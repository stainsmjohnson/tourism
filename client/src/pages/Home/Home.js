import React from 'react'
import { Query } from 'react-apollo';
import { GET_ALL_RECIPES } from '../../queries';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <Query query={GET_ALL_RECIPES}>
                {
                ({ data, loading, error}) => {
                    if(loading) return <h1>Loading</h1>
                    if(error) return <h1>Error</h1>
                    return (
                    <ul>
                        {
                            data.getAllRecipes.map(recipe => (
                                <Link key={recipe._id} to={`/recipe/${recipe._id}`}>
                                    <p>{recipe.name}</p>
                                </Link>
                            ))
                        }
                    </ul>
                    )
                }
                }
            </Query>
        </div>
    )
}
export default Home;