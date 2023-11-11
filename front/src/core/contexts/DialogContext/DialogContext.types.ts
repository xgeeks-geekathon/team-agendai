import { AsyncConfirmationProps } from '../../components/dialogs/AsyncConfirmationDialog';

export type ContextProps = {
  openedDialogs: Partial<Record<MT.Dialogs.Dialog, boolean>>;
  openDialog: (dialog: MT.Dialogs.Dialog, options?: MT.Dialogs.Options) => any;
  closeDialog: (dialog: MT.Dialogs.Dialog) => any;
  asyncConfirmation: AsyncConfirmation;
  dialogOptions: Partial<Record<MT.Dialogs.Dialog, MT.Dialogs.Options>>;
};

export type AsyncConfirmation = (props: AsyncConfirmationProps) => Promise<boolean>;
