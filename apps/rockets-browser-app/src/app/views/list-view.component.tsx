import { useShipList } from '@parkdepot/rockets/data';
import * as React from 'react';
import { Link, Outlet } from 'react-router-dom';

export type IListViewComponent = React.FC;

export const ListView: IListViewComponent = (props) => {
  const ships = useShipList();
  return (
    <article>
      <header>
        <h2>List view</h2>
      </header>
      <nav>
        <ul>
          <li>
            <Link to="grid">Grid</Link>
          </li>
          <li>
            <Link to="table">Table</Link>
          </li>
        </ul>
      </nav>
      <section>
        <pre
          style={{
            background: '#f9f9f9',
            padding: '6px 24px',
            border: '1px solid #d5d2d2',
          }}
        >
          <code>{JSON.stringify(ships.data || {}, undefined, '  ')}</code>
        </pre>

        <Outlet />
      </section>
    </article>
  );
};

ListView.displayName = 'ListView';
