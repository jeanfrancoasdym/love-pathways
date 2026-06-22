import { ViteReactSSG } from 'vite-react-ssg';
import { routes } from './App';
import './index.css';
import './i18n/config';

export const createRoot = ViteReactSSG({
  routes,
  basename: import.meta.env.BASE_URL,
});
