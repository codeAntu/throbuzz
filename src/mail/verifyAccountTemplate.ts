export default class EmailComponent {
  static generateEmailHtml({ name, OTP }: { name: string; OTP: string }): string {
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>
        OTP Verification
        </title>
      </head>
      <body>
         <h1>Welcome, ${name}!</h1>
    <p>Your OTP is: ${OTP}</p>
      </body>
      </html>
    `
    return htmlContent
  }
}
