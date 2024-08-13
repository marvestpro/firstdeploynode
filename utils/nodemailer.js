const mailer = require('nodemailer')

const useremail = async(email, firstname) =>{

    const messageTemaplate =`
    <div>
    <h2>Welcome message</h2>
    <ul>
    <li>Name: ${firstname}</li>
    <li>EMAIL: ${email}</li>
    </ul>
    <div>
    <p>Dear  ${firstname}, </p>
    <p> Welcome to Marvestpro Nigeria Limited </p>
    </div>
    </div>
    `;


   const transporter =  mailer.createTransport({
        service:"gmail",
        auth:{
            user:process.env.USER_EMAIL,
            pass:process.env.USER_PASS
        }
    })

    const mailOptions = {
        from:process.env.USER_EMAIL,
        to:email,
        subject:"welcome message",
        html:messageTemaplate
    }

    try {
     const setemail =  await transporter.sendMail(mailOptions)
     if (setemail) {
        console.log("mail sent successful");
     }
    } catch (error) {
        throw{
            errorname:"Mailerror",
            message:error.message
        }
    }

}

module.exports = {useremail}