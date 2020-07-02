import React from 'react'
import { Query } from 'react-apollo';
import { GET_ALL_RECIPES } from '../../queries';
import { Link } from 'react-router-dom';
import RecipeComponent from '../../components/Recipe';
import './home.css';

const Home = () => {
    return (
        <div>
            <Query query={GET_ALL_RECIPES}>
                {
                ({ data, loading, error}) => {
                    if(loading) return <h1>Loading</h1>
                    if(error) return <h1>Error</h1>
                    return (
                    <ul className="recipes-container">
                        {
                            data.getAllRecipes.map(recipe => (
                                <Link key={recipe._id} to={`/recipe/${recipe._id}`}>
                                    <RecipeComponent {...recipe}/>
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