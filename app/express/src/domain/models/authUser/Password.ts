import crypto from 'crypto';

export class Password {
  readonly value: string; // ハッシュ値

  private constructor(value: string) {
    this.value = value;
  }

  static readonly createFromHash = (hashedPassword: string) => {
    const isSameFormatStringAsHashedValue = /^[0-9a-zA-Z]{64}$/.test(
      hashedPassword
    );
    if (!isSameFormatStringAsHashedValue) {
      throw new Error('Passwordの値はハッシュ値です');
    }
    return new this(hashedPassword);
  };

  static readonly createFromPlain = (plainPassword: string) => {
    if (!/^[0-9a-zA-Z.!_/`()[\]+-=$#&@~]*$/.test(plainPassword)) {
      throw new Error(
        'パスワードに使える文字は半角英数と.!_/`()[]+-=$#&@~です'
      );
    }
    if (plainPassword.length >= 8 && plainPassword.length <= 64) {
      throw new Error('パスワードは8文字以上64文字以下です');
    }
    const hashedPassword = this.hash(plainPassword);
    return new this(hashedPassword);
  };

  private static hash = (plainPassword: string) => {
    const salt = process.env.HASH_SALT;
    const hashedPassword = crypto
      .createHash('sha256')
      .update(plainPassword + salt, 'utf8')
      .digest('hex');
    return hashedPassword;
  };

  readonly equals = (password: Password) => {
    if (this.value === password.value) {
      return true;
    }
    return false;
  };
}
