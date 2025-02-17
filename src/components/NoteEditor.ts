


```typescript
import React, { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { motion } from 'framer-motion';
import '../styles/NoteEditor.css';

export const NoteEditor: React.FC = () => {
  const [title, setTitle] = useState('Notă nouă');
  const [tags, setTags] = useState<string[]>([]);

  const editor = useEditor({
    extensions: [StarterKit],
    content: '<p>Începe să scrii...</p>',
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none',
      },
    },
  });

  const addTag = (tag: string) => {
    if (!tags.includes(tag)) {
      setTags([...tags, tag]);
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

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
              key={tag}
              className="tag"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
            >
              #{tag}
              <button onClick={() => removeTag(tag)}>×</button>
            </motion.span>
          ))}
          <input
            type="text"
            placeholder="Adaugă tag..."
            onKeyDown={e => {
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
          onClick={() => editor?.chain().focus().toggleBold().run()}
          className={editor?.isActive('bold') ? 'is-active' : ''}
        >
          B
        </button>
        <button
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          className={editor?.isActive('italic') ? 'is-active' : ''}
        >
          I
        </button>
        <button
          onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editor?.isActive('heading') ? 'is-active' : ''}
        >
          H2
        </button>
        <button
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
          className={editor?.isActive('bulletList') ? 'is-active' : ''}
        >
          •
        </button>
      </div>

      <EditorContent editor={editor} className="editor-content" />
    </div>
  );
};
```
