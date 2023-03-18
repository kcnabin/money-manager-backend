const jwt = require('jsonwebtoken')
const SECRETKEY = process.env.SECRETKEY

const decodeToken = async (token) => {
  
  const decodedToken = await jwt.verify(token, SECRETKEY)
  console.log("decoded token", decodedToken)
  return decodedToken
}

module.exports = decodeToken