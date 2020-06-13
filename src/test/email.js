const nodemailer = require('nodemailer')
const senha = 2233213
const email = "hcofragmovie@gmail.com"

let remetente = nodemailer.createTransport({
    service: 'gmail',
    auth:{
      user: 'hcofragmovie@gmail.com',
      pass: 'rhalf4561' 
    }
  });

  remetente.sendMail({
    from: "Web Paralisia <hcofragmovie@gmail.com>",
    to: `${ email }`,
    subject: "Senha temporária",
    text: `Sua senha foi alterada para ${ senha }`
  })
  .then(message => {
    console.log(message)
  })
  .catch(error => console.log(error))