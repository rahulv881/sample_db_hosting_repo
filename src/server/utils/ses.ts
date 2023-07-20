import { CONSTANT_CONFIG } from "../../config/CONSTANT_CONFIG";

const AWS = require('aws-sdk');
const nodemailer = require("nodemailer");

let ses = new AWS.SES({
    accessKeyId: '' ,//CONSTANT_CONFIG.SES.ACCESS_KEY,
    secretAccessKey:'', //CONSTANT_CONFIG.SES.SECRET_KEY,
    region: '',//CONSTANT_CONFIG.AWS.REGION,
    sslEnabled: true,
    apiVersion: '2010-12-01'
});


let s3BucketURL = 'bucket' //CONSTANT_CONFIG.S3.STATIC_BUCKET_URL;
let CurrentYear = new Date().getFullYear();

export const SES = {
    sendEmail: async (toEmailID, EMAIL_TEMPLATE, emailData) => {
        try {
            let emailBody = "";
            let emailSubject = "";
            if (EMAIL_TEMPLATE == "EMAIL_ENTITY_REQUEST") {
                emailSubject = "Thank you for your interest in Launch My Career!";
                emailBody = await ConfirmationReceiptApplicationJoinLMCSchool(emailData);
            } else if (EMAIL_TEMPLATE == "CONFIRM_RESET_PASSWORD") {
                emailSubject = "Password reset for Launch My Career";
                emailBody = await ConfirmationOnSuccessfulResetOfPassword(emailData);
            } else if (EMAIL_TEMPLATE == "SIGNUP_WITH_TEMP_PASSWORD") {
                emailSubject = "Welcome to LaunchMyCareer!";
                emailBody = await SignUpWithTempPassword(emailData);
            } else if (EMAIL_TEMPLATE == "CSC_SIGNUP_WITH_TEMP_PASSWORD") {
                emailSubject = "Welcome to LaunchMyCareer!";
                emailBody = await CSCSignUpWithTempPassword(emailData);
            }
            if (emailBody != '') {
                const mailOptions = {
                    headers: {
                        'X-SES-CONFIGURATION-SET': 'Engagement',
                    },
                    from: "LaunchMyCareer <" +  'email' /*CONSTANT_CONFIG.SES.FROM_EMAIL */ + ">",
                    subject: emailSubject,
                    html: emailBody,
                    to: toEmailID,
                };
                let transporter = nodemailer.createTransport({
                    SES: ses
                });

                transporter.sendMail(mailOptions, function (err, info) {
                    if (err) {
                        console.log(err, "Error sending email");
                        return false;
                    } else {
                        console.log("Email sent successfully");
                        return true;
                    }
                });
            } else {
                return false;
            }

        } catch (err) {
            console.log(err, 'error');
            return false;
        }
    }
}

async function ConfirmationReceiptApplicationJoinLMCSchool(data) {
    //let valus = JSON.stringify(data);
    //console.log(data);
    let APPLICANT_FIRST_NAME = data.APPLICANT_FIRST_NAME || '';
    let APPLICANT_FAMILY_NAME = data.APPLICANT_FAMILY_NAME || '';
    let FULL_ADDRESS = "";
    if (data.STREET_ADDRESS != "") {
        FULL_ADDRESS += data.ENTITY_STREET_ADDRESS;
    }
    if (data.LOCALITY != "") {
        FULL_ADDRESS += ", " + data.ENTITY_LOCALITY;
    }
    if (data.REGION != "") {
        FULL_ADDRESS += ", " + data.ENTITY_REGION;
    }
    if (data.COUNTRY != "") {
        FULL_ADDRESS += ", " + data.ENTITY_COUNTRY;
    }
    if (data.POSTAL_CODE != "") {
        FULL_ADDRESS += " - " + data.ENTITY_POSTAL_CODE;
    }
    let STATUS = data.STATUS;
    let REQUEST_ID = data.REQUEST_ID;
    let ENTITY_NAME = data.ENTITY_NAME;
    let emailTempalte = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
     <html xmlns="http://www.w3.org/1999/xhtml">
        <head>
           <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
           <meta name="viewport" content="width=device-width, initial-scale=1.0">
           <!--[if gte mso 12]><br /> <![endif]--> <!--[if (gte mso 9)|(IE)]> 
           <style type="text/css"> table { border-collapse: collapse; border-spacing: 0; } a{ text-decoration: none; color:#} </style>
           <![endif]--> 
           <title>LaunchMyCareer</title>
           <style type="text/css"> body { padding-top: 0 !important; padding-bottom: 0 !important; padding-top: 0 !important; padding-bottom: 0 !important; margin:0 !important; width: 100% !important; -webkit-text-size-adjust: 100% !important; -ms-text-size-adjust: 100% !important; -webkit-font-smoothing: antialiased !important; font-family: Arial, Helvetica, sans-serif; font-size: 18px; } @media (max-width:640px) { body { font-size: 18px; line-height: 22px; } p { font-size: 18px; line-height: 22px; } table{max-width: 100%; width: 100%;} } *{ margin: 0px; padding: 0px;} </style>
        </head>
        <body paddingwidth="0" paddingheight="0" style="padding-top: 0; text-align: center; padding-bottom: 0; padding-top: 0; padding-bottom: 0; background: #fff; background-repeat: repeat; width: 100% !important; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; -webkit-font-smoothing: antialiased;" offset="0" toppadding="0" leftpadding="0">
           <table width="700" border="0" cellspacing="0" cellpadding="0" class="tableContent bgBody" align="center" valign="top" style='font-family:Arial, Helvetica, sans-serif; margin: auto; max-width: 700px; width:100%; font-weight: 300;'>
              <tr>
                 <td align="center" valign="top" width="100%" cellpadding="0" cellspacing="0">
                    <table border="0" cellspacing="0" cellpadding="0" bgcolor="#f2e5fc" style=" font-weight: 700;" cellspacing="0" cellspacing="0" width="100%">
                       <tr>
                          <td width="100%" cellpadding="0" cellspacing="0" style="background: #f2e5fc; color: #fff; font-weight: 300; font-size: 18px;">
                             <table border="0" cellspacing="0" cellpadding="0" width="100%">
                                <tr>
                                   <td cellpadding="0" cellspacing="0" height="20" style="height:20px"></td>
                                </tr>
                                <tr>
                                   <td cellpadding="0" cellspacing="0" width="100" align="center" valign="top"><img id="u2480_img" class="img" style="width:112px" src="${s3BucketURL}assets/logo/logo.png"></td>
                                </tr>
                                <tr>
                                   <td cellpadding="0" cellspacing="0" height="20" style="height:20px; background: #f2e5fc;"></td>
                                </tr>
                             </table>
                          </td>
                       </tr>
                       <tr>
                          <td width="100%" style="background: #331c5e; color: #fff; font-size: 18px; padding: 0 40px; font-weight: 300;">
                             <table border="0" cellspacing="0" cellpadding="0" width="100%">
                                <tr>
                                   <td width="100%" height="55px" style="height:55px"></td>
                                </tr>
                                <tr>
                                   <td width="100%">
                                      <p style="margin: 0 0 20px 0; font-size: 18px;">Hello ${APPLICANT_FIRST_NAME},</p>
                                      <p style="margin: 0 0 20px 0; font-size: 16px;">We have received an application for ${ENTITY_NAME} to join Launch My Career.  We will be in touch shortly to confirm your information and continue the process.</p>
                                   </td>
                                </tr>
                                <tr>
                                   <td width="100%">
                                      <p style="margin: 0 0 20px 0; font-size: 18px;">Name: ${APPLICANT_FIRST_NAME} ${APPLICANT_FAMILY_NAME}</p>
                                   </td>
                                </tr>
                                <tr>
                                   <td width="100%">
                                      <p style="margin: 0 0 20px 0; font-size: 18px;">Address: <span>${FULL_ADDRESS}</span></p>
                                   </td>
                                </tr>
                                <tr>
                                   <td width="100%">
                                      <p style="margin: 0 0 20px 0; font-size: 18px;">Status: ${STATUS}</p>
                                   </td>
                                </tr>
                                <tr>
                                   <td width="100%">
                                      <p style="margin: 0 0 20px 0; font-size: 18px;">Your Request ID is: ${REQUEST_ID}</p>
                                   </td>
                                </tr>
                                <tr>
                                   <td width="100%">
                                      <p style="margin: 0 0 20px 0; font-size: 16px;">Please include this Request ID when inquiring about your application status. </p>
                                   </td>
                                </tr>
                                </tr>
                                <tr>
                                   <td width="100%" height="45px" style="height:45px"></td>
                                </tr>
                             </table>
                          </td>
                       </tr>
                       <tr>
                          <td width="100%" cellpadding="0" cellspacing="0" border="0" height="5px" colspan="3" style="width:100%; height:5px; margin: 0px; padding: 0px; border:0px; outline:0px; background-color: #EE2674; background-image: linear-gradient( to right, #FFFF00 -50%, #EE2674 100% ); padding: 0 40px"></td>
                       </tr>
                       <tr style="margin: 0px; padding: 0px; border: 0px; outline: 0px;">
                          <td width="100%" cellpadding="0" cellspacing="0" border="0" style="background: #100726; color: #fff; font-size: 18px; padding: 0 20px; font-weight: 300;">
                             <table border="0" cellspacing="0" cellpadding="0" style="text-align: center;" width="100%">
                                <tr>
                                   <td width="100%" height="25px" style="height:25px"></td>
                                </tr>
                                <tr>
                                   <td width="100%" align="left" valign="top" style="font-size: 15px; color:#9B9B9B">
                                      You received this mandatory email service announcement to update you about important changes to your LaunchMyCareer account.
                                </tr>
                                <tr>
                                   <td width="100%" align="left"style="font-size: 15px" valign="top">
                                      <br/>
                                      <p style="color:#9B9B9B; font-size: 15px; text-align: center; padding: 0 0 5px 0">&copy; ${CurrentYear} LaunchMyCareer Pvt. Ltd.</p>
                                      <p style="color:#9B9B9B; font-size: 15px; text-align: center; padding: 0 0 5px 0">B-121, Sector 67, Noida, Uttar Pradesh 201301, India </p>
                                   </td>
                                </tr>
                                <tr>
                                   <td width="100%" height="25px" style="height:10px"></td>
                                </tr>
                             </table>
                          </td>
                       </tr>
                    </table>
                 </td>
              </tr>
           </table>
        </body>
     </html>`;
    return emailTempalte;
}

async function ConfirmationOnSuccessfulResetOfPassword(data) {
    const username = (data.GIVEN_NAME) ? data.GIVEN_NAME : 'User';
    let emailTempalte = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
     <html xmlns="http://www.w3.org/1999/xhtml">
        <head>
           <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
           <meta name="viewport" content="width=device-width, initial-scale=1.0">
           <!--[if gte mso 12]><br /> <![endif]--> <!--[if (gte mso 9)|(IE)]> 
           <style type="text/css"> table { border-collapse: collapse; border-spacing: 0; } a{ text-decoration: none; color:#} </style>
           <![endif]--> 
           <title>LaunchMyCareer</title>
           <style type="text/css"> body { padding-top: 0 !important; padding-bottom: 0 !important; padding-top: 0 !important; padding-bottom: 0 !important; margin:0 !important; width: 100% !important; -webkit-text-size-adjust: 100% !important; -ms-text-size-adjust: 100% !important; -webkit-font-smoothing: antialiased !important; font-family: Arial, Helvetica, sans-serif; font-size: 18px; } @media (max-width:640px) { body { font-size: 18px; line-height: 22px; } p { font-size: 18px; line-height: 22px; } table{max-width: 100%; width: 100%;} } *{ margin: 0px; padding: 0px;} </style>
        </head>
        <body paddingwidth="0" paddingheight="0" style="padding-top: 0; text-align: center; padding-bottom: 0; padding-top: 0; padding-bottom: 0; background: #fff; background-repeat: repeat; width: 100% !important; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; -webkit-font-smoothing: antialiased;" offset="0" toppadding="0" leftpadding="0">
           <table width="700" border="0" cellspacing="0" cellpadding="0" class="tableContent bgBody" align="center" valign="top" style='font-family:Arial, Helvetica, sans-serif; margin: auto; max-width: 700px; width:100%; font-weight: 300;'>
              <tr>
                 <td align="center" valign="top" width="100%" cellpadding="0" cellspacing="0">
                    <table border="0" cellspacing="0" cellpadding="0" bgcolor="#f2e5fc" style=" font-weight: 700;" cellspacing="0" cellspacing="0" width="100%">
                       <tr>
                          <td width="100%" cellpadding="0" cellspacing="0" style="background: #f2e5fc; color: #fff; font-weight: 300; font-size: 18px;">
                             <table border="0" cellspacing="0" cellpadding="0" width="100%">
                                <tr>
                                   <td cellpadding="0" cellspacing="0" height="20" style="height:20px"></td>
                                </tr>
                                <tr>
                                   <td cellpadding="0" cellspacing="0" width="100" align="center" valign="top"><img id="u2480_img" class="img" style="width:112px" src="${s3BucketURL}assets/logo/logo.png"></td>
                                </tr>
                                <tr>
                                   <td cellpadding="0" cellspacing="0" height="20" style="height:20px; background: #f2e5fc;"></td>
                                </tr>
                             </table>
                          </td>
                       </tr>
                       <tr>
                          <td width="100%" style="background: #331c5e; color: #fff; font-size: 18px; padding: 0 40px; font-weight: 300;">
                             <table border="0" cellspacing="0" cellpadding="0" width="100%">
                                <tr>
                                   <td width="100%" height="55px" style="height:55px"></td>
                                </tr>
                                <tr>
                                   <td width="100%">
                                      <p style="margin: 0 0 20px 0; font-size: 18px;">Hello ${username},</p>
                                      <p style="margin: 0 0 20px 0; font-size: 18px;">The password for your Launch My Career account has been successfully reset.</p>
                                   </td>
                                </tr>
                                
                                <tr>
                                   <td width="100%" height="45px" style="height:45px"></td>
                                </tr>
                             </table>
                          </td>
                       </tr>
                       <tr>
                          <td width="100%" cellpadding="0" cellspacing="0" border="0" height="5px" colspan="3" style="width:100%; height:5px; margin: 0px; padding: 0px; border:0px; outline:0px; background-color: #EE2674; background-image: linear-gradient( to right, #FFFF00 -50%, #EE2674 100% ); padding: 0 40px"></td>
                       </tr>
                       <tr style="margin: 0px; padding: 0px; border: 0px; outline: 0px;">
                          <td width="100%" cellpadding="0" cellspacing="0" border="0" style="background: #100726; color: #fff; font-size: 18px; padding: 0 20px; font-weight: 300;">
                             <table border="0" cellspacing="0" cellpadding="0" style="text-align: center;" width="100%">
                                <tr>
                                   <td width="100%" height="25px" style="height:25px"></td>
                                </tr>
                                <tr>
                                   <td width="100%" align="left" valign="top" style="font-size: 15px; color:#9B9B9B">
                                      You received this mandatory email service announcement to update you about important changes to your LaunchMyCareer account.
                                </tr>
                                
                                <tr>
                                   <td width="100%" align="left"style="font-size: 15px" valign="top">
                            <br/>
                                      <p style="color:#9B9B9B; font-size: 15px; text-align: center; padding: 0 0 5px 0">&copy; ${CurrentYear} LaunchMyCareer Pvt. Ltd.</p>
                                      <p style="color:#9B9B9B; font-size: 15px; text-align: center; padding: 0 0 5px 0">B-121, Sector 67, Noida, Uttar Pradesh 201301, India </p>
                                   </td>
                                </tr>
                                <tr>
                                   <td width="100%" height="25px" style="height:10px"></td>
                                </tr>
                             </table>
                          </td>
                       </tr>
                    </table>
                 </td>
              </tr>
           </table>
        </body>
     </html>`;
    return emailTempalte;
}

async function SignUpWithTempPassword(data) {
    const username = data.username;
    const password = data.password;
    let emailTempalte = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
     <html xmlns="http://www.w3.org/1999/xhtml">
        <head>
           <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
           <meta name="viewport" content="width=device-width, initial-scale=1.0">
           <!--[if gte mso 12]><br /> <![endif]--> <!--[if (gte mso 9)|(IE)]> 
           <style type="text/css"> table { border-collapse: collapse; border-spacing: 0; } a{ text-decoration: none; color:#} </style>
           <![endif]--> 
           <title>LaunchMyCareer</title>
           <style type="text/css"> body { padding-top: 0 !important; padding-bottom: 0 !important; padding-top: 0 !important; padding-bottom: 0 !important; margin:0 !important; width: 100% !important; -webkit-text-size-adjust: 100% !important; -ms-text-size-adjust: 100% !important; -webkit-font-smoothing: antialiased !important; font-family: Arial, Helvetica, sans-serif; font-size: 18px; } @media (max-width:640px) { body { font-size: 18px; line-height: 22px; } p { font-size: 18px; line-height: 22px; } table{max-width: 100%; width: 100%;} } *{ margin: 0px; padding: 0px;} </style>
        </head>
        <body paddingwidth="0" paddingheight="0" style="padding-top: 0; text-align: center; padding-bottom: 0; padding-top: 0; padding-bottom: 0; background: #fff; background-repeat: repeat; width: 100% !important; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; -webkit-font-smoothing: antialiased;" offset="0" toppadding="0" leftpadding="0">
           <table width="700" border="0" cellspacing="0" cellpadding="0" class="tableContent bgBody" align="center" valign="top" style='font-family:Arial, Helvetica, sans-serif; margin: auto; max-width: 700px; width:100%; font-weight: 300;'>
              <tr>
                 <td align="center" valign="top" width="100%" cellpadding="0" cellspacing="0">
                    <table border="0" cellspacing="0" cellpadding="0" bgcolor="#f2e5fc" style=" font-weight: 700;" cellspacing="0" cellspacing="0" width="100%">
                       <tr>
                          <td width="100%" cellpadding="0" cellspacing="0" style="background: #f2e5fc; color: #fff; font-weight: 300; font-size: 18px;">
                             <table border="0" cellspacing="0" cellpadding="0" width="100%">
                                <tr>
                                   <td cellpadding="0" cellspacing="0" height="20" style="height:20px"></td>
                                </tr>
                                <tr>
                                   <td cellpadding="0" cellspacing="0" width="100" align="center" valign="top"><img id="u2480_img" class="img" style="width:112px" src="${s3BucketURL}assets/logo/logo.png"></td>
                                </tr>
                                <tr>
                                   <td cellpadding="0" cellspacing="0" height="20" style="height:20px; background: #f2e5fc;"></td>
                                </tr>
                             </table>
                          </td>
                       </tr>
                       <tr>
                          <td width="100%" style="background: #331c5e; color: #fff; font-size: 18px; padding: 0 40px; font-weight: 300;">
                             <table border="0" cellspacing="0" cellpadding="0" width="100%">
                                <tr>
                                   <td width="100%" height="55px" style="height:55px"></td>
                                </tr>
                                <tr>
                                   <td width="100%">
                                      <p style="margin: 0 0 20px 0; font-size: 18px;">Hello ${username},</p>
                                      <p style="margin: 0 0 20px 0; font-size: 18px;">Thanks for signing up and taking the first step on your journey! Your temporary password is:</p>
                                   </td>
                                </tr>
                                <tr><td width="100%"><p style="font-size: 24px; font-weight:700; text-align: left;margin: 25px 0 25px 0px;">${password}</p></td></tr><tr><td width="100%"><p style="margin: 0 0 20px 0; font-size: 18px;">The temporary password is valid only once.</p></td></tr>
                                
                                </tr>
                                <tr>
                                   <td width="100%" height="45px" style="height:45px"></td>
                                </tr>
                             </table>
                          </td>
                       </tr>
                       <tr>
                          <td width="100%" cellpadding="0" cellspacing="0" border="0" height="5px" colspan="3" style="width:100%; height:5px; margin: 0px; padding: 0px; border:0px; outline:0px; background-color: #EE2674; background-image: linear-gradient( to right, #FFFF00 -50%, #EE2674 100% ); padding: 0 40px"></td>
                       </tr>
                       <tr style="margin: 0px; padding: 0px; border: 0px; outline: 0px;">
                          <td width="100%" cellpadding="0" cellspacing="0" border="0" style="background: #100726; color: #fff; font-size: 18px; padding: 0 20px; font-weight: 300;">
                             <table border="0" cellspacing="0" cellpadding="0" style="text-align: center;" width="100%">
                                <tr>
                                   <td width="100%" height="25px" style="height:25px"></td>
                                </tr>
                                <tr>
                                   <td width="100%" align="left" valign="top" style="font-size: 15px; color:#9B9B9B">
                                      You received this mandatory email service announcement to update you about important changes to your LaunchMyCareer account.
                                </tr>
                                
                                <tr>
                                   <td width="100%" align="left"style="font-size: 15px" valign="top">
                            <br/>
                                      <p style="color:#9B9B9B; font-size: 15px; text-align: center; padding: 0 0 5px 0">&copy; ${CurrentYear} LaunchMyCareer Pvt. Ltd.</p>
                                      <p style="color:#9B9B9B; font-size: 15px; text-align: center; padding: 0 0 5px 0">B-121, Sector 67, Noida, Uttar Pradesh 201301, India </p>
                                   </td>
                                </tr>
                                <tr>
                                   <td width="100%" height="25px" style="height:10px"></td>
                                </tr>
                             </table>
                          </td>
                       </tr>
                    </table>
                 </td>
              </tr>
           </table>
        </body>
     </html>`;
    return emailTempalte;
}


async function CSCSignUpWithTempPassword(data) {
    const username = data.username;
    const password = data.password;
    const email = data.email;
    let emailTempalte = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
       <head>
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <!--[if gte mso 12]><br /> <![endif]--> <!--[if (gte mso 9)|(IE)]> 
          <style type="text/css"> table { border-collapse: collapse; border-spacing: 0; } a{ text-decoration: none; color:#} </style>
          <![endif]--> 
          <title>LaunchMyCareer</title>
          <style type="text/css"> body { padding-top: 0 !important; padding-bottom: 0 !important; padding-top: 0 !important; padding-bottom: 0 !important; margin:0 !important; width: 100% !important; -webkit-text-size-adjust: 100% !important; -ms-text-size-adjust: 100% !important; -webkit-font-smoothing: antialiased !important; font-family: Arial, Helvetica, sans-serif; font-size: 18px; } 
          @media (max-width:640px) { body { font-size: 18px; line-height: 22px; } p { font-size: 18px; line-height: 22px; } table{max-width: 100%; width: 100%;} .fullwdthin{width: 100%!important;} } 
          *{ margin: 0px; padding: 0px;} 
    
         </style>
       </head>
       <body paddingwidth="0" paddingheight="0" style="padding-top: 0; text-align: center; padding-bottom: 0; padding-top: 0; padding-bottom: 0; background: #fff; background-repeat: repeat; width: 100% !important; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; -webkit-font-smoothing: antialiased;" offset="0" toppadding="0" leftpadding="0">
          <table width="700" border="0" cellspacing="0" cellpadding="0" class="tableContent bgBody" align="center" valign="top" style='font-family:Arial, Helvetica, sans-serif; margin: auto; max-width: 700px; width:100%; font-weight: 300;'>
             <tr>
                <td align="center" valign="top" width="100%" cellpadding="0" cellspacing="0">
                   <table border="0" cellspacing="0" cellpadding="0" bgcolor="#f2e5fc" style=" font-weight: 700;" cellspacing="0" cellspacing="0" width="100%">
                      <tr>
                         <td width="100%" cellpadding="0" cellspacing="0" style="background: #f2e5fc; color: #fff; font-weight: 300; font-size: 18px;">
                            <table border="0" cellspacing="0" cellpadding="0" width="100%">
                               <tr>
                                  <td cellpadding="0" cellspacing="0" height="20" style="height:20px"></td>
                               </tr>
                               <tr>
                                  <td cellpadding="0" cellspacing="0" width="100" align="center" valign="top"><img id="u2480_img" class="img" style="width:112px; margin-right: 15px;" src="${s3BucketURL}assets/logo/logo.png"><img id="u2480_img" class="img" style="width:112px; margin-left:15px;" src="${s3BucketURL}entity/media/csc_logo.png"></td>
                               </tr>
                               <tr>
                                  <td cellpadding="0" cellspacing="0" height="20" style="height:20px; background: #f2e5fc;"></td>
                               </tr>
                            </table>
                         </td>
                      </tr>
                      <tr>
                         <td width="100%" style="background: #331c5e; color: #fff; font-size: 18px; padding: 0 20px; font-weight: 300;">
                            <table border="0" cellspacing="0" cellpadding="0" width="100%">
                               <tr>
                                  <td width="100%" height="55px" style="height:55px"></td>
                               </tr>
                               <tr>
                                  <td width="100%">
                                     <p style="margin: 0 0 20px 0; font-size: 18px;">Hello ${username},</p>
                                     <p style="margin: 0 0 20px 0; font-size: 18px;">Thanks for signing up and taking the first step towards your career journey.</p>
                                  </td>
                               </tr>
                               <tr>
                                  <td width="100%">
                                     <p style="margin: 0 0 20px 0; font-size: 18px;">Username: ${email}</p>
                                     <p style="margin: 0 0 20px 0; font-size: 18px;">Temporary password is (valid for first time login): ${password}</p>
                                  </td>
                               </tr>
                               <tr>
                                  <td width="100%">
                                     <p style="margin: 0 0 20px 0; font-size: 18px;">Kindly visit <a style="color:#FF732E; font-weight: 700;" href="https://csc.launchmycareer.com" target="_blank">csc.launchmycareer.com</a> to access your subscription.</p>
                                     <p style="margin: 0 0 20px 0; font-size: 18px;">Note: In case of any assistance required, kindly contact us at  <a style="color:#FF732E; font-weight: 700;" href="mailto:careerguidance@cscacademy.org">careerguidance@cscacademy.org</a></p>
                                  </td>
                               </tr>
 
                               <tr>
                                  <td width="100%" height="25px" style="height:25px"></td>
                               </tr>
                            </table>
                         </td>
                      </tr>
 
                      <tr style="margin: 0px; padding: 0px; border: 0px; outline: 0px;">
                         <td width="100%" cellpadding="0" cellspacing="0" border="0" style="background: #331c5e; color: #fff; font-size: 18px; padding: 0 20px; font-weight: 300;">
                            <table border="0" cellspacing="0" cellpadding="0" style="text-align: center;" width="100%">
                               <tr>
                                  <td width="10%" valign="top" align="left" style="border-bottom: 1px solid #522f94;font-size: 15px;padding: 0px 10px 0 0;">Part 1</td>
                                  <td class="fullwdthin" width="90%" align="left" style=" font-size: 15px; padding:0 0 15px 0px; border-bottom: 1px solid #522f94;" valign="top">                         
                                     <h3 class="h3class" style="margin: 0px; padding: 0px 0 5px 0; color:#2398b9; font-size: 15px;"> How to sign up on <a style="color:#FF732E; font-weight: 400;" href="https://csc.launchmycareer.com" target="_blank">csc.launchmycareer.com</a></h3>
                                    
                                     <p style="margin:0px; padding: 0 0 0 0; font-size: 14px; list-style: none; width:100%;"><a style="color:#FF732E; font-weight: 700;" href="https://youtu.be/xzJBmJo5UkI" target="_blank">English</a> 
                                         <a style="color:#FF732E; font-weight: 700; display: inline-block; text-align: right; margin-left: 10px;" href="https://youtu.be/PY7On55dYi0" target="_blank">Hindi</a></p>
                                  </td>
                                 </tr>
                                 <tr>
                                  <td width="10%" valign="top" align="left" style="border-bottom: 1px solid #522f94;font-size: 15px;padding: 20px 10px 0 0; ">Part 2</td>                                
                                  <td class="fullwdthin"  width="95%"  align="left" style="font-size: 15px; border-bottom: 1px solid #522f94; padding:20px 0 15px 0px;" valign="top">                          
                                     <h3 class="h3class" style="margin: 0px; padding: 0px 0 5px 0; color:#2398b9; font-size: 15px"> How to take Personality Quiz</h3>
                                    
                                     <p style="margin:0px; padding: 0 0 0 0; font-size: 14px; list-style: none; width:100%;"><a style="color:#FF732E; font-weight: 700;" href="https://youtu.be/YTiIFgWE-M8" target="_blank">English</a> <a style="color:#FF732E; font-weight: 700; margin-left: 10px;" href="https://youtu.be/qyyvF-szLX0" target="_blank">Hindi</a></p>
                                  </td>
                                 
                               </tr>
                                <tr>
                                  <td width="10%" valign="top" align="left" style="border-bottom: 1px solid #522f94;font-size: 15px; padding: 20px 10px 0 0; ">Part 3</td>                                
                                  <td class="fullwdthin"  width="95%" align="left" style=" font-size: 15px;  padding:20px 0 15px 0px; border-bottom: 1px solid #522f94;" valign="top">                          
                                     <h3 class="h3class" style="margin: 0px; padding: 0px 0 5px 0; color:#2398b9; font-size: 15px; "> How to attempt the section 'Interest and skills'</h3>
                                    
                                     <p style="margin:0px; padding: 0 0 0 0; font-size: 14px; list-style: none; width:100%;"><a style="color:#FF732E; font-weight: 700;" href="https://youtu.be/ppdfT2eNeTU" target="_blank">English</a> <a style="color:#FF732E; font-weight: 700; margin-left: 10px;" href="https://youtu.be/R0lGwgOW0Rw" target="_blank">Hindi</a></p>
                                  </td>
                               </tr>
                               <tr>
                                  <td width="10%" valign="top" align="left" style="border-bottom: 1px solid #522f94; padding: 20px 10px 0 0; font-size: 15px;">Part 4</td>                                
                                  <td class="fullwdthin"  width="95%" align="left" style="font-size: 15px; border-bottom: 1px solid #522f94; padding:20px 0 15px 0px;" valign="top">                          
                                    <h3 class="h3class" style="margin: 0px; padding: 0px 0 5px 0; color:#2398b9; font-size: 15px;">How to attempt the section '3H (Head, Heart, Hand)'</h3>                                  
                                    <p style="margin:0px; padding: 0 0 0 0; font-size: 14px; list-style: none; width:100%;"><a style="color:#FF732E; font-weight: 700;" href="https://youtu.be/T0W-1Pl9azU" target="_blank">English</a> <a style="color:#FF732E; font-weight: 700; margin-left: 10px;" href="https://youtu.be/mzpluLrcrRM" target="_blank">Hindi</a></p>
                                 </td>                              
                              </tr> 
                            <tr>
                               <td width="10%" valign="top" align="left" style=" padding: 20px 10px 0 0; font-size: 15px; border-bottom: 2px solid #522f94;">Part 5</td>                                
                               <td class="fullwdthin"  width="95%"  align="left" style="font-size: 15px; padding:20px 0 15px 0px; border-bottom: 2px solid #522f94;" valign="top">                          
                               <h3 class="h3class" style="margin: 0px; padding: 0px 0 5px 0; color:#2398b9; font-size: 15px;">Understanding Career Explorer </h3>
                               
                               <p style=" margin:0px; padding: 0 0 0 0; font-size: 14px; list-style: none; width:100%;"><a style="color:#FF732E; font-weight: 700;" href="https://youtu.be/Mwh8JJa8a7E" target="_blank">English</a> <a style="color:#FF732E; font-weight: 700; margin-left: 10px;" href="https://youtu.be/tma1ykbZHcY" target="_blank">Hindi</a></p>
                            </td>
                            
                         </tr> 
                              
                            </table>
                         </td>
                      </tr>
 
                      <tr style="margin: 0px; padding:0; border: 0px; outline: 0px;">
                         <td width="100%" cellpadding="0" cellspacing="0" border="0" style="background: #331c5e; color: #fff; font-size: 18px; padding: 0 20px; font-weight: 300;">
                            <table border="0" cellspacing="0" cellpadding="0" style="text-align: center;" width="100%">
                               <tr>
                                  <td width="100%" align="left" style="font-size: 15px; " valign="top">                          
                                     <p style="margin: 20px 0 20px 0; padding:20px 0 0 0; font-size: 18px;">Regards</p>
                                     <p style="margin: 20px 0 20px 0; padding-bottom: 20px; font-size: 18px;">LMC Team</p>
                                  </td>                                
                               </tr>
                              
                            </table>
                         </td>
                      </tr>
 
 
                      <tr>
                         <td width="100%" cellpadding="0" cellspacing="0" border="0" height="5px" colspan="3" style="width:100%; height:5px; margin: 0px; padding: 0px; border:0px; outline:0px; background-color: #EE2674; background-image: linear-gradient( to right, #FFFF00 -50%, #EE2674 100% ); padding: 0 40px"></td>
                      </tr>
                      <tr style="margin: 0px; padding: 0px; border: 0px; outline: 0px;">
                         <td width="100%" cellpadding="0" cellspacing="0" border="0" style="background: #100726; color: #fff; font-size: 18px; padding: 0 20px; font-weight: 300;">
                            <table border="0" cellspacing="0" cellpadding="0" style="text-align: center;" width="100%">
                               <tr>
                                  <td width="100%" height="25px" style="height:25px"></td>
                               </tr>
                               <tr>
                                  <td width="100%" align="left" valign="top" style="font-size: 15px; color:#9B9B9B">
                                     You received this mandatory email service announcement to update you about important changes to your LaunchMyCareer account.
                               </tr>
                               
                               <tr>
                                  <td width="100%" align="left"style="font-size: 15px" valign="top">
                           <br/>
                                     <p style="color:#9B9B9B; font-size: 15px; text-align: center; padding: 0 0 5px 0">&copy; ${CurrentYear} LaunchMyCareer Pvt. Ltd.</p>
                                     <p style="color:#9B9B9B; font-size: 15px; text-align: center; padding: 0 0 5px 0">B-121, Sector 67, Noida, Uttar Pradesh 201301, India </p>
                                  </td>
                               </tr>
                               <tr>
                                  <td width="100%" height="25px" style="height:10px"></td>
                               </tr>
                            </table>
                         </td>
                      </tr>
                   </table>
                </td>
             </tr>
          </table>
       </body>
    </html>`;
    return emailTempalte;
}