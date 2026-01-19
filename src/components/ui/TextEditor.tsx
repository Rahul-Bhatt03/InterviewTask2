import React, { useEffect } from 'react'
import { useEditor, EditorContent, Editor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import { FiBold, FiItalic, FiUnderline, FiList, FiCode, FiLink, FiType  } from 'react-icons/fi'
import { MdRedo,  MdLooksOne, MdLooksTwo } from 'react-icons/md'

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  minHeight?: string
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder = 'Write your content here...',
  minHeight = '200px',
}) => {
  const editor: Editor | null = useEditor({
    extensions: [StarterKit, Underline, Link, Placeholder.configure({ placeholder })],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  // Sync editor if value changes externally
  useEffect(() => {
    if (editor && editor.getHTML() !== value) {
      editor.commands.setContent(value)
    }
  }, [value, editor])

  if (!editor) return null

  // Toolbar button helper
  const ToolbarButton = ({
    onClick,
    isActive,
    icon: IconComponent,
    label,
  }: {
    onClick: () => void
    isActive: boolean
    icon: React.ComponentType
    label: string
  }) => (
    <button
      type="button"
      onClick={onClick}
      className={`p-2 rounded-md transition-colors ${
        isActive ? 'bg-blue-600 text-white' : 'hover:bg-gray-100 text-gray-700'
      }`}
      title={label}
    >
      <IconComponent />
    </button>
  )

  return (
    <div className="flex flex-col w-full">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-1 mb-2 border border-b-0 border-gray-300 rounded-t-md p-1 bg-gray-50">
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive('bold')}
          icon={FiBold}
          label="Bold"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive('italic')}
          icon={FiItalic}
          label="Italic"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          isActive={editor.isActive('underline')}
          icon={FiUnderline}
          label="Underline"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          isActive={editor.isActive('heading', { level: 1 })}
          icon={FiType }
          label="H1 Heading"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          isActive={editor.isActive('heading', { level: 2 })}
          icon={FiType }
          label="H2 Heading"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive('bulletList')}
          icon={FiList}
          label="Bullet List"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive('orderedList')}
          icon={FiList}
          label="Ordered List"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          isActive={editor.isActive('codeBlock')}
          icon={FiCode}
          label="Code Block"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().undo().run()}
          isActive={false}
          icon={MdLooksOne}
          label="Undo"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().redo().run()}
          isActive={false}
          icon={MdRedo}
          label="Redo"
        />
        <ToolbarButton
          onClick={() => {
            const url = prompt('Enter URL')
            if (url) editor.chain().focus().setLink({ href: url }).run()
          }}
          isActive={editor.isActive('link')}
          icon={FiLink}
          label="Add Link"
        />
      </div>

      {/* Editor */}
   <div
  className="border border-gray-300 rounded-b-md p-2 bg-white min-h-[200px] focus-within:ring-2 focus-within:ring-blue-500 prose prose-sm sm:prose lg:prose-lg max-w-full"
  style={{ minHeight }}
>
  <EditorContent editor={editor} />
</div>

    </div>
  )
}
