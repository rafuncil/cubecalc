import { createRoot } from 'react-dom/client';
import App from '@/App';
import '@/styles/index.scss';
import React from 'react';


const root = createRoot(document.getElementById('root'));
root.render(<React.StrictMode><App /></React.StrictMode>);