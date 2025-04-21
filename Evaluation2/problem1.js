let stores=[
    { storeName: "Store A", location: "City 1", sales: [100, 200, 150, 180] },
    { storeName: "Store B", location: "City 2", sales: [200, 250, 300, 150] },
    { storeName: "Store C", location: "City 3", sales: [50, 70, 120, 80] }
  ]

function calculateTotalSales(stores){
    return stores.map(store =>{
        let total = store.sales.reduce((acc,val)=>acc+val,0);
        return{...store,totalSales:total};
    });
}

function highestSalesStore(storesWithTotals){
    return storesWithTotals.reduce((max,store)=>
    store.totalSales>max.totalSales? store:max
);
}

function lowSalesStore(storesWithTotals){
    return storesWithTotals
    .filter(store=>store.totalSales<1000)
    .map(store=>store.storeName);
}

let storesWithTotals=calculateTotalSales(stores);

console.log("Total Sales");
storesWithTotals.forEach(store => {
    console.log(`${store.storeName}: Rs${store.totalSales}`);
});

let topStore = highestSalesStore(storesWithTotals);
console.log(`\nStore with Highest Sales: ${topStore.storeName} Rs${topStore.totalSales}`);

let lowSalesStores = lowSalesStore(storesWithTotals);
console.log(`\nStores with low sales: ${JSON.stringify(lowSalesStores)}`);