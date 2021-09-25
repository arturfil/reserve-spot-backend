const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const googleVerify = async () => {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID
  });
  const {name, picture, email} = ticket.getPayload();
  console.log(payload);

  return {
    name, 
    picture,
    email
  }

}

module.exports = {
  googleVerify
}