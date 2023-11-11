import React from 'react';
import { noop } from 'lodash';

import { LocalizationContext } from '@core/contexts';

import { useCharacterCrud } from '../hooks/useCharacterCrud';
import { CharacterForm } from './CharacterForm';

export interface Props {
  character: Characters.Character;
  onSuccess?: (contact: Characters.Character) => void;
}
export const EditCharacter: React.FC<Props> = ({ character, onSuccess = noop }) => {

  const { dictionary } = React.useContext(LocalizationContext);

  const { editCharacter } = useCharacterCrud();

  const onSubmit = React.useCallback((data: Characters.Crud) => {
    return editCharacter({
      id: character.id,
      ...data,
    }).then(data => {
      onSuccess(data.data);
    });
  }, [character, editCharacter, onSuccess]);

  return (
    <CharacterForm
      defaultValues={character}
      onSubmitRequest={onSubmit}
      onSubmitButtonText={dictionary.characters.edit.buttonEdit}
    />
  );
};
