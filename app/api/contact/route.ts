import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Validace povinných polí
    if (!data.name || !data.phone || !data.email) {
      return NextResponse.json(
        { success: false, message: 'Všechna povinná pole musí být vyplněna' },
        { status: 400 }
      )
    }

    // Statický předmět emailu - bez dynamického obsahu kvůli spam filtrům
    const emailSubject = data.apartment
      ? 'Poptavka bytu'
      : 'Nova poptavka'

    // Sestavení textového emailu pro firmu
    const emailText = `NOVA POPTAVKA - Rezidence U sv. Anny

Stranka: ${data.page || 'Web'}
${data.apartment ? `Byt: ${data.apartment}\n` : ''}
Jmeno: ${data.name}
Telefon: ${data.phone}
E-mail: ${data.email}
${data.message && data.message.trim() !== '' ? `\nZprava:\n${data.message}\n` : ''}
---
Tento e-mail byl odeslan z kontaktniho formulare na rezidenceusvanny.cz
Pro odpoved pouzijte Reply (odpoved pujde primo klientovi).`

    // Odeslání textového emailu do firmy přes Resend
    const result = await resend.emails.send({
      from: 'Rezidence U sv. Anny <delivered@resend.dev>',
      to: ['info@rezidenceusvanny.cz'],
      replyTo: data.email,
      subject: emailSubject,
      text: emailText,
    })

    // Kontrola, zda byl email úspěšně odeslán
    if (!result.data) {
      throw new Error('Failed to send email')
    }

    return NextResponse.json({
      success: true,
      message: 'Poptávka byla úspěšně odeslána'
    })
  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json(
      { success: false, message: 'Chyba při odesílání poptávky. Zkuste to prosím znovu.' },
      { status: 500 }
    )
  }
}



