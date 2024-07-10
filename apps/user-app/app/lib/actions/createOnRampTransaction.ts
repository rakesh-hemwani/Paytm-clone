"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function createOnRampTransaction(amount : number, provider : string){
    const session = await getServerSession(authOptions);
    const token = Math.random().toString();
    const userId = session.user.id;
    if(!userId) 
        return {
         message : "Usser Not Logged in"
        }
        console.log("reach check");
    try{ 
        await prisma.onRampTransaction.create({
        data:{
            userId : Number(userId),
            amount : amount,
            status : "Processing",
            startTime : new Date(),
            provider,
            token : token
        }
    })
   console.log("...suxx");

}catch(e){
        console.log(e + " transcation failed")
    }

    return {
        message : " On Ramp Transcation added"
    }
}