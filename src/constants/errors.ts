export const authErrors = {
  duplicate: (key: string) => `${key} is already taken`,
  unauthorized: () => `Unauthorized`,
  credentialMismatch: () => `Wrong credentials`,
};

export const accessError = {
  forbidden: () => `Cannot access`,
};

export const resourceError = {
  notFound: (resource: string = "") => `${resource} not found`,
};
