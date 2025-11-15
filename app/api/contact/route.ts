import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    // V produkčním prostředí byste zde použili službu jako SendGrid, Resend, nebo Nodemailer
    // Pro demonstraci pouze logujeme data
    console.log('='.repeat(60))
    console.log('📧 NOVÁ POPTÁVKA')
    console.log('='.repeat(60))
    console.log(`📍 Stránka: ${data.page}`)
    if (data.apartment) {
      console.log(`🏠 Byt: ${data.apartment}`)
    }
    console.log(`👤 Jméno: ${data.name}`)
    console.log(`📞 Telefon: ${data.phone}`)
    console.log(`📧 E-mail: ${data.email}`)
    if (data.message) {
      console.log(`💬 Zpráva: ${data.message}`)
    }
    console.log('='.repeat(60))
    
    // Zde by měl být kód pro odeslání e-mailu
    // Příklad s nodemailer (po instalaci a konfiguraci):
    /*
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: 'info@rezidenceusvanny.cz',
      subject: data.apartment 
        ? `Poptávka bytu ${data.apartment}` 
        : `Nová poptávka z ${data.page}`,
      html: `
        <h2>Nová poptávka</h2>
        <p><strong>Stránka:</strong> ${data.page}</p>
        ${data.apartment ? `<p><strong>Byt:</strong> ${data.apartment}</p>` : ''}
        <p><strong>Jméno:</strong> ${data.name}</p>
        <p><strong>Telefon:</strong> ${data.phone}</p>
        <p><strong>E-mail:</strong> ${data.email}</p>
        ${data.message ? `<p><strong>Zpráva:</strong> ${data.message}</p>` : ''}
      `,
    })
    */

    return NextResponse.json({ 
      success: true, 
      message: 'Poptávka byla úspěšně odeslána' 
    })
  } catch (error) {
    console.error('Chyba při odesílání:', error)
    return NextResponse.json(
      { success: false, message: 'Chyba při odesílání poptávky' },
      { status: 500 }
    )
  }
}

