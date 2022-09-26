import { IShip } from '@parkdepot/rockets/gql-client';
import * as React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { ShipCard } from '../card/card.component';
import Container from '@mui/material/Container';

export interface IShipCardGridProps {
  ships: IShip[];
}

export type ShipCardGridComponent = React.FC<IShipCardGridProps>;

export const ShipCardGrid: ShipCardGridComponent = (props) => {
  return (
    <Container maxWidth="xl">
      <Grid container spacing="24px">
        {props.ships.map((ship, index) => (
          <Grid key={ship.id}>
            <ShipCard ship={ship} key={ship.id} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

ShipCardGrid.displayName = 'ShipCardGrid';

ShipCardGrid.defaultProps = {};
