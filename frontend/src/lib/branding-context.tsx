import { createContext, useContext, useEffect, type ReactNode } from 'react'

export interface BrandingData {
    companyName: string
    logoUrl: string
    favicon: string
    primaryColor: string
    secondaryColor: string
    tagline: string
}

const defaultBranding: BrandingData = {
    companyName: 'DCRM',
    logoUrl: '/logo.svg',
    favicon: '/favicon.ico',
    primaryColor: '#2563eb', // blue-600
    secondaryColor: '#7c3aed', // violet-600
    tagline: 'Debt Assistance CRM',
}

const BrandingContext = createContext<BrandingData>(defaultBranding)

function hexToOklch(hex: string): string {
    // Convert hex to RGB
    const r = parseInt(hex.slice(1, 3), 16) / 255
    const g = parseInt(hex.slice(3, 5), 16) / 255
    const b = parseInt(hex.slice(5, 7), 16) / 255

    // Linear RGB
    const toLinear = (c: number) => (c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4))
    const rl = toLinear(r)
    const gl = toLinear(g)
    const bl = toLinear(b)

    // RGB to OKLab via LMS
    const l_ = Math.cbrt(0.4122214708 * rl + 0.5363325363 * gl + 0.0514459929 * bl)
    const m_ = Math.cbrt(0.2119034982 * rl + 0.6806995451 * gl + 0.1073969566 * bl)
    const s_ = Math.cbrt(0.0883024619 * rl + 0.2817188376 * gl + 0.6299787005 * bl)

    const L = 0.2104542553 * l_ + 0.7936177850 * m_ - 0.0040720468 * s_
    const a = 1.9779984951 * l_ - 2.4285922050 * m_ + 0.4505937099 * s_
    const bOk = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.8086757660 * s_

    const C = Math.sqrt(a * a + bOk * bOk)
    const h = (Math.atan2(bOk, a) * 180) / Math.PI
    const hue = h < 0 ? h + 360 : h

    return `oklch(${L.toFixed(3)} ${C.toFixed(3)} ${hue.toFixed(3)})`
}

export function BrandingProvider({ children }: { children: ReactNode }) {
    const branding = defaultBranding

    useEffect(() => {
        const root = document.documentElement

        // Set dynamic CSS variables from branding colors
        const primary = hexToOklch(branding.primaryColor)
        const secondary = hexToOklch(branding.secondaryColor)

        root.style.setProperty('--primary', primary)
        root.style.setProperty('--secondary', secondary)
        // Compute a light foreground for primary buttons
        root.style.setProperty('--primary-foreground', 'oklch(0.985 0 0)')
        root.style.setProperty('--secondary-foreground', 'oklch(0.985 0 0)')

        // Sidebar primary follows branding
        root.style.setProperty('--sidebar-primary', primary)
        root.style.setProperty('--sidebar-primary-foreground', 'oklch(0.985 0 0)')

        // Update favicon
        const link = document.querySelector<HTMLLinkElement>("link[rel*='icon']")
        if (link) {
            link.href = branding.favicon
        }

        document.title = branding.companyName
    }, [branding])

    return (
        <BrandingContext.Provider value={branding}>
            {children}
        </BrandingContext.Provider>
    )
}

export function useBranding() {
    return useContext(BrandingContext)
}
