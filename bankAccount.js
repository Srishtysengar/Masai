function createBankAccount(initialBalance){
    let Balance=initialBalance;

    return{
        deposit: function(amount){
            if(amount>0){
                Balance+=amount;
                return Balance;
            }else{
               return "Amount should be positive";
            }
        },
        withdraw: function(amount){
            if(amount>Balance){
                return "Insufficent Fund";
            }
            else if(amount<=0){
                return "Amount should be positive";
            }else{
                Balance-=amount;
                return Balance;
            }
        },
        getBalance: function(){
            return Balance;
        }
    }

}
const account = createBankAccount(100);
console.log(account.deposit(50)); 
console.log(account.withdraw(30)); 
console.log(account.withdraw(150)); 
console.log(account.getBalance());
console.log(account.balance);

