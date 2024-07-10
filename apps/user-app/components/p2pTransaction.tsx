import { Card } from "@repo/ui/card"
import { getServerSession } from "next-auth";
import { authOptions } from "../app/lib/auth";

const session = await getServerSession(authOptions);

export const P2pTransactions = ({
    transactions
}: {
    transactions: {
        time: Date,
        amount: number,
        to: number,
        from : number
    }[]
}) => {
    if (!transactions.length) {
        return <Card title="Recent Transactions">
            <div className="text-center pb-8 pt-8">
                No Recent transactions
            </div>
        </Card>
    }
    return <Card title="Recent Transactions">
        <div className="pt-2">
            {transactions.map(t => <div>
            <div className="flex justify-between">
                <div>
                    <div className="text-sm">
                                    {t.to === Number(session?.user?.id) ? 'Credited INR' : 'Debited INR'}
                        </div>
                    <div className="text-slate-600 text-xs">
                        {t.time.toDateString()}
                    </div>
                </div>
                <div>
                    <div className="flex flex-col justify-center">
                        {t.to=== Number(session?.user?.id) ? "+" : "-"} Rs {t.amount / 100}
                    </div>
                    {
                        t.to === Number(session?.user?.id)  ?
                        <div className="text-slate-600 text-xs text-end">
                            from  {t.from.toString()}
                        </div>
                        :   
                        <div>
                             to  {t.to.toString()}
                        </div>
                    }
                </div>

                </div>
                <hr className="border-t border-slate-200 my-2" /> {/* Horizontal line with margin top and bottom */}
            </div>)}
        </div>
    </Card>
}