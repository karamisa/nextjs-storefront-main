import Order from "@/models/Order";
import db from "@/utils/db";
import { getSession } from "next-auth/react";

const handler = async (req, res) => {
    const session = await getSession({ req });
    console.log("session", session)
    if (!session) {
        console.log("No session found")
        return res.status(401).send({ message: 'Signin Required' });
    }
    const { user } = session;
    console.log("user", user)
    await db.connect();
    const newOrder = new Order({
        ...req.body,
        user: user._id,
    });

    const order = await newOrder.save();
    res.status(201).send(order);
};

export default handler;

