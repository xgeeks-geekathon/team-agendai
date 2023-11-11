export const mapUserData = (data: Users.UserApi): Users.UserApi => ({
  ...data,
  subscriptionEndsAt: data.subscriptionEndsAt ? new Date(data.subscriptionEndsAt) : null,
  createdAt: new Date(data.createdAt),
  updatedAt: new Date(data.updatedAt),
});
