import { IShip } from '@parkdepot/rockets/gql-client';
import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

export interface IShipListItemProps {
  ship: IShip;
}

export type ShipListItemComponent = React.FC<IShipListItemProps>;

export const ShipListItem: ShipListItemComponent = (props) => {
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar>
          <img src={props.ship.image} alt={props.ship.name} width="100%" />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={props.ship.name}
        secondary={`${props.ship.type} - (${props.ship.id})`}
      />
    </ListItem>
  );
};

ShipListItem.displayName = 'ShipListItem';

ShipListItem.defaultProps = {};
