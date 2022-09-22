import { gql, QueryResult, useQuery } from '@apollo/client';
import * as React from 'react';
import { IShip, SHIP_FRAGMENT_GQL } from '../ship.fragment';

export const FIND_SHIP_LIST_QUERY = gql`
  query ships {
    ships {
      ...ShipFragment
    }
  }
  ${SHIP_FRAGMENT_GQL}
`;

export interface IFindShipListData {
  ships: IShip[];
}

export function useShipListQuery() {
  const query = useQuery<IFindShipListData>(FIND_SHIP_LIST_QUERY);

  return query;
}

export const ShipListQueryContext =
  React.createContext<QueryResult<IFindShipListData> | null>(null);

export function useShipListQueryResut(): QueryResult<IFindShipListData> | null {
  return React.useContext(ShipListQueryContext);
}

export type IShipListProviderComponent = React.FC<
  React.PropsWithChildren<unknown>
>;

export const ShipListProvider: IShipListProviderComponent = (props) => {
  const query = useShipListQuery();

  return (
    <ShipListQueryContext.Provider value={query}>
      {props.children}
    </ShipListQueryContext.Provider>
  );
};

ShipListProvider.displayName = 'ShipListProvider';
