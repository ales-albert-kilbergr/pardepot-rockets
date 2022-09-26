import {
  useFilteredShipList,
  useShipListQueryResut,
} from '@parkdepot/rockets/gql-client';
import { ShipList } from '@parkedpot/rockets/ui';
import * as React from 'react';

export type ITableViewComponent = React.FC;

export const TableView: ITableViewComponent = (props) => {
  const shipsQueryResult = useShipListQueryResut();

  const shipList = useFilteredShipList(shipsQueryResult);
  return (
    <article>
      <section>{shipList && <ShipList ships={shipList} />}</section>
    </article>
  );
};

TableView.displayName = 'TableView';
