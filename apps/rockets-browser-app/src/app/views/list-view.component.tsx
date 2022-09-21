import * as React from 'react';
import { Link, Outlet } from 'react-router-dom';

export type IListViewComponent = React.FC;

export const ListView: IListViewComponent = (props) => {
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
        <Outlet />
      </section>
    </article>
  );
};

ListView.displayName = 'ListView';
