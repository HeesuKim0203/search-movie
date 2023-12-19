import { createRoot } from 'react-dom/client';
import ReactDOM from 'react-dom' ;
import App from './Components/App' ;
import { ThemeProvider } from 'styled-components' ;

import theme from './theme' ;

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
    <ThemeProvider theme={theme}>
        <App tab="home" />
    </ThemeProvider>
);

