import { ipcRenderer } from 'electron';

// Expose safe context bridge or IPC wrappers if needed
window.addEventListener('DOMContentLoaded', () => {
  console.log('Preload script loaded for A click');
});
