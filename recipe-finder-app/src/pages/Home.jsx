import useFetch from '../hooks/useFetch';
import RecipeCard  from '../component/RecipeCard';

const Home = () =>{
    const recipes = useFetch("https://dummyjson.com/recipes");

    return(
        <div className="recipe-grid">
          {recipes.map(recipe=>(
            <RecipeCard key={recipe.id} recipe={recipe}/>
          ))}
        </div>
    );
};