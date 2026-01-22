'use client';

import { useEditor, EditorContent, BubbleMenu, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import { TextStyle } from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import Placeholder from '@tiptap/extension-placeholder';
import { Table } from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import {
  FiBold,
  FiItalic,
  FiList,
  FiLink2,
  FiImage,
  FiAlignLeft,
  FiAlignCenter,
  FiAlignRight,
  FiAlignJustify,
  FiCheckSquare,
  FiCode,
} from 'react-icons/fi';
import { BsHighlights } from 'react-icons/bs';
import { MdStrikethroughS } from 'react-icons/md';
import { useState, FC, ChangeEvent, useEffect } from 'react';
import './text-align.css'
import './tiptap-enhanced.css';

// --- Type Definitions ---
interface MenuBarProps {
  editor: Editor | null;
}

interface HeadingDropdownProps {
  editor: Editor | null;
}

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

// --- MenuBar Component ---
const MenuBar: FC<MenuBarProps> = ({ editor }) => {
  const [isLinkModalOpen, setIsLinkModalOpen] = useState<boolean>(false);
  const [linkUrl, setLinkUrl] = useState<string>('');

  if (!editor) {
    return null;
  }

  const addImage = () => {
    const url = window.prompt('Enter the image URL');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const addLink = () => {
    if (editor.isActive('link')) {
      editor.chain().focus().unsetLink().run();
      return;
    }
    setIsLinkModalOpen(true);
  };

  const submitLink = () => {
    if (linkUrl) {
      editor.chain().focus().setLink({ href: linkUrl }).run();
    }
    setIsLinkModalOpen(false);
    setLinkUrl('');
  };

  return (
    <div className="border-b border-gray-200 dark:border-gray-700 p-2">
      <div className="flex flex-wrap items-center gap-2">
        {/* Heading Dropdown */}
        <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 p-1.5 rounded">
          <HeadingDropdown editor={editor} />
        </div>

        {/* Text Formatting */}
        <div className="flex items-center gap-1 bg-gray-50 dark:bg-gray-800 p-1.5 rounded">
          <button
            onClick={() => (editor as any).chain().focus().toggleBold().run()}
            className={`p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-700 ${
              editor.isActive('bold')
                ? 'bg-gray-200 dark:bg-gray-700 text-blue-600'
                : ''
            }`}
            title="Bold"
          >
            <FiBold size={16} />
          </button>
          <button
            onClick={() => (editor as any).chain().focus().toggleItalic().run()}
            className={`p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-700 ${
              editor.isActive('italic')
                ? 'bg-gray-200 dark:bg-gray-700 text-blue-600'
                : ''
            }`}
            title="Italic"
          >
            <FiItalic size={16} />
          </button>
          <button
            onClick={() => (editor as any).chain().focus().toggleStrike().run()}
            className={`p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-700 ${
              editor.isActive('strike')
                ? 'bg-gray-200 dark:bg-gray-700 text-blue-600'
                : ''
            }`}
            title="Strike"
          >
            <MdStrikethroughS size={16} />
          </button>
        </div>

        {/* Lists and Indentation */}
        <div className="flex items-center gap-1 bg-gray-50 dark:bg-gray-800 p-1.5 rounded">
          <button
            onClick={() =>
              (editor as any).chain().focus().toggleBulletList().run()
            }
            className={`p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-700 ${
              editor.isActive('bulletList')
                ? 'bg-gray-200 dark:bg-gray-700 text-blue-600'
                : ''
            }`}
            title="Bullet List"
          >
            <FiList size={16} />
          </button>
          <button
            onClick={() =>
              (editor as any).chain().focus().toggleOrderedList().run()
            }
            className={`p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-700 ${
              editor.isActive('orderedList')
                ? 'bg-gray-200 dark:bg-gray-700 text-blue-600'
                : ''
            }`}
            title="Numbered List"
          >
            <FiList size={16} />
          </button>
        </div>

        {/* Alignment */}
        <div className="flex items-center gap-1 bg-gray-50 dark:bg-gray-800 p-1.5 rounded">
          <button
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            className={`p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-700 ${
              editor.isActive({ textAlign: 'left' })
                ? 'bg-gray-200 dark:bg-gray-700 text-blue-600'
                : ''
            }`}
            title="Align Left"
          >
            <FiAlignLeft size={16} />
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            className={`p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-700 ${
              editor.isActive({ textAlign: 'center' })
                ? 'bg-gray-200 dark:bg-gray-700 text-blue-600'
                : ''
            }`}
            title="Align Center"
          >
            <FiAlignCenter size={16} />
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            className={`p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-700 ${
              editor.isActive({ textAlign: 'right' })
                ? 'bg-gray-200 dark:bg-gray-700 text-blue-600'
                : ''
            }`}
            title="Align Right"
          >
            <FiAlignRight size={16} />
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign('justify').run()}
            className={`p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-700 ${
              editor.isActive({ textAlign: 'justify' })
                ? 'bg-gray-200 dark:bg-gray-700 text-blue-600'
                : ''
            }`}
            title="Justify"
          >
            <FiAlignJustify size={16} />
          </button>
        </div>

        {/* Special Features */}
        <div className="flex items-center gap-1 bg-gray-50 dark:bg-gray-800 p-1.5 rounded">
          <button
            onClick={addLink}
            className={`p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-700 ${
              editor.isActive('link')
                ? 'bg-gray-200 dark:bg-gray-700 text-blue-600'
                : ''
            }`}
            title="Add Link"
          >
            <FiLink2 size={16} />
          </button>
          <button
            onClick={addImage}
            className="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
            title="Add Image"
          >
            <FiImage size={16} />
          </button>
          <button
            onClick={() =>
              (editor as any).chain().focus().toggleCodeBlock().run()
            }
            className={`p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-700 ${
              editor.isActive('codeBlock')
                ? 'bg-gray-200 dark:bg-gray-700 text-blue-600'
                : ''
            }`}
            title="Code Block"
          >
            <FiCode size={16} />
          </button>
        </div>
      </div>

      {/* Link Modal */}
      {isLinkModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
            <h3 className="text-lg font-medium mb-4">Insert Link</h3>
            <input
              type="url"
              value={linkUrl}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setLinkUrl(e.target.value)
              }
              placeholder="https://example.com"
              className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 mb-4"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsLinkModalOpen(false)}
                className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
              >
                Cancel
              </button>
              <button
                onClick={submitLink}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Add Link
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- HeadingDropdown Component ---
const HeadingDropdown: FC<HeadingDropdownProps> = ({ editor }) => {
  if (!editor) return null;

  const headingOptions: { label: string; value: string }[] = [
    { label: 'Normal Text', value: 'paragraph' },
    { label: 'Heading 1', value: 'h1' },
    { label: 'Heading 2', value: 'h2' },
    { label: 'Heading 3', value: 'h3' },
    { label: 'Heading 4', value: 'h4' },
    { label: 'Heading 5', value: 'h5' },
  ];

  const getCurrentHeading = (): string => {
    for (let i = 1; i <= 5; i++) {
      if (editor.isActive('heading', { level: i })) {
        return `h${i}`;
      }
    }
    return 'paragraph';
  };

  const handleHeadingChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    if (value === 'paragraph') {
      (editor as any).chain().focus().setParagraph().run();
    } else {
      const level = parseInt(value.substring(1)) as 1 | 2 | 3 | 4 | 5;
      (editor as any).chain().focus().toggleHeading({ level }).run();
    }
  };

  return (
    <select
      value={getCurrentHeading()}
      onChange={handleHeadingChange}
      className="px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {headingOptions.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

// --- Main RichTextEditor Component ---
const RichTextEditor: FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder,
}) => {
  const editor = useEditor({
    extensions: [
      (StarterKit as any).configure({
        heading: {
          levels: [1, 2, 3, 4, 5],
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
        alignments: ['left', 'center', 'right', 'justify'],
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        HTMLAttributes: {
          class:
            'cursor-pointer text-blue-600 dark:text-blue-400 hover:underline',
        },
      }),
      TextStyle,
      Color,
      Highlight.configure({
        multicolor: true,
      }),
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      Table.configure({
        resizable: true,
        HTMLAttributes: {
          class: 'border-collapse table-auto w-full',
        },
      }),
      TableRow,
      TableHeader,
      TableCell,
      Image.configure({
        HTMLAttributes: {
          class: 'rounded-lg max-w-full h-auto',
        },
      }),
      Placeholder.configure({
        placeholder: placeholder || 'Start writing your content...',
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose dark:prose-invert max-w-none focus:outline-none p-4',
      },
    },
  });

  // This useEffect ensures that if the `value` prop changes from outside,
  // the editor's content is updated to match. This solves the "live update" issue.
  useEffect(() => {
    if (editor) {
      const isSame = editor.getHTML() === value;
      if (!isSame) {
        editor.commands.setContent(value, false as any);
      }
    }
  }, [value, editor]);

  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-300 dark:border-gray-600 overflow-hidden">
      {editor && <MenuBar editor={editor as any} />}

      {editor && (
        <BubbleMenu
          editor={editor}
          tippyOptions={{
            duration: 100,
            placement: 'top-start',
          }}
          className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-1 flex gap-1 border border-gray-200 dark:border-gray-700"
        >
          <button
            onClick={() => (editor as any).chain().focus().toggleBold().run()}
            className={`p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
              editor.isActive('bold') ? 'text-blue-600' : ''
            }`}
          >
            <FiBold size={16} />
          </button>
          <button
            onClick={() => (editor as any).chain().focus().toggleItalic().run()}
            className={`p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
              editor.isActive('italic') ? 'text-blue-600' : ''
            }`}
          >
            <FiItalic size={16} />
          </button>
        </BubbleMenu>
      )}

      <div className="max-h-[400px] overflow-y-auto">
        <EditorContent editor={editor as any} />
      </div>
    </div>
  );
};

export default RichTextEditor;
