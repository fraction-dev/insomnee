import { toLower, upperFirst } from 'lodash'
import { ExternalLinkIcon } from 'lucide-react'
import Link from 'next/link'

import { Button } from '~/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card'
import { Hint } from '~/components/ui/hint'
import { Separator } from '~/components/ui/separator'
import { cn } from '~/lib/shared/utils'
import { LeadsGenerationAgentRun } from '~/services/leads-generation/model'

export const RunContent = ({ run }: { run: LeadsGenerationAgentRun | null }) => {
    if (!run) return null

    const confidence = run.newsArticles?.[0]?.evaluation?.matches?.[0]?.confidence

    const getConfidenceLevelColor = () => {
        if (confidence === 'HIGH') return 'bg-red-500'
        if (confidence === 'MEDIUM') return 'bg-amber-500'
        if (confidence === 'LOW') return 'bg-rose-500'
        return 'bg-neutral-500'
    }

    return (
        <div className="flex flex-col gap-4">
            {run.newsArticles?.map((article, index) => (
                <Card key={index}>
                    <CardContent className="flex flex-col gap-4">
                        <div className="flex items-center justify-between gap-12">
                            <p className="text-muted-foreground dark:text-white font-mono text-xs">
                                {article.evaluation.metadata.category}
                            </p>

                            <div className="flex items-center gap-1 bg-neutral-100 px-2 py-1 rounded-sm">
                                <div className={cn(getConfidenceLevelColor(), 'size-1.5 rounded-full')} />
                                <p className="text-[11px] font-medium text-neutral-800">{upperFirst(toLower(confidence))} confidence</p>
                            </div>
                        </div>

                        <Separator />

                        <CardHeader className="max-w-lg p-0">
                            <CardTitle className="text-base text-neutral-800 dark:text-white">{article.title ?? 'N/A'}</CardTitle>
                            <CardDescription className="text-sm text-muted-foreground leading-relaxed">
                                {article.snippet ?? 'N/A'}
                            </CardDescription>
                        </CardHeader>

                        <Separator />

                        {article?.evaluation?.matches.map((match, index) => (
                            <div key={`evaluation-${index}`} className="flex flex-col gap-4">
                                {match.evidence.map((evidence, index) => (
                                    <div key={`evidence-${index}`} className="flex flex-col gap-2">
                                        <div className="p-4 bg-neutral-100 dark:bg-neutral-800 rounded-sm">
                                            <blockquote className="border-l-2 border-neutral-400 dark:border-neutral-600 pl-3 italic text-neutral-700 dark:text-white text-sm">
                                                {evidence.quote}
                                            </blockquote>
                                        </div>

                                        <div className="flex justify-end">
                                            <p className="text-xs text-muted-foreground max-w-sm text-right">{evidence.opportunities}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}

                        <Separator />

                        <div className="flex justify-between items-start gap-12">
                            <ul className="text-muted-foreground text-xs flex flex-col gap-1">
                                <li>
                                    Search provider: <span className="font-medium">{article.searchContext.provider}</span>
                                </li>
                                <li>
                                    Region: <span className="font-medium">{article.evaluation.metadata.region}</span>
                                </li>
                                <li>
                                    Search keywords: <span className="font-medium">{article.searchContext.searchKeywords.join(', ')}</span>
                                </li>
                            </ul>

                            <Hint content="View original article">
                                <Link href={article.url} target="_blank">
                                    <Button size="icon" variant="ghost">
                                        <ExternalLinkIcon className="size-4 text-muted-foreground" />
                                    </Button>
                                </Link>
                            </Hint>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
