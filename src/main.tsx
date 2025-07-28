import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './index.css'
import App from './App.tsx'
import {ErrorBoundary} from '@/hoc/ErrorBoundary.tsx';

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
      <ErrorBoundary>
          <Router>
              <Provider store={store}>
                  <App />
              </Provider>
          </Router>
      </ErrorBoundary>

  // </StrictMode>,
)
