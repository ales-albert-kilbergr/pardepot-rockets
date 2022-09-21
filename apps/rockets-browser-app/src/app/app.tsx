// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormattedMessage } from 'react-intl';
import { IntlProvider } from 'react-intl';
import {
  RocketBrowserAppIntlContext,
  RocketBrowserAppIntlLocale,
  useRocketBrowserAppIntlProvider,
} from './app.intl';
import { MainView } from './views';

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
      <RocketBrowserAppIntlContext.Provider value={appIntl}>
        <MainView />
      </RocketBrowserAppIntlContext.Provider>
    </IntlProvider>
  );
};

RocketBrowserApp.displayName = 'RocketBrowserApp';
