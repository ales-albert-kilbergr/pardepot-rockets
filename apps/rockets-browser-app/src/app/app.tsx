// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormattedMessage } from 'react-intl';
import { APP_INTL_MESSAGES } from './app.messages';
import { IntlProvider } from 'react-intl';

export type IRocketBorwserAppComponent = React.FC;

export const RocketBrowserApp: IRocketBorwserAppComponent = () => {
  return (
    <IntlProvider messages={{}} locale="en">
      <h1>
        <FormattedMessage {...APP_INTL_MESSAGES.heading} />
      </h1>
    </IntlProvider>
  );
};

RocketBrowserApp.displayName = 'RocketBrowserApp';
