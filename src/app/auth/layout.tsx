import { AuthNavbar } from '~/components/Auth/AuthNavbar'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen py-12">
            <AuthNavbar />
            <div className="flex flex-col max-w-sm mx-auto h-[calc(100vh-12rem)] justify-center py-24">{children}</div>
        </div>
    )
}
