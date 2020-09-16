module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-recess-order',
    'stylelint-config-prettier',
    'stylelint-config-css-modules',
  ],
  plugins: ['stylelint-scss'],
  rules: {
    'string-no-newline': null,
    'selector-class-pattern': /[a-z0-9]+(-[a-z0-9]+)*/,
    'selector-id-pattern': /[a-z0-9]+(-[a-z0-9]+)*/,
    'selector-max-universal': 1,
    'selector-max-type': [
      2,
      {
        ignore: ['child', 'descendant', 'compounded'],
      },
    ],
    'at-rule-empty-line-before': [
      'always',
      {
        except: ['blockless-after-same-name-blockless', 'first-nested'],
        ignore: ['after-comment'],
        ignoreAtRules: ['else'],
      },
    ],
    'scss/dollar-variable-colon-space-after': 'always',
    'scss/dollar-variable-colon-space-before': 'never',
    'scss/dollar-variable-no-missing-interpolation': true,
    'scss/dollar-variable-pattern': /[a-z0-9]+(-[a-z0-9]+)*/,
    'scss/double-slash-comment-whitespace-inside': 'always',
    'scss/operator-no-newline-before': true,
    'scss/operator-no-unspaced': true,
    'scss/selector-no-redundant-nesting-selector': true,
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true,
    'rule-empty-line-before': [
      'always',
      {
        except: ['first-nested'],
      },
    ],
    'no-descending-specificity': null,
    'selector-pseudo-element-no-unknown': [
      true,
      {
        ignorePseudoElements: ['v-deep'],
      },
    ],
  },
};
