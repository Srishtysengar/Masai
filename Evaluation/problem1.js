function analyzeTransactions(transactions){
    let totalCredits = 0;
    let totalDebits = 0;
    let highestTransaction = null;

    transactions.forEach(transaction =>{
        if(transaction.type === "credit"){
            totalCredits+=transaction.amount;
        }else if(transaction.type ==="debit"){
            totalDebits+=transaction.amount;
        }
        if(!highestTransaction || transaction.amount > highestTransaction.amount){
            highestTransaction=transaction;
        }
    } );

    let netBalance = totalCredits-totalDebits;
    return{
        totalCredits,
        totalDebits,
        highestTransaction,
        netBalance
    };
    
}
const transactions=[
    {amount:1000,type:"credit"},
    {amount:500,type:"debit"},
    {amount:2000,type:"credit"},
    {amount:300,type:"debit"},
]
console.log(analyzeTransactions(transactions));