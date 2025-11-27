import { jwtVerify } from 'jose'
import { cookies } from 'next/headers'

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || 'default-secret-change-in-production'
)

export async function verifyAuth(): Promise<boolean> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('admin-token')

    if (!token) {
      return false
    }

    await jwtVerify(token.value, secret)
    return true
  } catch (error) {
    console.error('Auth verification error:', error)
    return false
  }
}
