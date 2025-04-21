import { PropsWithChildren, ReactNode } from 'react'

export function WithAuth(PageComponent: (props: PropsWithChildren) => ReactNode) {
    return async function AuthPageWrapper({ children }: PropsWithChildren) {
        return <PageComponent>{children}</PageComponent>
    }
}
