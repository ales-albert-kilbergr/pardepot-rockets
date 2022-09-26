import * as React from 'react';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import ButtonGroup from '@mui/material/ButtonGroup';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import TableRowsIcon from '@mui/icons-material/TableRows';
import GridViewIcon from '@mui/icons-material/GridView';
import { useShipListQueryResut } from '@parkdepot/rockets/gql-client';
import { FormattedMessage } from 'react-intl';
import { ROCKETS_UI_MESSAGES } from '../ui.messages';

export interface IListBarProps {
  onViewSelect: (viewType: 'grid' | 'table') => void;
  viewType?: 'grid' | 'table';
}

export type ListBarComponent = React.FC<IListBarProps>;

export const ListBar: ListBarComponent = (props) => {
  const shipQueryResult = useShipListQueryResut();
  const handleViewSelect = React.useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      const viewType = event.currentTarget.dataset['viewType'];

      if (viewType) {
        props.onViewSelect(viewType as 'grid' | 'table');
      }
    },
    [props.onViewSelect]
  );

  return (
    <Container maxWidth="xl">
      <Toolbar disableGutters>
        <Box sx={{ flexGrow: 1 }}>
          <FormattedMessage {...ROCKETS_UI_MESSAGES.shipListTitle} />(
          {shipQueryResult?.data?.ships.length})
        </Box>
        <Box sx={{ flexGrow: 0 }}>
          <ButtonGroup variant="text" aria-label="text button group">
            <IconButton
              data-view-type="table"
              onClick={handleViewSelect}
              color={props.viewType === 'table' ? 'primary' : 'default'}
            >
              <TableRowsIcon />
            </IconButton>
            <IconButton
              data-view-type="grid"
              onClick={handleViewSelect}
              color={props.viewType === 'grid' ? 'primary' : 'default'}
            >
              <GridViewIcon />
            </IconButton>
          </ButtonGroup>
        </Box>
      </Toolbar>
    </Container>
  );
};

ListBar.displayName = 'ListBar';

ListBar.defaultProps = {};
