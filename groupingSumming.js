let categories=["electronics", "clothing", "electronics", "toys", "clothing", "toys", "toys"];
let categoryCount = categories.reduce((acc,category)=>{
    acc[category]=(acc[category]||0)+1;
    return acc;
},{});
console.log("category Count:", categoryCount);

let sortedCategories = Object.entries(categoryCount)
  .sort((a,b)=>b[1]-a[1])
  .map(([category])=>category);

console.log("Sorted Categories:", sortedCategories);

