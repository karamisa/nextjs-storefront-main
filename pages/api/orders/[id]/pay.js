import Order from "@/models/Order";
import { default as db } from "@/utils/db";
import { getSession } from "next-auth/react";


const handler = async (req, res) => {
    const session = await getSession({ req })
    if (!session) {
        return res.status(401).send('Error: Sign in required');
    }

    await db.connect();
    const order = await Order.findById(req.query.id);
    if (order) {
        if (order.isPaid) {
            return res.status(400).send('Error: Order already paid');
        }
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            email_address: req.body.payer.email_address,
        };
        const paidOrder = await order.save();
        await db.disconnect();
        res.send({ message: 'Order Paid', order: paidOrder });
    } else {
        await db.disconnect();
        res.status(404).send('Error: Order Not Found');
    }
}

export default handler;