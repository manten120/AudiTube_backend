// eslint-disable-next-line import/no-commonjs
module.exports = {
  env: {
    es2021: true,
    node: true,
    'jest/globals': true, // eslint-plugin-jest https://www.npmjs.com/package/eslint-plugin-jest
  },

  extends: [
    'airbnb-base', // eslint-config-airbnb-base JSのコーディングルール https://github.com/airbnb/javascript
    'plugin:import/recommended', // importに関するルール。pluginsに書いてもよいが'plugin:import/typescript'に合わせてここに書いた。https://github.com/import-js/eslint-plugin-import
    'plugin:import/typescript', // TypeScriptのimportのパスを解決する。pluginsに書くと他のimportのrulesが無効になってしまうのでここに書いた。https://www.npmjs.com/package/eslint-import-resolver-typescript https://github.com/import-js/eslint-plugin-import#typescript
    'prettier', // eslint-config-prettier prettierと競合するルールをオフにする。TypeScriptに関するルールも含む() https://github.com/prettier/eslint-config-prettier prettier/@typescript-eslint は不要 https://github.com/prettier/eslint-config-prettier#installation のNoteに書いてある
  ],

  parser: '@typescript-eslint/parser', // TypeScriptのパーサー。@typescript-eslint/eslint-pluginを使うときに必要。https://github.com/typescript-eslint/typescript-eslint/tree/b9407c560c8ab625fd546af73f71cce8178b9e05/packages/parser

  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module',
  },

  plugins: [
    '@typescript-eslint', // @typescript-eslint/eslint-plugin TypeScriptのLintルール https://www.npmjs.com/package/@typescript-eslint/eslint-plugin
    'prefer-arrow-functions',
    'jest', // eslint-plugin-jest https://www.npmjs.com/package/eslint-plugin-jest
  ],

  rules: {
    'import/no-commonjs': 'error', // require, module.exportを禁止してimport, export に統一する。https://github.com/import-js/eslint-plugin-import/blob/HEAD/docs/rules/no-commonjs.md
    'import/prefer-default-export': 'off', // 名前付きエクスポートを許可する
    'import/no-default-export': 'error', // defaultエクスポートを禁止する
    'import/extensions': [
      // https://github.com/import-js/eslint-plugin-import/blob/HEAD/docs/rules/extensions.md
      // https://stackoverflow.com/questions/62953124/configure-eslint-to-parse-ts-and-tsx-as-typescript-and-js-and-jsx-as-ecmascr
      'error',
      'always', // すべてのimportで拡張子の省略を禁止する
      {
        js: 'never', // .jsは省略可
        ts: 'never', // .tsは省略可
      },
    ],

    'prefer-arrow-functions/prefer-arrow-functions': [
      // 関数をアロー関数に統一する。参考: https://www.npmjs.com/package/eslint-plugin-prefer-arrow-functions
      'error',
      {
        classPropertiesAllowed: true,
        disallowPrototype: true,
        returnStyle: 'implicit',
        singleReturnOnly: false,
      },
    ],

    // ESLintの標準だとTypeScriptで型定義にもno-unused-varsのエラーが出てしまうのを直す
    // https://tech.motoki-watanabe.net/entry/2020/09/23/011526
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      // 未使用の変数・定数の定義を禁止する https://eslint.org/docs/rules/no-unused-vars
      'error',
      {
        vars: 'all',
        args: 'all',
        argsIgnorePattern: '^_', // ただしアンダースコアで始まる名前のパラメータは許可する https://eslint.org/docs/rules/no-unused-vars#argsignorepattern
      },
    ],


    '@typescript-eslint/explicit-module-boundary-types': 'off', // "exportされた関数やpublicなクラスメソッドの戻り値の型アノテーションを省略可にする https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/explicit-module-boundary-types.md
  },
};
