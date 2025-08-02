import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

const RecipeCard=({recipe})=>{
    const [isFavorite,setIsFavorite] = useState(false);
    const navigate = useNavigate();

    return(
        <div className="card" onClick={()=> navigate(`/recipe/${recipe.id}`)}>
            <img src={recipe.image}/>
            <h3>{recipe.name}</h3>
            <p>{recipe.cusine}</p>
            <button
              onClick={(e)=>{
                e.stopPropogation();
                setIsFavorite(!isFavorite);
              }}
              >
                {isFavorite?"red":"white"}
              </button>
        </div>
    );
};

export default RecipeCard;