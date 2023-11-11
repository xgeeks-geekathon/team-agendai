import React from 'react';
import { noop } from 'lodash';

import { LocalizationContext } from '@core/contexts';

import { useCharacterCrud } from '../hooks/useCharacterCrud';
import { CharacterForm } from './CharacterForm';

export interface Props {
  onSuccess?: (trip: Characters.Character) => void;
}
export const CreateCharacter: React.FC<Props> = ({ onSuccess = noop }) => {

  const { dictionary } = React.useContext(LocalizationContext);

  const { createCharacter } = useCharacterCrud();

  const onSubmit = React.useCallback((data: Characters.Crud) => {
    return createCharacter(data).then(data => {
      onSuccess(data.data);
    });
  }, [createCharacter, onSuccess]);

  return (
    <CharacterForm
      onSubmitRequest={onSubmit}
      onSubmitButtonText={dictionary.characters.create.buttonCreate}
    />
  );
};
