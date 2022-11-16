module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  rules: {
    "vue/multi-word-component-names": "off",
    // "no-console": process.env.NODE_ENV === "production" ? "error" : "off", // 禁止使用 console 对象方法
    // "no-console": "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off", // 禁用 debugger
    eqeqeq: ["error", "always"], // 要求使用 === 和 !==
    "no-empty-function": "error", // 禁止出现空函数
    "no-empty": "error", // 禁止空块语句
    "no-unused-vars": "error", // 禁止未使用过的变量
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
  },
  overrides: [],
  parser: "vue-eslint-parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: ["plugin:vue/essential", "eslint:recommended", "@vue/prettier"],
};
