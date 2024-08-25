// export default function verifyAccountTemplate({ encodedToken, name }: { encodedToken: string; name: string }): string {
//   return `<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
//   <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
//   <head>
//   <!--[if gte mso 9]>
//   <xml>
//     <o:OfficeDocumentSettings>
//       <o:AllowPNG/>
//       <o:PixelsPerInch>96</o:PixelsPerInch>
//     </o:OfficeDocumentSettings>
//   </xml>
//   <![endif]-->
//     <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <meta name="x-apple-disable-message-reformatting">
//     <!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
//     <title></title>

//       <style type="text/css">
//         @media only screen and (min-width: 620px) {
//     .u-row {
//       width: 600px !important;
//     }
//     .u-row .u-col {
//       vertical-align: top;
//     }

//     .u-row .u-col-100 {
//       width: 600px !important;
//     }

//   }

//   @media (max-width: 620px) {
//     .u-row-container {
//       max-width: 100% !important;
//       padding-left: 0px !important;
//       padding-right: 0px !important;
//     }
//     .u-row .u-col {
//       min-width: 320px !important;
//       max-width: 100% !important;
//       display: block !important;
//     }
//     .u-row {
//       width: 100% !important;
//     }
//     .u-col {
//       width: 100% !important;
//     }
//     .u-col > div {
//       margin: 0 auto;
//     }
//   }
//   body {
//     margin: 0;
//     padding: 0;
//   }

//   table,
//   tr,
//   td {
//     vertical-align: top;
//     border-collapse: collapse;
//   }

//   p {
//     margin: 0;
//   }

//   .ie-container table,
//   .mso-container table {
//     table-layout: fixed;
//   }

//   * {
//     line-height: inherit;
//   }

//   a[x-apple-data-detectors='true'] {
//     color: inherit !important;
//     text-decoration: none !important;
//   }

//   table, td { color: #000000; } #u_body a { color: #f1b94b; text-decoration: underline; } @media (max-width: 480px) { #u_content_image_1 .v-src-width { width: auto !important; } #u_content_image_1 .v-src-max-width { max-width: 28% !important; } #u_content_image_2 .v-container-padding-padding { padding: 10px 25px 9px !important; } #u_content_image_2 .v-src-width { width: auto !important; } #u_content_image_2 .v-src-max-width { max-width: 70% !important; } #u_content_heading_2 .v-container-padding-padding { padding: 20px 15px 10px !important; } #u_content_button_1 .v-container-padding-padding { padding: 20px 10px !important; } #u_content_button_1 .v-size-width { width: 92% !important; } #u_content_button_1 .v-padding { padding: 14px 21px 14px 20px !important; } #u_content_text_1 .v-container-padding-padding { padding: 20px !important; } #u_content_text_2 .v-container-padding-padding { padding: 10px 20px 70px !important; } }
//       </style>

//   <!--[if !mso]><!--><link href="https://fonts.googleapis.com/css?family=Cabin:400,700" rel="stylesheet" type="text/css"><link href="https://fonts.googleapis.com/css?family=Lato:400,700" rel="stylesheet" type="text/css"><link href="https://fonts.googleapis.com/css?family=Raleway:400,700" rel="stylesheet" type="text/css"><link href="https://fonts.googleapis.com/css?family=Cabin:400,700" rel="stylesheet" type="text/css"><!--<![endif]-->

//   </head>

//   <body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #f5f5f5;color: #000000">
//     <!--[if IE]><div class="ie-container"><![endif]-->
//     <!--[if mso]><div class="mso-container"><![endif]-->
//     <table id="u_body" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #f5f5f5;width:100%" cellpadding="0" cellspacing="0">
//     <tbody>
//     <tr style="vertical-align: top">
//       <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
//       <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #f5f5f5;"><![endif]-->

//   <div class="u-row-container" style="padding: 0px;background-color: #fbea41">
//     <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
//       <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
//         <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: #fbea41;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->

//   <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
//   <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
//     <div style="height: 100%;width: 100% !important;">
//     <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->

//   <table id="u_content_image_1" style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
//     <tbody>
//       <tr>
//         <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:35px 10px;font-family:arial,helvetica,sans-serif;" align="left">

//   <table width="100%" cellpadding="0" cellspacing="0" border="0">
//     <tr>
//       <td style="padding-right: 0px;padding-left: 0px;" align="center">
//         <a href="https://unlayer.com" target="_blank">
//         <img align="center" border="0" src="https://cdn.templates.unlayer.com/assets/1636448525719-loo.png" alt="Logo" title="Logo" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 25%;max-width: 145px;" width="145" class="v-src-width v-src-max-width"/>
//         </a>
//       </td>
//     </tr>
//   </table>

//         </td>
//       </tr>
//     </tbody>
//   </table>

//     <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
//     </div>
//   </div>
//   <!--[if (mso)|(IE)]></td><![endif]-->
//         <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
//       </div>
//     </div>
//     </div>

//   <div class="u-row-container" style="padding: 0px;background-color: #fbea41">
//     <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
//       <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
//         <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: #fbea41;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->

//   <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
//   <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
//     <div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
//     <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->

//   <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
//     <tbody>
//       <tr>
//         <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:30px 10px 20px;font-family:arial,helvetica,sans-serif;" align="left">

//     <!--[if mso]><table width="100%"><tr><td><![endif]-->
//       <h2 style="margin: 0px; color: #171046; line-height: 140%; text-align: center; word-wrap: break-word; font-family: 'Raleway',sans-serif; font-size: 20px; font-weight: 400;"><span><span><span><span><span><span><span><span><span><span><strong>Hello ${name}</strong></span></span></span></span></span></span></span></span></span></span></h2>
//     <!--[if mso]></td></tr></table><![endif]-->

//         </td>
//       </tr>
//     </tbody>
//   </table>

//     <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
//     </div>
//   </div>
//   <!--[if (mso)|(IE)]></td><![endif]-->
//         <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
//       </div>
//     </div>
//     </div>

//   <div class="u-row-container" style="padding: 0px;background-color: transparent">
//     <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
//       <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
//         <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->

//   <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
//   <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
//     <div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
//     <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->

//   <table id="u_content_image_2" style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
//     <tbody>
//       <tr>
//         <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">

//   <table width="100%" cellpadding="0" cellspacing="0" border="0">
//     <tr>
//       <td style="padding-right: 0px;padding-left: 0px;" align="center">
//         <a href="https://quicknote.vercel.app" target="_blank">
//         <img align="center" border="0" src="https://cdn.templates.unlayer.com/assets/1636450033923-19197947.png" alt="Hero Image" title="Hero Image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 40%;max-width: 232px;" width="232" class="v-src-width v-src-max-width"/>
//         </a>
//       </td>
//     </tr>
//   </table>

//         </td>
//       </tr>
//     </tbody>
//   </table>

//   <table id="u_content_heading_2" style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
//     <tbody>
//       <tr>
//         <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:20px 35px;font-family:arial,helvetica,sans-serif;" align="left">

//     <!--[if mso]><table width="100%"><tr><td><![endif]-->
//       <h4 style="margin: 0px; color: #868686; line-height: 170%; text-align: center; word-wrap: break-word; font-family: 'Cabin',sans-serif; font-size: 16px; font-weight: 400;"><span><span><span><span><span><span><span><span><span><span><span><span><span><span><span><span><span>We're excited to have you get started! First you need to verify your account. </span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></h4>
//     <!--[if mso]></td></tr></table><![endif]-->

//         </td>
//       </tr>
//     </tbody>
//   </table>

//   <table id="u_content_button_1" style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
//     <tbody>
//       <tr>
//         <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:20px 10px;font-family:arial,helvetica,sans-serif;" align="left">

//     <!--[if mso]><style>.v-button {background: transparent !important;}</style><![endif]-->
//   <div align="center">
//     <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${
//       process.env.DOMAIN
//     }/api/verifyEmail/${encodedToken}" style="height:45px; v-text-anchor:middle; width:319px;" arcsize="4.5%"  stroke="f" fillcolor="#181147"><w:anchorlock/><center style="color:#ffffff;"><![endif]-->
//       <a href="${
//         process.env.DOMAIN
//       }/api/verifyEmail/${encodedToken}" target="_blank" class="v-button v-size-width" style="box-sizing: border-box;display: inline-block;text-decoration: none;-webkit-text-size-adjust: none;text-align: center;color: #ffffff; background-color: #181147; border-radius: 2px;-webkit-border-radius: 2px; -moz-border-radius: 2px; width:55%; max-width:100%; overflow-wrap: break-word; word-break: break-word; word-wrap:break-word; mso-border-alt: none;font-size: 14px;">
//         <span class="v-padding" style="display:block;padding:14px 21px 14px 20px;line-height:120%;"><span style="font-family: Cabin, sans-serif; font-size: 14px; line-height: 16.8px;"><strong><span style="line-height: 16.8px;"><span style="line-height: 16.8px;">Verify Your Account</span></span></strong></span></span>
//       </a>
//       <!--[if mso]></center></v:roundrect><![endif]-->
//   </div>

//         </td>
//       </tr>
//     </tbody>
//   </table>

//   <table id="u_content_text_1" style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
//     <tbody>
//       <tr>
//         <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:40px 35px 30px;font-family:arial,helvetica,sans-serif;" align="left">

//     <div style="font-size: 14px; color: #868686; line-height: 180%; text-align: left; word-wrap: break-word;">
//       <p style="line-height: 180%;"><span style="font-size: 14px; line-height: 25.2px;"><span style="font-family: Cabin, sans-serif; line-height: 25.2px;">Thank you for choosing Quick Notes! </span><span style="font-family: Cabin, sans-serif; line-height: 25.2px;">We're excited to have you on board.</span></span></p>
//   <p style="line-height: 180%;"> </p>
//   <p style="line-height: 180%;"><span style="font-family: Cabin, sans-serif; line-height: 25.2px; font-size: 14px;">To ensure the security of your account and provide you with seamless access to our features, we kindly ask you to verify your email address. Verifying your email is a quick and easy process that will unlock the full potential of our platform.</span></p>
//     </div>

//         </td>
//       </tr>
//     </tbody>
//   </table>

//   <table id="u_content_text_2" style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
//     <tbody>
//       <tr>
//         <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px 35px 70px;font-family:arial,helvetica,sans-serif;" align="left">

//     <div style="font-size: 14px; color: #868686; line-height: 180%; text-align: left; word-wrap: break-word;">
//       <p style="font-size: 14px; line-height: 180%;"><span style="font-family: Cabin, sans-serif; line-height: 25.2px; font-size: 14px;">If you encounter any issues or have any questions during the verification process, please don't hesitate to reach out to our support team at <a rel="noopener" href="mailto:codeAbinash.beta@gmail.com?subject=Need%20Support" target="_blank">codeAbinash.beta@gmail.com</a>. We're here to assist you every step of the way.</span></p>
//   <p style="font-size: 14px; line-height: 180%;"> </p>
//   <p style="line-height: 180%;"><span style="font-family: Cabin, sans-serif; line-height: 25.2px; font-size: 14px;">Thank you for choosing Quick Notes. We look forward to providing you with an exceptional note-taking experience!</span></p>
//   <p style="line-height: 180%;"> </p>
//   <p style="line-height: 180%;"><span style="font-family: Cabin, sans-serif; line-height: 25.2px; font-size: 14px;">Best regards,</span></p>
//   <p style="font-size: 14px; line-height: 180%;"><span style="font-size: 14px; line-height: 25.2px;"><strong><span style="font-family: Cabin, sans-serif; line-height: 25.2px;">Quick Notes </span></strong></span></p>
//     </div>

//         </td>
//       </tr>
//     </tbody>
//   </table>

//     <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
//     </div>
//   </div>
//   <!--[if (mso)|(IE)]></td><![endif]-->
//         <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
//       </div>
//     </div>
//     </div>

//   <div class="u-row-container" style="padding: 0px;background-color: transparent">
//     <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #181147;">
//       <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
//         <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #181147;"><![endif]-->

//   <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
//   <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
//     <div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
//     <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->

//   <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
//     <tbody>
//       <tr>
//         <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:40px 10px 20px;font-family:arial,helvetica,sans-serif;" align="left">

//     <!--[if mso]><table width="100%"><tr><td><![endif]-->
//       <h4 style="margin: 0px; color: #ffffff; line-height: 140%; text-align: center; word-wrap: break-word; font-family: 'Raleway',sans-serif; font-size: 16px; font-weight: 400;"><span><span><span><span><span><span><span><span><span><span><span><span><strong>Get In Touch, Follow us on</strong></span></span></span></span></span></span></span></span></span></span></span></span></h4>
//     <!--[if mso]></td></tr></table><![endif]-->

//         </td>
//       </tr>
//     </tbody>
//   </table>

//   <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
//     <tbody>
//       <tr>
//         <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">

//   <div align="center">
//     <div style="display: table; max-width:187px;">
//     <!--[if (mso)|(IE)]><table width="187" cellpadding="0" cellspacing="0" border="0"><tr><td style="border-collapse:collapse;" align="center"><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse; mso-table-lspace: 0pt;mso-table-rspace: 0pt; width:187px;"><tr><![endif]-->

//       <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 15px;" valign="top"><![endif]-->
//       <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 15px">
//         <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
//           <a href="https://instagram.com/codeAbinash" title="Instagram" target="_blank">
//             <img src="https://cdn.tools.unlayer.com/social/icons/rounded/instagram.png" alt="Instagram" title="Instagram" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
//           </a>
//         </td></tr>
//       </tbody></table>
//       <!--[if (mso)|(IE)]></td><![endif]-->

//       <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 15px;" valign="top"><![endif]-->
//       <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 15px">
//         <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
//           <a href="https://facebook.com/codeAbinash" title="Facebook" target="_blank">
//             <img src="https://cdn.tools.unlayer.com/social/icons/rounded/facebook.png" alt="Facebook" title="Facebook" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
//           </a>
//         </td></tr>
//       </tbody></table>
//       <!--[if (mso)|(IE)]></td><![endif]-->

//       <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 15px;" valign="top"><![endif]-->
//       <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 15px">
//         <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
//           <a href="https://linkedin.com/codeAbinash" title="LinkedIn" target="_blank">
//             <img src="https://cdn.tools.unlayer.com/social/icons/rounded/linkedin.png" alt="LinkedIn" title="LinkedIn" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
//           </a>
//         </td></tr>
//       </tbody></table>
//       <!--[if (mso)|(IE)]></td><![endif]-->

//       <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 0px;" valign="top"><![endif]-->
//       <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 0px">
//         <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
//           <a href="https://twitter.com/codeAbinash" title="Twitter" target="_blank">
//             <img src="https://cdn.tools.unlayer.com/social/icons/rounded/twitter.png" alt="Twitter" title="Twitter" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
//           </a>
//         </td></tr>
//       </tbody></table>
//       <!--[if (mso)|(IE)]></td><![endif]-->

//       <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
//     </div>
//   </div>

//         </td>
//       </tr>
//     </tbody>
//   </table>

//   <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
//     <tbody>
//       <tr>
//         <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:20px 30px 40px;font-family:arial,helvetica,sans-serif;" align="left">

//     <div style="font-size: 14px; color: #ced4d9; line-height: 200%; text-align: center; word-wrap: break-word;">
//       <p style="font-size: 14px; line-height: 200%;"><span style="font-family: Lato, sans-serif; font-size: 12px; line-height: 24px;">If you have questions regarding your Data, please visit our <a rel="noopener" href="https://quicknote.vercel.app/privary_policy" target="_blank">Privacy Policy</a> . </span></p>
//   <p style="font-size: 14px; line-height: 200%;"><span style="font-family: Lato, sans-serif; font-size: 12px; line-height: 24px;">W</span><span style="font-family: Lato, sans-serif; font-size: 12px; line-height: 24px;">ant to change how you receive these emails? </span></p>
//   <p style="font-size: 14px; line-height: 200%;"><span style="font-family: Lato, sans-serif; font-size: 12px; line-height: 24px;">You can update your preferences or <a rel="noopener" href="https://quicknote.vercel.app/unsubscribe" target="_blank"><span style="text-decoration: underline; line-height: 28px;">unsubscribe</span></a> from this list.</span></p>
//     </div>

//         </td>
//       </tr>
//     </tbody>
//   </table>

//     <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
//     </div>
//   </div>
//   <!--[if (mso)|(IE)]></td><![endif]-->
//         <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
//       </div>
//     </div>
//     </div>

//   <div class="u-row-container" style="padding: 0px;background-color: transparent">
//     <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #f7d845;">
//       <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
//         <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #f7d845;"><![endif]-->

//   <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
//   <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
//     <div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
//     <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->

//   <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
//     <tbody>
//       <tr>
//         <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:13px 10px;font-family:arial,helvetica,sans-serif;" align="left">

//     <div style="font-size: 14px; color: #000000; line-height: 140%; text-align: center; word-wrap: break-word;">
//       <p style="font-size: 14px; line-height: 140%;"><span style="font-family: Cabin, sans-serif; font-size: 12px; line-height: 16.8px;">© ${new Date().getFullYear()} Quick Notes. All Rights Reserved.</span></p>
//     </div>

//         </td>
//       </tr>
//     </tbody>
//   </table>

//     <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
//     </div>
//   </div>
//   <!--[if (mso)|(IE)]></td><![endif]-->
//         <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
//       </div>
//     </div>
//     </div>

//       <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
//       </td>
//     </tr>
//     </tbody>
//     </table>
//     <!--[if mso]></div><![endif]-->
//     <!--[if IE]></div><![endif]-->
//   </body>

//   </html>
//   `
// }
