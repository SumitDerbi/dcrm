import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Eye, Plus } from 'lucide-react'
import { Button, buttonVariants } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { channelColors, messageChannels, mockTemplates, renderTemplate, type CommunicationTemplate, type MessageChannel } from '../data/mock-communications'

const sampleValues = {
    customer_name: 'Rajesh Khanna',
    case_number: 'CASE-045',
}

export default function TemplateListPage() {
    const [templates, setTemplates] = useState(mockTemplates)
    const [open, setOpen] = useState(false)
    const [draft, setDraft] = useState<CommunicationTemplate>({
        id: 0,
        name: '',
        channel: 'SMS',
        subject: '',
        body: '',
        isActive: true,
    })

    const preview = useMemo(() => renderTemplate(draft, sampleValues), [draft])

    function toggleTemplate(id: number) {
        setTemplates((current) => current.map((template) => template.id === id ? { ...template, isActive: !template.isActive } : template))
    }

    function createTemplate() {
        console.log('Create template:', draft)
        setTemplates((current) => [...current, { ...draft, id: current.length + 1 }])
        setDraft({ id: 0, name: '', channel: 'SMS', subject: '', body: '', isActive: true })
        setOpen(false)
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Communication Templates</h1>
                    <p className="text-sm text-muted-foreground">Manage reusable SMS, email, and WhatsApp content</p>
                </div>
                <div className="flex items-center gap-2">
                    <Link to="/communications" className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}>Back to Log</Link>
                    <Button size="sm" className="gap-1" onClick={() => setOpen(true)}><Plus className="size-3.5" /> Create Template</Button>
                </div>
            </div>

            <div className="rounded-lg border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Channel</TableHead>
                            <TableHead className="hidden md:table-cell">Subject</TableHead>
                            <TableHead>Active</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {templates.map((template) => (
                            <TableRow key={template.id}>
                                <TableCell className="font-medium">{template.name}</TableCell>
                                <TableCell><Badge className={cn('text-xs', channelColors[template.channel])}>{template.channel}</Badge></TableCell>
                                <TableCell className="hidden md:table-cell max-w-70 truncate">{template.subject || '—'}</TableCell>
                                <TableCell>
                                    <Button variant={template.isActive ? 'default' : 'outline'} size="sm" onClick={() => toggleTemplate(template.id)}>
                                        {template.isActive ? 'Active' : 'Inactive'}
                                    </Button>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="sm" className="gap-1" onClick={() => { setDraft(template); setOpen(true) }}>
                                        <Eye className="size-3.5" /> Preview
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <Sheet open={open} onOpenChange={setOpen}>
                <SheetContent className="w-full overflow-y-auto sm:max-w-xl">
                    <SheetHeader><SheetTitle>{draft.id ? 'Edit Template' : 'Create Template'}</SheetTitle></SheetHeader>
                    <div className="space-y-5 p-4">
                        <div className="space-y-1.5">
                            <Label>Name</Label>
                            <Input value={draft.name} onChange={(e) => setDraft((current) => ({ ...current, name: e.target.value }))} placeholder="Template name" />
                        </div>
                        <div className="space-y-1.5">
                            <Label>Channel</Label>
                            <Select value={draft.channel} onValueChange={(value) => setDraft((current) => ({ ...current, channel: (value ?? 'SMS') as MessageChannel }))}>
                                <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    {messageChannels.map((channel) => <SelectItem key={channel} value={channel}>{channel}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                        {draft.channel === 'Email' && (
                            <div className="space-y-1.5">
                                <Label>Subject</Label>
                                <Input value={draft.subject} onChange={(e) => setDraft((current) => ({ ...current, subject: e.target.value }))} placeholder="Use placeholders like {{customer_name}}" />
                            </div>
                        )}
                        <div className="space-y-1.5">
                            <Label>Body</Label>
                            <Textarea rows={8} value={draft.body} onChange={(e) => setDraft((current) => ({ ...current, body: e.target.value }))} placeholder="Use placeholders like {{customer_name}} and {{case_number}}" />
                        </div>

                        <Card>
                            <CardContent className="space-y-2 p-4">
                                <p className="text-sm font-medium">Preview</p>
                                {draft.channel === 'Email' && <p className="text-sm"><span className="text-muted-foreground">Subject:</span> {preview.subject || '—'}</p>}
                                <div className="rounded-md bg-muted p-3 text-sm whitespace-pre-wrap">{preview.body || 'Template body preview will appear here.'}</div>
                            </CardContent>
                        </Card>

                        <div className="flex gap-2">
                            <Button onClick={createTemplate}>{draft.id ? 'Save Template' : 'Create Template'}</Button>
                            <Button variant="outline" onClick={() => setOpen(false)}>Close</Button>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    )
}