const sgMail= require('@sendgrid/mail')

const sendgridAPIKey =(process.env.SENDGRID_API_KEY)

sgMail.setApiKey(sendgridAPIKey)

const sendWelcomeEmail =(email,name)=>{
    sgMail.send({
        to: email,
        from:'averotravels@gmail.com',
        subject:' Thanks for joining in!',
        text:`Welcome to the app, ${name}. Let me know you get along with the app.`,
    })
}

const sendCacelationEmail = (email,name)=>{
    sgMail.send({
        to: email,
        from:'averotravels@gmail.com',
        subject:'Bye bye, see you',
        text:  `${name} why you go ?. I  hope you back `
    })
}


module.exports ={
    sendWelcomeEmail,
    sendCacelationEmail
}