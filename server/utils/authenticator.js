// import jwt from 'jsonwebtoken'

// export const generateToken = (userId, orgId, roleId, purpose = 'login') => {
//   return jwt.sign(
//     { userId, orgId, roleId, purpose, environment: process.env.NODE_ENV },
//     process.env.JWT_SECRET,
//     { expiresIn: '365d' }
//   )
// }

// export const verifyToken = (token) => {
//   try {
//     return jwt.verify(token, process.env.JWT_SECRET)
//   } catch (error) {
//     return null
//   }
// }



import jwt from 'jsonwebtoken'

export function generateToken(payload) {
  const { 
    userId, 
    orgId, 
    roleId, 
    purpose = 'login', 
    environment = process.env.NODE_ENV 
  } = payload
  
  return jwt.sign(
    { userId, orgId, roleId, purpose, environment },
    process.env.JWT_SECRET,
    { expiresIn: '365d' }
  )
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET)
  } catch (error) {
    console.error('Token verification error:', error.message)
    return null
  }
}