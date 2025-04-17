import { PropsWithChildren } from 'react'

export function WithAuth(PageComponent: (props: PropsWithChildren) => React.ReactNode) {
    return async function AuthPageWrapper({ children }: PropsWithChildren) {
        return <PageComponent>{children}</PageComponent>
    }
}
