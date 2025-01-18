import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import App from './App.tsx'
import "./i18n.ts";

/**
 * Main entry point of the application that initializes React and renders the root component.
 *
 * The application is wrapped in React.StrictMode for additional development checks and
 * MuiThemeConfig for Material-UI theming. This root component provides the following:
 * - React.StrictMode for development checks
 * - App component which includes:
 *   - React Router for navigation
 *   - Toast notifications via react-toastify
 *   - Suspense for code-splitting
 *
 * @example
 * ```tsx
 * // Basic usage
 * ReactDOM.createRoot(rootElement).render(
 *   <React.StrictMode>
 *     <App />
 *   </React.StrictMode>
 * );
 * ```
 *
 * @returns {React.ReactElement} The root application component wrapped in required providers
 * @see {@link App} For main application component
 */
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
