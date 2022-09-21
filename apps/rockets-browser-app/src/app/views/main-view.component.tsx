import * as React from 'react';
import { APP_INTL_MESSAGES } from '../app.messages';
import { FormattedMessage } from 'react-intl';
import { useRocketBrowserAppIntl } from '../app.intl';
import { Link, Outlet } from 'react-router-dom';

export type IMainViewComponent = React.FC<React.PropsWithChildren<unknown>>;

export const MainView: IMainViewComponent = (props) => {
  const appIntl = useRocketBrowserAppIntl();

  if (!appIntl) {
    return null;
  }

  return (
    <article>
      <header>
        <h1>
          <FormattedMessage {...APP_INTL_MESSAGES.heading} />
        </h1>
      </header>
      <section>
        <p>Switch between languages:</p>
        {appIntl.enabledLocales.map((locale) => (
          <button data-locale={locale} onClick={appIntl.handleSetLocaleClick}>
            {locale}
          </button>
        ))}
        <pre
          style={{
            background: '#f9f9f9',
            padding: '6px 24px',
            border: '1px solid #d5d2d2',
          }}
        >
          <code>{JSON.stringify(appIntl, null, '\t')}</code>
        </pre>
      </section>
      <Outlet />
    </article>
  );
};

MainView.displayName = 'MainView';
