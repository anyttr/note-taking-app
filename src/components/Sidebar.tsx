


```typescript
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/Sidebar.css';

interface Note {
  id: string;
  title: string;
  tags: string[];
  lastModified: Date;
  children?: Note[];
}

export const Sidebar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [expandedFolders, setExpandedFolders] = useState<string[]>([]);

  // Mock data - în producție ar veni din backend
  const notes: Note[] = [
    {
      id: '1',
      title: 'Biologie',
      tags: ['știință', 'studiu'],
      lastModified: new Date(),
      children: [
        {
          id: '1.1',
          title: 'Celula',
          tags: ['biologie', 'bază'],
          lastModified: new Date(),
        },
        {
          id: '1.2',
          title: 'Fotosinteza',
          tags: ['biologie', 'plante'],
          lastModified: new Date(),
        }
      ]
    },
    {
      id: '2',
      title: 'Chimie',
      tags: ['știință', 'laborator'],
      lastModified: new Date(),
      children: [
        {
          id: '2.1',
          title: 'Tabel Periodic',
          tags: ['chimie', 'referință'],
          lastModified: new Date(),
        }
      ]
    }
  ];

  const toggleFolder = (folderId: string) => {
    setExpandedFolders(prev => 
      prev.includes(folderId)
        ? prev.filter(id => id !== folderId)
        : [...prev, folderId]
    );
  };

  const renderNote = (note: Note, level: number = 0) => (
    <motion.div
      key={note.id}
      className="note-item"
      style={{ marginLeft: `${level * 20}px` }}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <div 
        className="note-header"
        onClick={() => note.children && toggleFolder(note.id)}
      >
        {note.children && (
          <span className={`folder-icon ${expandedFolders.includes(note.id) ? 'open' : ''}`}>
            ▶
          </span>
        )}
        <span className="note-title">{note.title}</span>
      </div>
      
      <AnimatePresence>
        {note.children && expandedFolders.includes(note.id) && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            {note.children.map(child => renderNote(child, level + 1))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <input
          type="text"
          placeholder="Caută notițe..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="tags-filter">
        <h3>Filtrare după etichete</h3>
        <div className="tags-list">
          {['știință', 'studiu', 'biologie', 'chimie'].map(tag => (
            <motion.button
              key={tag}
              className={`tag-filter ${selectedTags.includes(tag) ? 'selected' : ''}`}
              onClick={() => setSelectedTags(prev => 
                prev.includes(tag) 
                  ? prev.filter(t => t !== tag)
                  : [...prev, tag]
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              #{tag}
            </motion.button>
          ))}
        </div>
      </div>

      <div className="notes-list">
        {notes.map(note => renderNote(note))}
      </div>

      <motion.button
        className="new-note-button"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        + Notă Nouă
      </motion.button>
    </div>
  );
};
```
