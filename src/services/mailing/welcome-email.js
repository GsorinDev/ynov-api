import transporter from '#config/mailer.js'

export function sendWelcomeEmail (user,token) {
    if(!user || !token) throw new Error("User or validation token missing")

    const messageToUser = {
        from: process.env.EMAIL_SENDER,
        to:user.email,
        subject: "Welcome to your todo app",
        html: `<h1>Welcome to our wonderful todo</h1><span>mail : <span style='color:#f59b00'>${user.email}</span></span><br><span>token : <span style='color:#f59b00'>${token}</span></span>`
    }
    return transporter.sendMail(messageToUser)
}

export function sendRescuAccount(email, code) {
    const messageToUser = {
        from: process.env.EMAIL_SENDER,
        to:email,
        subject: "Welcome to your todo app",
        html: `<h1>Welcome to our wonderful todo</h1><span>mail : <span style='color:#f59b00'>${email}</span></span><br><span>code : <span style='color:#f59b00'>${code}</span></span>`
    }
    return transporter.sendMail(messageToUser)
}