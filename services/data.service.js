let currentUser;
let accountDetails = {
  1000: {
    acno: 1000,
    username: "userone",
    password: "userone",
    balance: 50000,
  },
  1001: { acno: 1001, username: "usertwo", password: "usertwo", balance: 5000 },
  1002: {
    acno: 1002,
    username: "userthree",
    password: "userthree",
    balance: 10000,
  },
  1003: {
    acno: 1003,
    username: "userfour",
    password: "userfour",
    balance: 6000,
  },
};

const register = (uname, acno, pswd) => {
  let user = accountDetails;
  if (acno in user) {
    return {
      statusCode: 422,
      status: false,
      message: "user exist please login"
    };
  } 
  else {
    user[acno] = {
      acno,
      username: uname,
      password: pswd,
      balance: 0,
    };
    return {
      statusCode: 200,
      status: true,
      message: "successfully registerd"
    };
  }
};
const login = (req,acno,pswd) => {
  let user = accountDetails;
  if (acno in user) {
    if (pswd == user[acno]["password"]) {
      req.session.currentUser = user[acno]["username"]
      return {
        statusCode:200,
        status:true,
        message: " login successfully "
      }
    }
     else {
      return {
        statusCode: 422,
        status: false,
        message: "incorrect password"
      }
    }
  } 
  else {
    return {
      statusCode: 422,
      status: false,
      message: "invalid account"
    }
  }
}

const deposit=(req,acno,pswd,amt)=>{
   
  if(!req.session.currentUser){
    return {
      statusCode: 401,
      status: false,
      message: "please login"
    }
  }
    var amount = parseInt(amt);
    let user = accountDetails;
    if(acno in user){
     if (pswd == user[acno]["password"]) {
       user[acno]["balance"]+=amount;
       return {
        statusCode:200,
        status:true,
        balance:user[acno]["balance"],
        message:amount+ "  credited and new balance is"+user[acno]["balance"]
      }
       
     }
    else{
      return {
        statusCode: 422,
        status: false,
        message: "incorrect password"
      }
 
    }
   }
   else{
     return {
        statusCode: 422,
        status: false,
        message: "invalid account"
      }
   }
 
  }

  const withdraw=(acno,pswd,amt)=>{
    var amount = parseInt(amt);
    let user = accountDetails;
    if(acno in user){
     if (pswd == user[acno]["password"]) {
 
      if(user[acno]["balance"] > amount){
        user[acno]["balance"]-=amount;
        return {
            statusCode:200,
            status:true,
            balance:user[acno]["balance"],
            message:amount+ "  debited and new balance is"+user[acno]["balance"]
          }
        
      }
      else{
        return {
            statusCode: 422,
            status: false,
            message: "insufficient balance"
          }
      }
    }
    else{

    return {
        statusCode: 422,
        status: false,
        message: "incorrect password"
      }
     }
  }
  else{
    
    return {
        statusCode: 422,
        status: false,
        message: "invalid account"
      }
  }
 }
 
module.exports = {
  register,
  login,
  deposit,
  withdraw
}
