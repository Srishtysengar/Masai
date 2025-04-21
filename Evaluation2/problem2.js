fetch ("https://fakestoreapi.com/products")
.then(response=>{
    if(!response.ok){
        throw new Error("Network Response was not ok");
    }
    return response.json();
})
.then(products =>{
    if(!Array.isArray(products)){
        throw new Error("Fetched data is not an array");
    }
    
    let categoryMap ={};

    for(let product of products){
        let {category,title}=product;
        if(!categoryMap[category]){
            categoryMap[category]=[];
        }
        categoryMap[category].push(title);
    }

    let summaries=Object.keys(categoryMap).map(cat=>{
        return `Category: ${cat} ${categoryMap[cat].length} items`
    });

    console.log("Summaries Array:", summaries);

    let i=0;
    let intervalId=setInterval(()=>{
        if(i>=summaries.length){
            clearInterval(intervalId);
        }else{
            console.log(summaries[i]);
            i++
        }
    },500);
})
.catch(error => {
    console.error("Failed to fetch data", error);
});