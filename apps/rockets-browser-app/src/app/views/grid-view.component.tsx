import * as React from 'react';

export type IGridViewComponent = React.FC;

export const GridView: IGridViewComponent = (props) => {
  return (
    <article>
      <header>
        <h2>Grid view</h2>
      </header>
    </article>
  );
};

GridView.displayName = 'GridView';
