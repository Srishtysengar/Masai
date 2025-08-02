import {Routes, Route} from 'resct-router-dom';
import Home from './pages/Home';
import RecipeDetail from './pages/RecipeDetail';

function App(){
  return(
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/recipe/:id" element={<RecipeDetail/>}/>
    </Routes>
  )
}