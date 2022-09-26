import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export interface IShipTypeFilterProps {
  shipTypes: string[];
  onFilter: (shipType: string) => void;
}

export type ShipTypeFilterComponent = React.FC<IShipTypeFilterProps>;

export const ShipTypeFilter: ShipTypeFilterComponent = (props) => {
  const handleChange = React.useCallback(
    (event: SelectChangeEvent) => {
      props.onFilter(event.target.value);
    },
    [props.onFilter]
  );

  return (
    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id="demo-simple-select-standard-label">ShipType</InputLabel>
      <Select label="ShipType" onChange={handleChange}>
        <MenuItem value="">
          <em>---</em>
        </MenuItem>
        {props.shipTypes.map((shipType) => (
          <MenuItem value={shipType}>{shipType}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

ShipTypeFilter.displayName = 'ShipTypeFilter';

ShipTypeFilter.defaultProps = {};
