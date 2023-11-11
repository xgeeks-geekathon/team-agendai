import React, { Attributes } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Grid } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import { DialogContext } from '@core/contexts';
import { useDictionary } from '@core/hooks/useDictionary';
import { BodyLoading } from '@core/components/layout/BodyLoading';
import { useAttributes } from '@modules/Attributes/hooks/useAttributes';
import { useCharacters } from '@modules/Characters/hooks/useCharacters';

import { ButtonGroupField } from '../components/ButtonGroupField';

type FormCrud = Boards.Generate;

type Fields = keyof (FormCrud & {
  submit: boolean;
});


interface Props {
  defaultValues?: Partial<FormCrud>;
  onSubmitRequest: (values: Boards.Generate) => void;
  onSubmitButtonText: string;
  disabledFields?: Array<Fields>;
  hiddenFields?: Array<Fields>;
  characters: Characters.Character[];
  globalCharacters: Attributes.Attribute[];
  environments: Attributes.Attribute[];
  parameters: Attributes.Attribute[];
}

const DEFAULT_VALUES: Partial<FormCrud> = {
  characters: [],
  globalCharacters: [],
  environments: [],
  parameters: [],
};

const BoardFormForm: React.FC<Props> = ({
  defaultValues = {},
  onSubmitRequest,
  onSubmitButtonText,
  disabledFields,
  hiddenFields,
  characters,
  globalCharacters,
  environments,
  parameters,
}) => {

  const { openDialog } = React.useContext(DialogContext);
  const dictionary = useDictionary();

  const { handleSubmit, control, formState: { isSubmitting } } = useForm<FormCrud>({
    defaultValues: {
      ...DEFAULT_VALUES,
      ...defaultValues,
      characters: characters.map(c => c.id),
    },
  });

  const isFieldDisabled = React.useCallback((field: Fields) => {
    if (!disabledFields) {
      return false;
    }
    return disabledFields.indexOf(field) !== -1;
  }, [disabledFields]);

  const isFieldVisible = React.useCallback((field: Fields) => {
    if (!hiddenFields) {
      return true;
    }
    return hiddenFields.indexOf(field) === -1;
  }, [hiddenFields]);

  const onSubmit = React.useCallback(async (data: FormCrud) => {
    try {
      await onSubmitRequest(data);
    } catch (err) {
      console.error(err);
    }
  }, [onSubmitRequest]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        {isFieldVisible('characters') && (
          <Grid item xs={12}>
            <Controller
              name="characters"
              control={control}
              render={({ field, fieldState }) => (
                <ButtonGroupField
                  label={dictionary.forms.board.fieldCharacters}
                  value={field.value}
                  onChange={field.onChange}
                  list={characters}
                  onAddClick={() => openDialog('createCharacter')}
                  onAddLabel="Add child"
                />
              )}
            />
          </Grid>
        )}
        {isFieldVisible('environments') && (
          <Grid item xs={12}>
            <Controller
              name="environments"
              control={control}
              rules={{ required: dictionary.forms.validations.required }}
              render={({ field, fieldState }) => (
                <ButtonGroupField
                  showAvatar
                  label={dictionary.forms.board.fieldEnvironment}
                  value={field.value}
                  onChange={field.onChange}
                  valueKey="name"
                  list={environments}
                  error={!!fieldState.error}
                  message={fieldState.error?.message}
                  onAddClick={() => openDialog('createCustomAttribute', {
                    title: dictionary.forms.board.customAttributesForm.environment.title,
                    onSubmit: (value: string) => field.onChange([...field.value, value]),
                    buttonLabel: dictionary.forms.board.customAttributesForm.environment.button,
                  })}
                  onAddLabel={dictionary.forms.board.customAttributesForm.addCustomButton}
                />
              )}
            />
          </Grid>
        )}
        {isFieldVisible('globalCharacters') && (
          <Grid item xs={12}>
            <Controller
              name="globalCharacters"
              control={control}
              render={({ field, fieldState }) => (
                <ButtonGroupField
                  showAvatar
                  label={dictionary.forms.board.fieldGlobalCharacters}
                  value={field.value}
                  onChange={field.onChange}
                  list={globalCharacters}
                  onAddClick={() => openDialog('createCustomAttribute', {
                    title: dictionary.forms.board.customAttributesForm.globalCharacters.title,
                    onSubmit: (value: string) => field.onChange([...field.value, value]),
                    buttonLabel: dictionary.forms.board.customAttributesForm.globalCharacters.button,
                  })}
                  onAddLabel={dictionary.forms.board.customAttributesForm.addCustomButton}
                />
              )}
            />
          </Grid>
        )}
        {isFieldVisible('parameters') && (
          <Grid item xs={12}>
            <Controller
              name="parameters"
              control={control}
              render={({ field, fieldState }) => (
                <ButtonGroupField
                  label={dictionary.forms.board.fieldCoreValues}
                  value={field.value}
                  onChange={field.onChange}
                  list={parameters}
                  onAddClick={() => openDialog('createCustomAttribute', {
                    title: dictionary.forms.board.customAttributesForm.value.title,
                    onSubmit: (value: string) => field.onChange([...field.value, value]),
                    buttonLabel: dictionary.forms.board.customAttributesForm.value.button,
                  })}
                  onAddLabel={dictionary.forms.board.customAttributesForm.addCustomButton}
                />
              )}
            />
          </Grid>
        )}

        {isFieldVisible('submit') && (
          <Grid item xs={12}>
            <LoadingButton
              fullWidth
              loading={isSubmitting}
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              disabled={isFieldDisabled('submit')}
            >
              {onSubmitButtonText}
            </LoadingButton>
          </Grid>
        )}
      </Grid>
    </form>
  );
};


export const BoardForm: React.FC<Omit<Props, 'characters' | 'globalCharacters' | 'environments' | 'parameters'>> = (props) => {
  
  const { characters, status: charactersStatus } = useCharacters();
  const { attributes: animals, status: animalsStatus } = useAttributes({
    type: 'animal',
  });
  const { attributes: environments, status: environmentsStatus } = useAttributes({
    type: 'environment',
  });
  const { attributes: coreValues, status: coreValuesStatus } = useAttributes({
    type: 'corevalue',
  });

  const isLoading = [charactersStatus, animalsStatus, environmentsStatus, coreValuesStatus].some(status => status === 'pending');

  if (isLoading) {
    return <BodyLoading />;
  }

  return <BoardFormForm {...props} characters={characters} globalCharacters={animals} environments={environments} parameters={coreValues} />;
};
