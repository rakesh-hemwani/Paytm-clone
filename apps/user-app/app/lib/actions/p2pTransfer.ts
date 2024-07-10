"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";
import { timeStamp } from "console";

export async function p2pTransfer(to: string, amount: number) {
    console.log("server reached")
    const session = await getServerSession(authOptions);
    const from = session?.user?.id;
    if (!from) {
        return {
            message: "Error while sending"
        }
    }
    const toUser = await prisma.user.findFirst({
        
        where: {
            number: to
        }
    });
    
    if (!toUser) {
        return {
            message: "User not found"
        }
    }
    try{
        await prisma.$transaction(async (tx) => {
            await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(from)} FOR UPDATE`;
            const fromBalance = await tx.balance.findUnique({
                where: { userId: Number(from) },
            });
            if (!fromBalance || fromBalance.amount < amount) {
                throw new Error('Insufficient funds');
            }
            console.log("s3333")
            console.log(from)
            await tx.balance.update({
                where: { userId: Number(from) },
                data: { amount: { decrement: amount } },
            });

            await tx.balance.update({
                where: { userId: toUser.id },
                data: { amount: { increment: amount } },
            });

            await tx.p2pTransfer.create({
                data : {
                    fromUserId : Number(from),
                    toUserId : toUser.id,
                    amount : Number(amount),
                    timestamp : new Date()
                }
            })
        });
        console.log("send success");
    }catch(e){
        console.log(e);
    }
}