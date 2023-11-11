import React from 'react';

import { useQueryState } from '@core/hooks/useQueryState';
import { AsyncConfirmationDialog, AsyncConfirmationProps } from '@core/components/dialogs/AsyncConfirmationDialog';

import config from '@shared/config';

import { LocalizationContext } from '../LocalizationContext';

import { ContextProps, AsyncConfirmation } from './DialogContext.types';

const defaultContext: ContextProps = {
  openedDialogs: {},
  openDialog: () => {},
  closeDialog: () => {},
  asyncConfirmation: () => Promise.resolve(false),
  dialogOptions: {},
};

const defaultAsyncConfirmationDialog = {
  title: null,
  content: null,
  confirmLabel: null,
  cancelLabel: null,
  show: false,
};

export const DialogContext = React.createContext(defaultContext);

export const DialogProvider: React.FC<React.PropsWithChildren> = ({ children }) => {

  const { dictionary } = React.useContext(LocalizationContext);

  const [queryDialogs = [], setDialogs] = useQueryState<MT.Dialogs.Dialog[]>('dialog');
  const [dialogOptions, setDialogOptions] = React.useState<Partial<Record<MT.Dialogs.Dialog, MT.Dialogs.Options>>>({});

  const dialogs: MT.Dialogs.Dialog[] = React.useMemo(() => {
    return typeof queryDialogs === 'string' ? [queryDialogs] : queryDialogs;
  }, [queryDialogs]);

  const openedDialogs: Partial<Record<MT.Dialogs.Dialog, boolean>> = React.useMemo(() => {
    return config.dialogs.reduce((acc, curr) => ({
      ...acc,
      [curr]: dialogs.includes(curr),
    }), {});
  }, [dialogs]);

  const openDialog = React.useCallback((dialog: MT.Dialogs.Dialog, options?: MT.Dialogs.Options) => {
    setDialogs([...dialogs, dialog]);
    setDialogOptions(prevOptions => ({
      ...prevOptions,
      [dialog]: options,
    }));
  }, [dialogs, setDialogs]);

  const closeDialog = React.useCallback((dialog: MT.Dialogs.Dialog) => {
    setDialogs(dialogs.filter(d => d !== dialog) as MT.Dialogs.Dialog[]);

    const options = { ...dialogOptions };

    delete options[dialog];

    setDialogOptions(options);
  }, [dialogs, setDialogs, dialogOptions]);

  const [popup, setPopup] = React.useState<AsyncConfirmationProps>(defaultAsyncConfirmationDialog);
  const [onConfirmPopup, setOnConfirmPopup] = React.useState<() => void>(() => null);
  const [onCancelPopup, setOnCancelPopup] = React.useState<() => void>(() => null);
  const [onClosePopup, setOnClosePopup] = React.useState<() => void>(() => null);

  const asyncConfirmation: AsyncConfirmation = React.useCallback(({ title, content, confirmLabel, cancelLabel }) => {
    setPopup({
      show: true,
      title: title || dictionary.dialogs.defaultTitle,
      content: content || content === null ? content : dictionary.dialogs.defaultContent,
      confirmLabel: confirmLabel || dictionary.dialogs.buttonYes,
      cancelLabel: cancelLabel || dictionary.dialogs.buttonNo,
    });
    return new Promise((resolve) => {
      setOnConfirmPopup(() => () => [setPopup(defaultAsyncConfirmationDialog), resolve(true)]);
      setOnCancelPopup(() => () => [setPopup(defaultAsyncConfirmationDialog), resolve(false)]);
      setOnClosePopup(() => () => [setPopup(defaultAsyncConfirmationDialog), resolve(false)]);
    });
  }, [dictionary]);

  return (
    <DialogContext.Provider
      value={{
        openedDialogs,
        openDialog,
        closeDialog,
        asyncConfirmation,
        dialogOptions,
      }}
    >
      {children}

      <AsyncConfirmationDialog
        open={popup.show}
        onClose={onClosePopup}
        onConfirm={onConfirmPopup}
        onCancel={onCancelPopup}
        title={popup.title}
        content={popup.content}
        confirmLabel={popup.confirmLabel}
        cancelLabel={popup.cancelLabel}
      />
    </DialogContext.Provider>
  );
};

export const DialogConsumer = DialogContext.Consumer;
