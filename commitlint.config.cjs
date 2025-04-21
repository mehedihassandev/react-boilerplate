module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', ['RB']],
    'type-case': [0], // Disable type-case enforcement
    'subject-case': [0], // Disable subject-case enforcement
    'header-max-length': [2, 'always', 10000],
    'scope-empty': [0],
    'scope-case': [2, 'always', 'lower-case'],
  },
};
