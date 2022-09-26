import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { FormattedMessage } from 'react-intl';
import { ROCKETS_UI_MESSAGES } from '../ui.messages';

export interface IShipTypeFilterProps {
  shipTypes: string[];
  onFilter: (shipType: string) => void;
}

export type ShipTypeFilterComponent = React.FC<IShipTypeFilterProps>;

export const ShipTypeFilter: ShipTypeFilterComponent = ({
  onFilter,
  shipTypes,
}) => {
  const handleChange = React.useCallback(
    (event: SelectChangeEvent) => {
      onFilter(event.target.value);
    },
    [onFilter]
  );

  return (
    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id="demo-simple-select-standard-label">
        <FormattedMessage {...ROCKETS_UI_MESSAGES.shipTypeFilter} />
      </InputLabel>
      <Select label="ShipType" onChange={handleChange}>
        <MenuItem value="">
          <em>---</em>
        </MenuItem>
        {shipTypes.map((shipType) => (
          <MenuItem value={shipType}>{shipType}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

ShipTypeFilter.displayName = 'ShipTypeFilter';

ShipTypeFilter.defaultProps = {};
