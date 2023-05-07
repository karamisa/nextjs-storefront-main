import {getToken} from 'next-auth/jwt';

const handler = async (req, res) => {
  const user = await getToken({ req });
  if (!user) {
    return res.status(401).send("Signin required.");
    }
    const clientId = process.env.PAYPAL_CLIENT_ID || "sb";
    res.send(clientId);
    };

export default handler;
