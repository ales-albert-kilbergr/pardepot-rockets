import * as React from 'react';

export type ITableViewComponent = React.FC;

export const TableView: ITableViewComponent = (props) => {
  return (
    <article>
      <header>
        <h2>Table view</h2>
      </header>
    </article>
  );
};

TableView.displayName = 'TableView';
