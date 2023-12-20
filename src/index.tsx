import { createRoot } from 'react-dom/client';
import ReactDOM from 'react-dom' ;
import App from './Components/App' ;
import { ThemeProvider } from 'styled-components' ;

import theme from './theme' ;

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
root.render(
    <ThemeProvider theme={theme}>
        <App />
    </ThemeProvider>
);

