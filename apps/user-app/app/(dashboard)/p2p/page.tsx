import { getServerSession } from "next-auth";
import { SendCard } from "../../../components/SendCard";
import { P2pTransactions } from "../../../components/p2pTransaction";
import prisma from "@repo/db/client";
import { authOptions } from "../../lib/auth";

async function getOnp2pTransaction() {
    const session = await getServerSession(authOptions);
    const txns = await prisma.p2pTransfer.findMany({
        where: {
            OR: [
                { fromUserId: Number(session?.user?.id) },
                { toUserId: Number(session?.user?.id) }
            ]
        }
    });
    return txns.map(t => ({
        time: t.timestamp,
        amount: Number(t.amount),
        to: Number(t.toUserId),
        from : Number(t.fromUserId)
    }))
}
export default async function(){
    const transactions = await getOnp2pTransaction();
    return <div className="w-screen">
    <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
        Transfer
    </div>
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
        <div>
            <SendCard/>
        </div>
        <div>
            <div className="pt-4">
                <P2pTransactions transactions={transactions} />
            </div>
        </div>
    </div>
</div>
}