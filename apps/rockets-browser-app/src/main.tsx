import { StrictMode } from 'react';
import * as ReactDOMClient from 'react-dom/client';
import { RocketBrowserApp } from './app/app';

function boostrapRocketBrowserApp() {
  const root = ReactDOMClient.createRoot(
    document.getElementById('root') as HTMLElement
  );
  root.render(
    <StrictMode>
      <RocketBrowserApp />
    </StrictMode>
  );
}

boostrapRocketBrowserApp();
