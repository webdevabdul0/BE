import bcrypt from 'bcrypt'
import User from '../../models/auth/users'
import { generateToken } from '../../utils/authenticator'
import { successResponse, errorResponse } from '../../utils/response'

// export default defineEventHandler(async (event) => {
//   try {
   
//     const { email, password } = await readBody(event)
    
//     if (!email || !password) {
//       return errorResponse('Email and password required', 400)
//     }

   
//     const user = await Users.findOne({
//       where: { email: email.trim().toLowerCase() }
//     })

//     if (!user) {
//       return errorResponse('Invalid credentials', 401)
//     }

    
//     const isValidPassword = await bcrypt.compare(password, user.password)
    
//     if (!isValidPassword) {
//       return errorResponse('Invalid credentials', 401)
//     }

    
//     if (!user.isEmailVerified) {
//       return errorResponse('Email not verified', 401)
//     }

//     if (user.status !== 'Active') {
//       return errorResponse('Account disabled', 403)
//     }

//     const token = generateToken(
//       user.id,
//       user.lastLoginOrganisationId, // or default org
//       user.roleId
//     )

//     setCookie(event, 'accessToken', token, {
//       maxAge: 365 * 24 * 60 * 60,
//       httpOnly: true,
//       secure: process.env.NODE_ENV === 'production',
//       sameSite: 'lax',
//     })

//     return successResponse({
//       token,
//       user: {
//         id: user.id,
//         fullName: user.fullName,
//         email: user.email,
//         roleId: user.roleId,
//       }
//     })

//   } catch (error) {
//     console.error('Login error:', error)
//     return errorResponse('Login failed', 500)
//   }
// })




export default defineEventHandler(async (event) => {
  console.log('=== LOGIN ENDPOINT HIT ===')
  
  try {
    const body = await readBody(event)
    console.log('1. Body received:', body)
    
    const { email, password } = body
    console.log('2. Email:', email, 'Password:', password ? '*' : 'MISSING')
    
    if (!email || !password) {
      console.log('3. Validation failed')
      return errorResponse('Email and password required', 400)
    }

    console.log('4. Looking up user...')
    const user = await User.findOne({
      where: { 
        email: email.trim().toLowerCase() 
      }
    })
    console.log('5. User found:', user ? 'YES' : 'NO')

    if (!user) {
      console.log('6. User not found')
      return errorResponse('Invalid credentials', 401)
    }

    console.log('7. Verifying password...')
    const isValidPassword = await bcrypt.compare(password, user.password)
    console.log('8. Password valid:', isValidPassword)
    
    if (!isValidPassword) {
      console.log('9. Password invalid')
      return errorResponse('Invalid credentials', 401)
    }

    console.log('10. Generating token...')
    const token = generateToken({
      userId: user.id,
      orgId: user.lastLoginOrganisationId || null,
      roleId: user.roleId,
      purpose: 'login'
    })
    console.log('11. Token generated:', token ? 'YES' : 'NO')

    console.log('12. Setting cookie...')
    setCookie(event, 'accessToken', token, {
      maxAge: 365 * 24 * 60 * 60,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/'
    })

    console.log('13. Returning success')
    return successResponse({
      token: token,
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        roleId: user.roleId,
      }
    })

  } catch (error) {
    console.error('❌ LOGIN ERROR:', error)
    console.error('Error stack:', error.stack)
    return errorResponse('Login failed: ' + error.message, 500)
  }
})