module.exports = {
  'src/**/*.{ts,json,css,html}': [
    'prettier --write --config .prettierrc.js --ignore-path .prettierignore',
  ],
  'src/*': [
    'eslint --color -c .eslintrc.js --ext .ts .',
  ],
};