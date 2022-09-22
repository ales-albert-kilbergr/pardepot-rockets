import { useShipListQueryResut } from '@parkdepot/rockets/gql-client';
import * as React from 'react';

export type ITableViewComponent = React.FC;

export const TableView: ITableViewComponent = (props) => {
  const shipsQueryResult = useShipListQueryResut();

  return (
    <article>
      <header>
        <h2>Table view</h2>
      </header>
      <section>
        {shipsQueryResult && (
          <pre
            style={{
              background: '#f9f9f9',
              padding: '6px 24px',
              border: '1px solid #d5d2d2',
            }}
          >
            <code>
              {JSON.stringify(shipsQueryResult.data || {}, undefined, '  ')}
            </code>
          </pre>
        )}
      </section>
    </article>
  );
};

TableView.displayName = 'TableView';
