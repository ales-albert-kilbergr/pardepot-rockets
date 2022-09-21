import { gql, useQuery } from '@apollo/client';
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

export function useShipList() {
  const query = useQuery<IFindShipListData>(FIND_SHIP_LIST_QUERY);

  return query;
}
