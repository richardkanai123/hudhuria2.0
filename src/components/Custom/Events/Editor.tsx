'use client'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { TiptapToolbar } from './Toolbar'
import { BulletList } from '@tiptap/extension-bullet-list'
import ListItem from '@tiptap/extension-list-item'
import ListKeymap from '@tiptap/extension-list-keymap'
import Heading from '@tiptap/extension-heading'

const TipTap = ({
    onChange,
    description,
}: {
    onChange: (description: string) => void
    description: string
}) => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Heading.configure({ levels: [1, 2, 3], HTMLAttributes: { class: 'text-lg font-semibold' } }),
            BulletList.configure({ HTMLAttributes: { class: 'list-disc' } }),
            ListItem.configure({ HTMLAttributes: { class: 'pl-4' } }),
        ],
        content: description,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML())
        },
        editorProps: {
            attributes: {
                class: ' min-h-[200px] max-h-fit px-6 py-2 border border-gray-300 rounded-md align-items-center justify-center',
            },
        }
    })


    return (
        <div className="w-full mx-auto">
            <TiptapToolbar editor={editor} />
            <EditorContent editor={editor} />
        </div>
    )
}

export default TipTap