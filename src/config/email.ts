import { resend } from "../utils/resend";
export async function sendEmail(email:string,name:string,otp:number) {
  const result=await resend.emails.send({
    from:process.env.EMAIL_FROM!,
    to: [email],
    subject: "verify your email",
    html: `<strong>hello ${name}!
           Your email verification OTP is ${otp},
           start connecting with us
          </strong>`,
  })
  return result
}