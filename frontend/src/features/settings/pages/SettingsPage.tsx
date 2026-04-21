import { useState } from 'react'
import { Bell, Building2, Save, ShieldCheck } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

export default function SettingsPage() {
    const [companyName, setCompanyName] = useState('DCRM Services')
    const [supportEmail, setSupportEmail] = useState('support@dcrm.example')
    const [reminderEnabled, setReminderEnabled] = useState(true)
    const [portalAlertsEnabled, setPortalAlertsEnabled] = useState(true)

    function handleSave() {
        console.log('Save settings:', {
            companyName,
            supportEmail,
            reminderEnabled,
            portalAlertsEnabled,
        })
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Settings</h1>
                    <p className="mt-1 text-sm text-muted-foreground">Manage workspace branding, notifications, and portal defaults</p>
                </div>
                <Badge variant="outline">Phase 0 Ready</Badge>
            </div>

            <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-base"><Building2 className="size-4" /> Workspace Profile</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-1.5">
                            <Label htmlFor="company-name">Company name</Label>
                            <Input id="company-name" value={companyName} onChange={(event) => setCompanyName(event.target.value)} />
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="support-email">Support email</Label>
                            <Input id="support-email" type="email" value={supportEmail} onChange={(event) => setSupportEmail(event.target.value)} />
                        </div>
                        <Separator />
                        <div className="grid gap-3 sm:grid-cols-2">
                            <div className="rounded-lg border p-4">
                                <p className="text-sm font-medium">Portal branding</p>
                                <p className="mt-1 text-sm text-muted-foreground">Logo, company title, and tagline are already wired through the shared branding context.</p>
                            </div>
                            <div className="rounded-lg border p-4">
                                <p className="text-sm font-medium">Operational defaults</p>
                                <p className="mt-1 text-sm text-muted-foreground">Notification toggles below control the default mock behavior for reminders and customer portal alerts.</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-base"><Bell className="size-4" /> Notifications</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <label className="flex items-start gap-3 rounded-lg border p-4">
                            <Checkbox checked={reminderEnabled} onCheckedChange={(checked) => setReminderEnabled(Boolean(checked))} />
                            <span className="space-y-1">
                                <span className="block text-sm font-medium">Task reminders</span>
                                <span className="block text-sm text-muted-foreground">Enable dashboard reminders for overdue and due-today activities.</span>
                            </span>
                        </label>
                        <label className="flex items-start gap-3 rounded-lg border p-4">
                            <Checkbox checked={portalAlertsEnabled} onCheckedChange={(checked) => setPortalAlertsEnabled(Boolean(checked))} />
                            <span className="space-y-1">
                                <span className="block text-sm font-medium">Portal notifications</span>
                                <span className="block text-sm text-muted-foreground">Allow customer-facing case, document, and payment alerts in the portal.</span>
                            </span>
                        </label>
                        <div className="rounded-lg bg-muted p-4 text-sm text-muted-foreground">
                            <div className="mb-2 flex items-center gap-2 font-medium text-foreground"><ShieldCheck className="size-4" /> Access model</div>
                            Settings remain local mock state in Phase 0. Backend persistence can be attached in the next implementation phase without changing this screen structure.
                        </div>
                        <Button className="w-full gap-2" onClick={handleSave}><Save className="size-4" /> Save Settings</Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
