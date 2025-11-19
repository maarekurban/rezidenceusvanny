import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    // Sestavení HTML emailu
    const emailSubject = data.apartment 
      ? `Poptávka bytu ${data.apartment}` 
      : `Nová poptávka z ${data.page}`
    
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #C4A962 0%, #8B7355 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
            .field { margin: 15px 0; padding: 10px; background: white; border-radius: 4px; }
            .label { font-weight: bold; color: #C4A962; }
            .value { margin-top: 5px; }
            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2 style="margin: 0;">📧 Nová poptávka</h2>
              <p style="margin: 5px 0 0 0; opacity: 0.9;">Rezidence U sv. Anny</p>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">📍 Stránka:</div>
                <div class="value">${data.page}</div>
              </div>
              ${data.apartment ? `
              <div class="field">
                <div class="label">🏠 Byt:</div>
                <div class="value">${data.apartment}</div>
              </div>
              ` : ''}
              <div class="field">
                <div class="label">👤 Jméno:</div>
                <div class="value">${data.name}</div>
              </div>
              <div class="field">
                <div class="label">📞 Telefon:</div>
                <div class="value"><a href="tel:${data.phone}">${data.phone}</a></div>
              </div>
              <div class="field">
                <div class="label">📧 E-mail:</div>
                <div class="value"><a href="mailto:${data.email}">${data.email}</a></div>
              </div>
              ${data.message ? `
              <div class="field">
                <div class="label">💬 Zpráva:</div>
                <div class="value">${data.message}</div>
              </div>
              ` : ''}
            </div>
            <div class="footer">
              <p>Tento e-mail byl odeslán z kontaktního formuláře na rezidenceusvanny.cz</p>
            </div>
          </div>
        </body>
      </html>
    `

    // Odeslání emailu přes Resend
    await resend.emails.send({
      from: 'Rezidence U sv. Anny <onboarding@resend.dev>', // Změň po ověření domény
      to: ['info@rezidenceusvanny.cz'],
      subject: emailSubject,
      html: emailHtml,
    })

    // Log pro debugging
    console.log('✅ Email odeslán:', emailSubject)

    return NextResponse.json({ 
      success: true, 
      message: 'Poptávka byla úspěšně odeslána' 
    })
  } catch (error) {
    console.error('❌ Chyba při odesílání emailu:', error)
    return NextResponse.json(
      { success: false, message: 'Chyba při odesílání poptávky. Zkuste to prosím znovu.' },
      { status: 500 }
    )
  }
}



