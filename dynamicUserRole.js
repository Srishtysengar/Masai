let users=[
    {name:"Aman", role : "admin", active : "true"},
    {name:"Neha", role : "user", active : "false"}
]

function getAccessMessage(user){
    return user.role === "admin"
        ? (user.active ? "Admin Access Granted!" : "Admin Access Revoked")
        :  user.role === "user"
        ? (user.active ? "Admin Access Granted!" : "Admin Access Revoked")
        : "Access Denied"; 
}

users.forEach(user => console.log(getAccessMessage(user)));