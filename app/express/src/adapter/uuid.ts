import crypto from 'crypto';

export const createUUID = () => {
  // crypto.randomUUID()はnpm packageのuuidより3倍早くuuidを生成できる
  // 参考 crypto.randomUUID is three times faster uuid.v4 https://dev.to/galkin/crypto-randomuuid-vs-uuid-v4-47i5?utm_source=dormosheio&utm_campaign=dormosheio
  const uuid = crypto.randomUUID();
  return uuid;
};
