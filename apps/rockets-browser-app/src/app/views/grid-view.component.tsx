import {
  useFilteredShipList,
  useShipListQueryResut,
} from '@parkdepot/rockets/gql-client';
import { ShipCardGrid } from '@parkedpot/rockets/ui';
import * as React from 'react';

export type IGridViewComponent = React.FC;

export const GridView: IGridViewComponent = (props) => {
  const shipsQueryResult = useShipListQueryResut();

  const shipList = useFilteredShipList(shipsQueryResult);
  return (
    <article>
      <section>{shipList && <ShipCardGrid ships={shipList} />}</section>
    </article>
  );
};

GridView.displayName = 'GridView';
