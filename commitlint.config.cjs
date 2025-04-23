module.exports = {
  parserPreset: {
    parserOpts: {
      headerPattern: /^([RB]+-\d+): (.+)$/,
      headerCorrespondence: ['type', 'subject'],
    },
  },
  rules: {
    'type-empty': [2, 'never'],
    'subject-empty': [2, 'never'],
    'subject-case': [2, 'always', 'sentence-case'],
    'header-max-length': [2, 'always', 10000],
    'scope-case': [2, 'always', 'lower-case'],
  },
};
