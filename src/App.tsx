


```typescript
import React from 'react';
import { motion } from 'framer-motion';
import { NoteEditor } from './components/NoteEditor';
import { Sidebar } from './components/Sidebar';
import { AIAssistant } from './components/AIAssistant';
import './styles/App.css';

const App: React.FC = () => {
  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content">
        <NoteEditor />
      </main>
      <AIAssistant />
    </div>
  );
};

export default App;
```
