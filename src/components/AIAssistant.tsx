

```typescript
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/AIAssistant.css';

interface Suggestion {
  id: string;
  type: 'grammar' | 'style' | 'content';
  text: string;
  replacement?: string;
}

export const AIAssistant: React.FC = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([
    {
      id: '1',
      type: 'grammar',
      text: 'Consideră să adaugi o virgulă aici',
      replacement: 'text, cu virgulă'
    },
    {
      id: '2',
      type: 'style',
      text: 'Această propoziție ar putea fi mai concisă',
      replacement: 'Versiune mai scurtă'
    },
    {
      id: '3',
      type: 'content',
      text: 'Ai putea adăuga mai multe detalii despre acest concept'
    }
  ]);

  const removeSuggestion = (id: string) => {
    setSuggestions(prev => prev.filter(s => s.id !== id));
  };

  return (
    <div className="ai-assistant">
      <motion.div 
        className="assistant-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2>Asistent AI</h2>
        <button 
          className="analyze-button"
          onClick={() => setIsAnalyzing(true)}
          disabled={isAnalyzing}
        >
          {isAnalyzing ? 'Se analizează...' : 'Analizează'}
        </button>
      </motion.div>

      <div className="suggestions-container">
        <AnimatePresence>
          {suggestions.map(suggestion => (
            <motion.div
              key={suggestion.id}
              className={`suggestion-card ${suggestion.type}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
            >
              <div className="suggestion-header">
                <span className="suggestion-type">{suggestion.type}</span>
                <button 
                  className="close-button"
                  onClick={() => removeSuggestion(suggestion.id)}
                >
                  ×
                </button>
              </div>
              
              <p className="suggestion-text">{suggestion.text}</p>
              
              {suggestion.replacement && (
                <div className="suggestion-replacement">
                  <strong>Sugestie:</strong>
                  <p>{suggestion.replacement}</p>
                  <button className="apply-button">
                    Aplică
                  </button>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="assistant-footer">
        <button className="feature-button">
          <span className="icon">🔍</span>
          Verifică gramatică
        </button>
        <button className="feature-button">
          <span className="icon">💡</span>
          Sugerează idei
        </button>
        <button className="feature-button">
          <span className="icon">📝</span>
          Reformulează
        </button>
      </div>
    </div>
  );
};
```
