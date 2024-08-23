import { EmailTemplate } from './pages/verifyEmail'
import { resend } from './resend'

interface EmailProps {
  email: string
  subject: string
  name: string
  OTP: string
}

interface ResponseProps {
  success: boolean
  message: string
}

export async function sendEmail({ email, subject, name, OTP }: EmailProps): Promise<ResponseProps> {
  // send email
  try {
    const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: email,
      subject: subject,
      react: EmailTemplate({
        name: name,
        OTP: OTP,
      }),
    })

    if (error) {
      console.log('Error sending email', error)

      return {
        success: false,
        message: error.message,
      }
    }

    return {
      success: true,
      message: 'Email sent',
    }
  } catch (error) {
    console.error('Error sending email', error)
    return {
      success: false,
      message: 'Error sending email',
    }
  }
}
