import { useRef } from 'react'

export const FileInput = () => {
    const inputRef = useRef<HTMLInputElement>(null)

    const handleClick = () => {
        inputRef.current?.click()
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            console.log(file)
        }
    }

    return (
        <div
            className="min-h-42 p-12 text-center gap-1.5 rounded-xs border border-dashed border-border flex flex-col justify-center items-center cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={handleClick}
        >
            <p className="text-xs text-muted-foreground">
                Drop your files here, or <span className="underline">click to browse.</span>
            </p>
            <p className="text-xs text-muted-foreground">Maximum file size is 10MB</p>

            <input ref={inputRef} type="file" className="hidden" onChange={handleChange} />
        </div>
    )
}
