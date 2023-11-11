import React from 'react';
import {
  Avatar,
  Box,
  Button,
  CardContent,
  Collapse,
  FormHelperText,
  IconButton,
  InputLabel,
} from '@mui/material';
import { Add } from '@mui/icons-material';

type Value = {
  id: number | string;
  name: string;
  picture?: {
    data: MT.MaybeNull<{
      id: number;
      attributes: {
        url: string;
      }
    }>;
  }; 
}

interface Props {
  label: string;
  value: (number | string)[];
  list: Value[];
  valueKey?: keyof Pick<Value, 'id' | 'name'>;
  onChange: (values: (number | string)[]) => void;
  error?: boolean;
  message?: string;
  onAddClick?: () => void;
  onAddLabel?: string;
  showAvatar?: boolean;
}

export const ButtonGroupField: React.FC<Props> = ({ label, value, valueKey = 'id', onChange, list, error, message, onAddClick, onAddLabel, showAvatar = false }) => {

  const canCollapse = React.useMemo(() => list.length > 8, [list]);
  const [expanded, setExpanded] = React.useState(!canCollapse);

  const customItems = React.useMemo(() => {
    let customList: string[] = [];
    
    value.forEach(v => {
      const item = list.find(item => item[valueKey] === v);

      if (!item) {
        customList.push(v.toString());
      }
    });

    return customList;
  }, [list, value, valueKey]);

  const _onChange = React.useCallback((attribute: Value) => {
    if (value.includes(attribute[valueKey])) {
      onChange(value.filter(v => v !== attribute[valueKey]));
    } else {
      onChange([...value, attribute[valueKey]]);
    }
  }, [value, valueKey, onChange]);

  return (
    <React.Fragment>
      <Box mb={1}>
        <InputLabel shrink={false}>{label}</InputLabel>
      </Box>
      <Collapse in={expanded} collapsedSize={canCollapse ? 80 : 0} timeout="auto">
        {onAddClick && (
          <Button
            variant="outlined"
            color="secondary"
            size="small"
            onClick={onAddClick}
            sx={{ pl: '6px', mb: 1, mr: 1 }}
            startIcon={<Add />}
          >
            {onAddLabel}
          </Button>
        )}
        {customItems.map(custom => (
          <Button
            key={custom}
            variant="contained"
            color="secondary"
            size="small"
            onClick={() => _onChange({ id: custom, name: custom })}
            sx={{ pl: '6px', mb: 1, mr: 1 }}
          >
            {custom}
          </Button>
        ))}
        {list.map(item => (
          <Button
            key={item.id}
            variant={value.includes(item[valueKey]) ? 'contained' : 'outlined'}
            color={error ? 'error' : 'secondary'}
            size="small"
            onClick={() => _onChange(item)}
            startIcon={showAvatar && <Avatar src={import.meta.env.VITE__MEDIA_URL + item.picture?.data?.attributes.url} sx={{ width: 24, height: 24 }}/>}
            sx={{ pl: showAvatar ? '6px' : 1, mb: 1, mr: 1 }}
          >
            {item.name}
          </Button>
        ))}
      </Collapse>
      {message && (
        <FormHelperText error={error}>{message}</FormHelperText>
      )}
      {canCollapse && (
        <React.Fragment>
          {expanded ? (
            <Button variant="text" size="small" color="secondary" onClick={() => setExpanded(false)}>See less</Button>
          ) : (
            <Button variant="text" size="small" color="secondary" onClick={() => setExpanded(true)}>See more</Button>
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};
