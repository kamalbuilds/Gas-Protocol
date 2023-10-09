import useMemoizedAmountLabel from "@/hooks/useMemoizedAmountLabel"


type AmountLabelType = {
    amount: string
    tokenSymbol: string
    decimalsDisplayed?: number
}

function AmountLabel({ amount, tokenSymbol, decimalsDisplayed }: AmountLabelType) {
    const amountLabel = useMemoizedAmountLabel(amount, tokenSymbol, decimalsDisplayed)

    return (
        <div className="bg-[#1B2A22] text-white w-fit py-1 px-2 rounded-md" title={`${amount} ${tokenSymbol}`}>
            <span>{amountLabel}</span>
        </div>
    )
}

export default AmountLabel
