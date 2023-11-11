import React from 'react';
import { Box, FormControl, FormHelperText, InputLabel, TextFieldProps, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { Groups, Public, VisibilityOff } from '@mui/icons-material';
import { CloseNetworkIcon } from '@shared/assets/CloseNetworkIcon';


export type Props = Pick<TextFieldProps, 'error' | 'label' | 'helperText'> & {
  value: string;
  onChange: (value: string) => void;
};

export const VisibilityToggleField: React.FC<Props> = ({ value, label, error, helperText, onChange }) => (
  <FormControl error={!!error} fullWidth>
    <InputLabel htmlFor="visibility-input">{label}</InputLabel>
    <Box pt={1}>
      <ToggleButtonGroup
        id="visibility-input"
        value={value}
        onChange={(e, value) => value !== null && onChange(value)}
        fullWidth
        exclusive
        color={error ? 'error' : 'secondary'}
        size="small"
      >
        <ToggleButton value="public">
          <Public />
        </ToggleButton>
        <ToggleButton value="general-network">
          <Groups />
        </ToggleButton>
        <ToggleButton value="close-network">
          <CloseNetworkIcon />
        </ToggleButton>
        <ToggleButton value="hidden">
          <VisibilityOff />
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
    {error && (
      <FormHelperText error>{helperText}</FormHelperText>
    )}
  </FormControl>
);
