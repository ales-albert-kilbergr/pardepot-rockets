import { IShip } from '@parkdepot/rockets/gql-client';
import * as React from 'react';
import List from '@mui/material/List';
import { ShipListItem } from '../list-item/list-item.component';

export interface IShipListProps {
  ships: IShip[];
}

export type ShipListComponent = React.FC<IShipListProps>;

export const ShipList: ShipListComponent = (props) => {
  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {props.ships.map((ship) => (
        <ShipListItem ship={ship} key={ship.id} />
      ))}
    </List>
  );
};

ShipList.displayName = 'ShipList';

ShipList.defaultProps = {};
