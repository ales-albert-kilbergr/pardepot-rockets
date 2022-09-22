import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import * as React from 'react';
import { AppBarHeading } from './app-bar-heading.component';
import Toolbar from '@mui/material/Toolbar';

export interface IRocketsAppBarProps {
  heading: string | JSX.Element;
  rightSlot?: JSX.Element;
}

export type RocketsAppBarComponent = React.FC<IRocketsAppBarProps>;

export const RocketsAppBar: RocketsAppBarComponent = (props) => {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AppBarHeading
            variant="h5"
            sx={{ display: { xs: 'none', md: 'flex' } }}
          >
            {props.heading}
          </AppBarHeading>
          <AppBarHeading
            variant="h6"
            sx={{ display: { xs: 'flex', md: 'none' } }}
          >
            {props.heading}
          </AppBarHeading>
          {/* Slot to render custom content at the right of the toolbar */}
          <Box sx={{ flexGrow: 0 }}>{props.rightSlot}</Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

RocketsAppBar.displayName = 'RocketsAppBar';

RocketsAppBar.defaultProps = {};
