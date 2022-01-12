import crypto from 'crypto';

export const createUUID = () => {
  const uuid = crypto.randomUUID();
  return uuid;
};
