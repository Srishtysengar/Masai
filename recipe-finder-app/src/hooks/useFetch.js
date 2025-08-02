import {useState, useEffect} from 'react';
import axios from 'axios';

const useFetch=(url)=>{
    const[data,setData]=useState([]);

    usseEffect(()=>{
        axios.get(url).then(res=>setData(res.data.recipes));
    },[url]);

    return data;
}
export default useFetch;