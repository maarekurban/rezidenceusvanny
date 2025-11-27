import { NextResponse } from 'next/server'
import { SignJWT } from 'jose'

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || 'default-secret-change-in-production'
)

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    // Validace přihlašovacích údajů
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@rezidenceusvanny.cz'
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123'

    if (email !== adminEmail || password !== adminPassword) {
      return NextResponse.json(
        { success: false, message: 'Nesprávné přihlašovací údaje' },
        { status: 401 }
      )
    }

    // Vytvoření JWT tokenu (platnost 24 hodin)
    const token = await new SignJWT({ email })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('24h')
      .sign(secret)

    // Nastavení cookie s tokenem
    const response = NextResponse.json({
      success: true,
      message: 'Přihlášení úspěšné'
    })

    response.cookies.set('admin-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 24 hodin
      path: '/',
    })

    return response
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { success: false, message: 'Chyba při přihlašování' },
      { status: 500 }
    )
  }
}
