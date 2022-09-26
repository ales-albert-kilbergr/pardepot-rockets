import {
  useFilteredShipList,
  useShipListQueryResut,
} from '@parkdepot/rockets/gql-client';
import { ShipList } from '@parkedpot/rockets/ui';
import * as React from 'react';
import Box from '@mui/material/Box';

export type ITableViewComponent = React.FC;

export const TableView: ITableViewComponent = (props) => {
  const shipsQueryResult = useShipListQueryResut();

  const shipList = useFilteredShipList(shipsQueryResult);
  return (
    <Box
      sx={{
        height: '100%',
      }}
    >
      <section>{shipList && <ShipList ships={shipList} />}</section>
    </Box>
  );
};

TableView.displayName = 'TableView';
