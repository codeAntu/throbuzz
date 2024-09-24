export default class EmailComponent {
  static generateEmailHtml({ name, OTP, message }: { name: string; OTP: string; message: string }): string {
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
        <h3>Your OTP is: ${OTP}</h3>
        <p>${message}</p>
      </body>
      </html>
    `
    return htmlContent
  }
}
