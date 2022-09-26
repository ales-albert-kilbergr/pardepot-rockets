import * as React from 'react';
import { APP_INTL_MESSAGES } from '../app.messages';
import { FormattedMessage } from 'react-intl';
import {
  RocketBrowserAppLocaleSelect,
  useRocketBrowserAppIntl,
} from '../app.intl';
import { Outlet } from 'react-router-dom';
import { RocketsAppBar } from '@parkedpot/rockets/ui';
import Box from '@mui/material/Box';

export type IMainViewComponent = React.FC<React.PropsWithChildren<unknown>>;

export const MainView: IMainViewComponent = (props) => {
  const appIntl = useRocketBrowserAppIntl();

  if (!appIntl) {
    return null;
  }

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      <RocketsAppBar
        heading={<FormattedMessage {...APP_INTL_MESSAGES.heading} />}
        rightSlot={<RocketBrowserAppLocaleSelect />}
      />
      <Box
        sx={{
          height: 'calc(100vh - 64px)',
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

MainView.displayName = 'MainView';
