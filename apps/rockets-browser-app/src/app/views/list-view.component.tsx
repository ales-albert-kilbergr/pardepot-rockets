import { ShipListProvider } from '@parkdepot/rockets/gql-client';
import { ListBar } from '@parkedpot/rockets/ui';
import * as React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

export type IListViewComponent = React.FC;

export const ListView: IListViewComponent = (props) => {
  const navigate = useNavigate();

  const viewType = /table/.test(window.location.pathname)
    ? 'table'
    : /grid/.test(window.location.pathname)
    ? 'grid'
    : undefined;

  const handleViewTypeSelect = React.useCallback(
    (viewType: string) => {
      navigate(viewType);
    },
    [navigate]
  );
  return (
    <ShipListProvider>
      <article>
        <ListBar onViewSelect={handleViewTypeSelect} viewType={viewType} />
        <section>
          <Outlet />
        </section>
      </article>
    </ShipListProvider>
  );
};

ListView.displayName = 'ListView';
