if (process.env.NODE_ENV === 'development'){
    const startMailDev = async () => {
        const { default: Maildev} = await import('maildev')
        const maildev = new Maildev({
            basePathName: 'maildev'
        })
        maildev.listen((err,data) => {
            if(err) return console.log(`Failed to load maildev: ${e}`)
            return console.log("maildev server listenung check inbox at http://localhost:1080/maildev")
        })
    }
    startMailDev()
}