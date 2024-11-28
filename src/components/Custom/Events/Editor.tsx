'use client'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { TiptapToolbar } from './Toolbar'
import { BulletList } from '@tiptap/extension-bullet-list'
import Document from '@tiptap/extension-document'
import ListItem from '@tiptap/extension-list-item'
import ListKeymap from '@tiptap/extension-list-keymap'
import Heading from '@tiptap/extension-heading'
const Tiptap = ({
    description,
    onChange,
}: {
    description: string,
    onChange: (richText: string) => void
}
) => {
    const editor = useEditor({
        extensions: [StarterKit.configure(
            {
                heading: {
                    levels: [1, 2, 3],
                    HTMLAttributes: {
                        class: 'font-extrabold text-xl ',
                    },
                },
                listItem: {
                    HTMLAttributes: {
                        class: 'fon ',
                    },
                },
            }
        ), BulletList, Document, ListItem, Heading, ListKeymap],
        content: description,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML())
        },
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none rounded-md min-h-[200px] max-w-full bg-background border border-input shadow-sm py-1 px-4',
            },
        }
    })

    if (!editor) {
        return null
    }

    return <div className="flex flex-col justify-stretch items-stretch flex-1 p-1">
        <TiptapToolbar editor={editor} />
        <div className="w-full px-2">
            <EditorContent editor={editor} />
        </div>

    </div>
}

export default Tiptap
