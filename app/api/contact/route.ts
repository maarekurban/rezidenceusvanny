import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { google } from 'googleapis'

// Inicializace Google Sheets API
async function appendToSheet(data: any) {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    })

    const sheets = google.sheets({ version: 'v4', auth })
    const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID

    // Formátování dat pro Google Sheet
    const timestamp = new Date().toLocaleString('cs-CZ', {
      timeZone: 'Europe/Prague',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })

    const row = [
      timestamp,
      data.page || 'Web',
      data.apartment || '-',
      data.name,
      data.phone,
      data.email,
      data.message || '-'
    ]

    // Přidání řádku do sheetu
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'A:G', // Sloupce A až G
      valueInputOption: 'RAW',
      requestBody: {
        values: [row],
      },
    })
  } catch (error) {
    console.error('Error appending to Google Sheet:', error)
    // Pokračujeme i když Google Sheets selže - důležitější je odeslat email
  }
}

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

    // Konfigurace SMTP transportu (Siteground)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '465'),
      secure: true, // true pro port 465, false pro jiné porty
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

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

    // Paralelní odeslání emailu a zápis do Google Sheets
    await Promise.all([
      transporter.sendMail({
        from: `"Rezidence U sv. Anny" <${process.env.SMTP_FROM}>`,
        to: 'info@rezidenceusvanny.cz',
        replyTo: data.email,
        subject: emailSubject,
        text: emailText,
      }),
      appendToSheet(data)
    ])

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



