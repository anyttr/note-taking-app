import React, { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { motion } from 'framer-motion';
import '../styles/NoteEditor.css';

interface Tag {
  id: string;
  name: string;
}

export const NoteEditor: React.FC = () => {
  const [title, setTitle] = useState<string>('Notă nouă');
  const [tags, setTags] = useState<Tag[]>([]);

  const editor = useEditor({
    extensions: [StarterKit],
    content: '<p>Începe să scrii...</p>',
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none',
      },
    },
  });

  const addTag = (tagName: string) => {
    const newTag: Tag = {
      id: Date.now().toString(),
      name: tagName
    };
    setTags([...tags, newTag]);
  };

  const removeTag = (tagId: string) => {
    setTags(tags.filter(tag => tag.id !== tagId));
  };

  if (!editor) {
    return null;
  }

  return (
    <div className="note-editor">
      <motion.div 
        className="editor-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="title-input"
          placeholder="Titlu notă..."
        />
        
        <div className="tags-container">
          {tags.map(tag => (
            <motion.span
              key={tag.id}
              className="tag"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
            >
              #{tag.name}
              <button 
                onClick={() => removeTag(tag.id)}
                type="button"
              >
                ×
              </button>
            </motion.span>
          ))}
          <input
            type="text"
            placeholder="Adaugă tag..."
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === 'Enter' && e.currentTarget.value) {
                addTag(e.currentTarget.value);
                e.currentTarget.value = '';
              }
            }}
            className="tag-input"
          />
        </div>
      </motion.div>

      <div className="editor-toolbar">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'is-active' : ''}
        >
          B
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'is-active' : ''}
        >
          I
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editor.isActive('heading') ? 'is-active' : ''}
        >
          H2
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'is-active' : ''}
        >
          •
        </button>
      </div>

      <EditorContent editor={editor} className="editor-content" />
    </div>
  );
};
