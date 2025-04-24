'use client'

import { Select } from '../shared/select'
import { Label } from '../ui/label'
import { Switch } from '../ui/switch'

export const MessagingView = () => {
    return (
        <div className="flex flex-col gap-4">
            <div className="grid grid-cols-5">
                <div className="col-span-1 border border-border p-2">
                    <div className="flex flex-col gap-2">
                        <Label>Select platform</Label>
                        <Select
                            options={[
                                { label: 'All', value: 'all' },
                                { label: 'Unread', value: 'unread' },
                                { label: 'Starred', value: 'starred' },
                            ]}
                            value=""
                            onChange={() => {}}
                        />
                    </div>
                </div>

                <div className="col-span-4 border-b border-t border-r border-border p-2">
                    <div className="flex items-center gap-4 justify-end">
                        <div className="flex items-center gap-2">
                            <p className="text-sm">Is AI Bot enabled?</p>
                            <Switch />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
