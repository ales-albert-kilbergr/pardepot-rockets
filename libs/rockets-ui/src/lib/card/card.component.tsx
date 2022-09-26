import { IShip } from '@parkdepot/rockets/gql-client';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export interface IShipCardProps {
  ship: IShip;
}

export type ShipCardComponent = React.FC<IShipCardProps>;

export const ShipCard: ShipCardComponent = (props) => {
  return (
    <Card sx={{ width: 350 }}>
      <CardMedia
        component="img"
        height="140"
        image={props.ship.image}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.ship.name}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {props.ship.type} - (${props.ship.id})
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};

ShipCard.displayName = 'ShipCard';

ShipCard.defaultProps = {};
