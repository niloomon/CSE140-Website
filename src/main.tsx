import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Debug logging
console.log('main.tsx: Starting app initialization');
console.log('BASE_URL:', import.meta.env.BASE_URL);
console.log('Current URL:', window.location.href);
console.log('Pathname:', window.location.pathname);

const rootElement = document.getElementById("root");
if (!rootElement) {
  console.error("Root element not found!");
  throw new Error("Root element not found");
}

console.log('Root element found, rendering App...');

try {
  createRoot(rootElement).render(<App />);
  console.log('App rendered successfully');
} catch (error) {
  console.error('Error rendering app:', error);
  throw error;
}
