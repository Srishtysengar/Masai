import {useParams} from 'react-router-dom';
import {useState,useEffect} from 'react';
import axios from'axios';

const RecipeDetail=({recipe})=>{
    const {id} =useParams();
    const [recipe,setRecipe] = useState(null);

     usseEffect(()=>{
        axios.get("https://dummyjson.com/recipes/${id")
        .then(res=>setRecipe(res.data));
    },[id]);

    if(!recipe) return <p>Loading....</p>

     return(
        <div className="detail">
            <h2>{recipe.name}</h2>
            <img src={recipe.image}/>
            <p><strong>Cuisine:</strong>{recipe.cusine}</p>
            <p><strong>Instructions:</strong>{recipe.instructions}</p>
            </div>
    );
};
