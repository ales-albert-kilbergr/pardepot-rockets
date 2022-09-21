import { StrictMode } from 'react';
import * as ReactDOMClient from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { RocketBrowserApp } from './app/app';

function boostrapRocketBrowserApp() {
  const root = ReactDOMClient.createRoot(
    document.getElementById('root') as HTMLElement
  );
  root.render(
    <StrictMode>
      <BrowserRouter>
        <RocketBrowserApp />
      </BrowserRouter>
    </StrictMode>
  );
}

boostrapRocketBrowserApp();
