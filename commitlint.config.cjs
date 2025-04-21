module.exports = {
  parserPreset: {
    parserOpts: {
      headerPattern: /^([RB]+-\d+): (.+)$/,
      headerCorrespondence: ['type', 'subject'],
    },
  },
  rules: {
    // Remove or disable type-enum check (since we're handling it with regex already)
    'type-enum': [0],
    'type-empty': [2, 'never'],
    'subject-empty': [2, 'never'],
    'subject-case': [2, 'always', 'sentence-case'],
    'header-max-length': [2, 'always', 100],
    'type-case': [0],
    'scope-empty': [0],
    'scope-case': [2, 'always', 'lower-case'],
  },
};
