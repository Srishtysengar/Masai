import React, {useState, useEffect} from "react";
import { useDispatch, useSelector} from "react-redux";
import { fetchCoffee} from "./coffeeActions";

export default function App(){
  const dispatch=useDispatch();
  const {loading, data, error}=useSelector((state)=>state.coffee);
  const [sortBy,setSortBy] =useState("");

  useEffect(()=>{
    dispatch(fetchCoffee(sortBy));
  },[dispatch, sortBy]);


  return(
    <div style={{display:"flex"}}>
      {/* sidebar */}
      <div  style={{
        width:"200px",
        padding:"1rem"
      }}>
        <h3>Sort By</h3>
        <select value={sortBy} onChange={(e)=>setSortBy(e.target.value)}>
          <option value="">Default</option>
          <option value="title">Name</option>
          <option value="price">Price</option>
        </select>
      </div>

      {/* Coffee List */}
      <div  style={{
        flex:1,
        padding:"1rem"
      }}>

        <h2>Coffee List</h2>
        {loading && <p>loading...</p>}
        {error && <p style={{color:"red"}}>{error}</p>}
         <div  style={{
          display:"grid",
          gridTemplateColumns:"repeat(autofill, minmax(200px,1fr))",
          grap:"1rem"
      }}>
        {data.map((coffee)=>(
          <div  key={coffee.id} style={{
            border:"1px solid black",
             borderRadius:"5px",
            padding:"1rem",
            textAlign:"center"
      }}>
        <img src={coffee.image} alt={coffee.title} style={{width:"100%"}}/>
        <h4>{coffee.title}</h4>
        <p>Price:Rs.{coffee.price}</p>
          </div>
        ))}
      </div>
      </div>
    </div>
  )

}