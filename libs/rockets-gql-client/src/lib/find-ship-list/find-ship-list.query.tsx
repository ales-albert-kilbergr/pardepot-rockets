import {
  gql,
  makeVar,
  QueryResult,
  useQuery,
  useReactiveVar,
} from '@apollo/client';
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

export function useShipTypes() {
  const queryResult = useShipListQueryResut();

  const shipTypes = React.useMemo<string[]>(
    () =>
      queryResult?.data?.ships.reduce<string[]>((acc, ship) => {
        if (!acc.includes(ship.type)) {
          acc.push(ship.type);
        }
        return acc;
      }, []) || [],
    [queryResult]
  );

  return shipTypes;
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

export const CurrentShipTypeFilter = makeVar('');

export function useFilteredShipList(
  queryResult: QueryResult<IFindShipListData> | null
) {
  const shipTypeFilter = useReactiveVar(CurrentShipTypeFilter);

  const shipList = React.useMemo(
    () =>
      queryResult?.data?.ships.filter(
        (ship) => !shipTypeFilter || ship.type === shipTypeFilter
      ),
    [shipTypeFilter, queryResult]
  );

  return shipList;
}
