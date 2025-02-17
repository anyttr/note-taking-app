
- Copiază:

```css
.app-container {
  display: grid;
  grid-template-columns: 250px 1fr 300px;
  height: 100vh;
  background: #ffffff;
  color: #333;
}

.main-content {
  padding: 2rem;
  overflow-y: auto;
  background: #f8f9fa;
}

.sidebar {
  background: #ffffff;
  border-right: 1px solid #eee;
  padding: 1rem;
}

.ai-assistant {
  background: #ffffff;
  border-left: 1px solid #eee;
  padding: 1rem;
}

@media (prefers-color-scheme: dark) {
  .app-container {
    background: #1a1a1a;
    color: #fff;
  }

  .main-content {
    background: #242424;
  }

  .sidebar,
  .ai-assistant {
    background: #1a1a1a;
    border-color: #333;
  }
}
```
