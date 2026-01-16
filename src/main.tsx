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

// First, test if we can render anything at all
const testDiv = document.createElement('div');
testDiv.style.cssText = 'position: fixed; top: 0; left: 0; background: blue; color: white; padding: 10px; z-index: 999999;';
testDiv.textContent = 'Direct DOM test - if you see this, DOM works';
document.body.appendChild(testDiv);
console.log('Test div added to DOM');

try {
  const root = createRoot(rootElement);
  console.log('React root created');
  root.render(<App />);
  console.log('App rendered successfully');
  
  // Check if root element has children after a short delay
  setTimeout(() => {
    const hasChildren = rootElement.children.length > 0 || rootElement.innerHTML.trim() !== '';
    console.log('Root element has children:', hasChildren);
    console.log('Root element innerHTML length:', rootElement.innerHTML.length);
    if (!hasChildren) {
      console.error('WARNING: Root element is empty after render!');
      console.log('Root element:', rootElement);
    }
  }, 100);
} catch (error) {
  console.error('Error rendering app:', error);
  console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
  throw error;
}
