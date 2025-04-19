import { Card, CardContent } from '../ui/card'

export const WebcardTotalClicksCard = () => {
    return (
        <Card className="py-12">
            <CardContent className="flex flex-col gap-2">
                <h2 className="text-4xl font-semibold font-mono">100</h2>
                <div className="gap-2 flex flex-col">
                    <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold">Total clicks</h3>
                    </div>
                    <p className="text-[12px] text-muted-foreground/80 leading-relaxed">
                        Summary of total clicks starting from the creation of your webcard (10.04.2025)
                    </p>
                </div>
            </CardContent>
        </Card>
    )
}
