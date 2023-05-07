import { getSession } from "next-auth/react";

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).send("Signin required.");
    }
    const clientId = process.env.PAYPAL_CLIENT_ID || "sb";
    res.send(clientId);
    };

export default handler;
