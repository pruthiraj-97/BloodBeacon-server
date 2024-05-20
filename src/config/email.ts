import nodemailer from 'nodemailer'
let transporter=nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth:{
        user:process.env.MAIL_USER,
        pass:process.env.MAIL_PASS
    }
})
export async function sendEmail(email:string,name:string,otp:number){
    try {
        const info=await transporter.sendMail({
            from:process.env.MAIL_USER,
            to:email,
            subject:'test',
            text:'this is test mail'
        })
        console.log(info)
    } catch (error) {
        console.log(error)
    }
    
}
