import dynamoDB from "./client";


export const insertTokenInBlackList= async (token) => {
  var params = {
    Item: {
      "usrname": {"S": token},
      "refersh_token": {"S": token}
      }, 
    TableName: "revoking_token"
   };
  const result = await dynamoDB.putItem(params).promise();

  // return result?.Item;
}

export const searchTokenInBlackList  = async (token) => {
  const params = {
      Key: {
       "usrname": {"S": token}
      //  "refersh_token": {"S": token}
      }, 
      TableName: "revoking_token"
  };
  const result = await dynamoDB.getItem(params).promise();

  return result?.Item;
}

// insertTokenInBlackList("5");

// * Example of middleware to search blacklisted tokens (in dynamo db);
export const validateBlackListedTokens = async (req, resp, next) => {
  let token = req.headers['authorization'];

  if (token) {
      token = token.replace(/^Bearer\s/, '');
      
  } else {
      return resp.status(401).json({status: false,message: "Token not provided"});
  }

  // const isBlackListed  = await searchTokenInBlackList(token) as any;
  const isBlackListed  = await insertTokenInBlackList(token) as any;
  if(isBlackListed){
      return resp.status(401).json({ message: 'Black listed token' });
  }
  else{
      next();
  }
}

  
