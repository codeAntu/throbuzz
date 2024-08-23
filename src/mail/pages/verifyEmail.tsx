import * as React from 'react'

interface EmailTemplateProps {
  name: string
  OTP: string
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({ name, OTP }: { name: string; OTP: string }) => (
  <div>
    <h1>Welcome, {name}!</h1>
    <p>Your OTP is: {OTP}</p>
  </div>
)
