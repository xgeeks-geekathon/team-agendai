import React, { FC, useMemo } from 'react';
import { Avatar, Badge } from '@mui/material';
import { Image, Edit } from '@mui/icons-material';

import { imageMimes } from '@core/helpers/file';
import { FileUploader } from '@core/components/FileUploader';
import { AuthContext } from '@modules/Auth/contexts';

interface Props {
  label: string;
  value?: string | File;
  disabled?: boolean;
  onChange: (file: File) => void;
}

export const PictureUploader: FC<Props> = React.forwardRef(({ value, label, disabled, onChange }, ref: React.Ref<HTMLInputElement>) => {

  const { user } = React.useContext(AuthContext);
  const photoUrl = useMemo(() => {
    if (!value) {
      return user?.profilePicture;
    }

    return typeof value === 'string' ? value : URL.createObjectURL(value);
  }, [value, user]);

  return (
    <FileUploader
      {...ref}
      name="button-picture"
      label={label}
      disabled={disabled}
      inputProps={{
        accept: [...imageMimes].join(','),
        multiple: false,
      }}
      buttonRender={() => (
        <Badge
          overlap="circular"
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          badgeContent={!disabled ? (
            <Avatar
              sx={theme => ({
                width: theme.spacing(3),
                height: theme.spacing(3),
                border: `2px solid ${theme.palette.background.paper}`,
                padding: '3px',
              })}
            >
              <Edit style={{ width: '100%', height: '100%' }}/>
            </Avatar>
          ) : null}
        >
          <Avatar
            alt="Profile picture"
            src={photoUrl}
            sx={theme => ({
              width: 130,
              height: 130,
              border: '1px solid transparent',
              cursor: disabled ? 'default': 'pointer',
              '&:hover': {
                borderColor: disabled ? 'transparent' : theme.palette.getContrastText(theme.palette.background.paper),
              },
            })}
          >
            <Image/>
          </Avatar>
        </Badge>
      )}
      onChange={files => onChange(files[0])}
    />
  );
});
