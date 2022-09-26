import { IShip } from '@parkdepot/rockets/gql-client';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';
import Box from '@mui/material/Box';
import { useIsIgameBroken } from '../helper.hooks';

export interface IShipCardProps {
  ship: IShip;
}

export type ShipCardComponent = React.FC<IShipCardProps>;

export const ShipCard: ShipCardComponent = (props) => {
  const isImageBroken = useIsIgameBroken(props.ship?.image);

  return (
    <Card sx={{ width: 350 }}>
      {!isImageBroken && (
        <CardMedia
          component="img"
          height="140"
          image={props.ship.image}
          alt={props.ship.name}
        />
      )}
      {isImageBroken && (
        <CardContent>
          <Box
            sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}
          >
            <ImageNotSupportedIcon
              sx={{ width: '108px', height: '108px' }}
              color="disabled"
            />
          </Box>
        </CardContent>
      )}
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.ship.name}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {props.ship.type} - (${props.ship.id})
        </Typography>
      </CardContent>
    </Card>
  );
};

ShipCard.displayName = 'ShipCard';

ShipCard.defaultProps = {};
