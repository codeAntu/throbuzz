// TypeScript: Component to return a string of HTML for sending an email

export default class EmailComponent {
  // Function to generate HTML content for the email
  static generateEmailHtml({ name, OTP }: { name: string; OTP: string }): string {
    // HTML template for the email
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

// Example usage
// const subject = 'Welcome to Our Service!'
// const message = "Thank you for signing up. We're glad to have you with us."
// const emailHtml = EmailComponent.generateEmailHtml({
//   name: 'John Doe',
//   OTP: '1234',
// })
// console.log(emailHtml)
