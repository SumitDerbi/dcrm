import { useBranding } from '@/lib/branding-context'

export function AuthLayout({ children }: { children: React.ReactNode }) {
    const { companyName, logoUrl, tagline } = useBranding()

    return (
        <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4 py-8">
            <div className="w-full max-w-md">
                {/* Branding */}
                <div className="mb-6 flex flex-col items-center gap-2 text-center">
                    <img
                        src={logoUrl}
                        alt={companyName}
                        className="h-12 w-12 rounded-lg"
                        onError={(e) => {
                            ; (e.target as HTMLImageElement).style.display = 'none'
                        }}
                    />
                    <h1 className="text-2xl font-bold tracking-tight">{companyName}</h1>
                    {tagline && (
                        <p className="text-sm text-muted-foreground">{tagline}</p>
                    )}
                </div>

                {children}
            </div>
        </div>
    )
}
