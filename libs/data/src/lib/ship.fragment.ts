import { gql, TypePolicy } from '@apollo/client';
export interface IShip {
  id: string;
  image: string;
  type: string;
  name: string;
}

export const SHIP_FRAGMENT_GQL = gql`
  fragment ShipFragment on Ship {
    id
    image
    type
    name
    __typename
  }
`;

export const SHIP_TYPE_POLICY: TypePolicy = {
  keyFields: ['id'],
};
