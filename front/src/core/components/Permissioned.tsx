import React from 'react';

import { PermissionContext, LocalizationContext } from '@core/contexts';
import { MessageFeedbackView } from '@core/components/MessageFeedbackView';

type Props = React.PropsWithChildren<{
  permission: MT.Permission.PermissionKey;
  feedbackComponent?: React.ReactNode;
}>;

export const Permissioned: React.FC<Props> = ({ permission, feedbackComponent= null, children }) => {

  const { getPermission } = React.useContext(PermissionContext);

  const hasPermission = React.useMemo(() => getPermission(permission), [getPermission, permission]);

  if (hasPermission) {
    return (
      <React.Fragment>
        {children}
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      {feedbackComponent}
    </React.Fragment>
  );
};

export const PermissionedView: React.FC<Props> = props => {
  const { dictionary } = React.useContext(LocalizationContext);

  return (
    <Permissioned
      {...props}
      feedbackComponent={<MessageFeedbackView height="100vh" message={dictionary.errors.noPagePermission}/>}
    />
  );
};
