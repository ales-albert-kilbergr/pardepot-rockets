import { render } from '@testing-library/react';

import { BrowserRouter } from 'react-router-dom';

import { RocketBrowserApp } from './app';

describe('RocketBrowserApp', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <BrowserRouter>
        <RocketBrowserApp />
      </BrowserRouter>
    );

    expect(baseElement).toBeTruthy();
  });
});
