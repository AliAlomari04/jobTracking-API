import nodemailer from 'nodemailer'


export const sendEmail = async (options) => {
    try {
        const transporter  = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT ,
            secure:false,
            auth:{
                user:process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            },
        })
       await  transporter.sendMail({
            from:`"Job tracker API " <${process.env.EMAIL_USER}>`,
            to: options.email ,
            subject: options.subject ,
            html: options.html
        })
    } catch (error) {
        console.log(error.message);
    }
}