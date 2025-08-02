import {useState, useEffect} from 'react';
import axios from 'axios';

const useFetch=(url)=>{
    const[data,setData]=useState([]);

    useEffect(()=>{
        axios
        .get(url)
        .then((res)=>{
            console.log("fd",res.data);
            setData(res.data.recipes||[])
    })
    .catch((error)=>{
        console.log("error");
        setData([]);
    })
    },[url]);

    return data;
}
export default useFetch;