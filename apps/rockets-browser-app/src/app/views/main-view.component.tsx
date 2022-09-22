import * as React from 'react';
import { APP_INTL_MESSAGES } from '../app.messages';
import { FormattedMessage } from 'react-intl';
import {
  RocketBrowserAppLocaleSelect,
  useRocketBrowserAppIntl,
} from '../app.intl';
import { Outlet } from 'react-router-dom';
import { RocketsAppBar } from '@parkedpot/rockets/ui';

export type IMainViewComponent = React.FC<React.PropsWithChildren<unknown>>;

export const MainView: IMainViewComponent = (props) => {
  const appIntl = useRocketBrowserAppIntl();

  if (!appIntl) {
    return null;
  }

  return (
    <article>
      <RocketsAppBar
        heading={<FormattedMessage {...APP_INTL_MESSAGES.heading} />}
        rightSlot={<RocketBrowserAppLocaleSelect />}
      />
      <Outlet />
    </article>
  );
};

MainView.displayName = 'MainView';
