// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { CssBaseline } from '@mui/material';
import { IntlProvider } from 'react-intl';
import { RouterProvider } from 'react-router-dom';
import {
  RocketBrowserAppIntlContext,
  RocketBrowserAppIntlLocale,
  useRocketBrowserAppIntlProvider,
} from './app.intl';
import { rocketBrowserAppRoutes } from './app.routes';

export type IRocketBorwserAppComponent = React.FC;

export const RocketBrowserApp: IRocketBorwserAppComponent = () => {
  const appIntl = useRocketBrowserAppIntlProvider({
    defaultLocale: RocketBrowserAppIntlLocale.EN_US,
    localeCache: 'localStorage',
  });

  if (!appIntl.intlMessages) {
    return null;
  }

  return (
    <IntlProvider
      messages={appIntl.intlMessages}
      locale={appIntl.defaultLocale}
    >
      <CssBaseline />
      <RocketBrowserAppIntlContext.Provider value={appIntl}>
        <RouterProvider router={rocketBrowserAppRoutes} />
      </RocketBrowserAppIntlContext.Provider>
    </IntlProvider>
  );
};

RocketBrowserApp.displayName = 'RocketBrowserApp';
