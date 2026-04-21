import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/lib/query-client'
import { BrandingProvider } from '@/lib/branding-context'
import { TooltipProvider } from '@/components/ui/tooltip'
import AppRouter from '@/lib/router'

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <BrandingProvider>
                <TooltipProvider>
                    <AppRouter />
                </TooltipProvider>
            </BrandingProvider>
        </QueryClientProvider>
    )
}

export default App
