module.exports = {
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                indentWidth: 4,
                includePaths: ['src/'],
              },
            },
          },
        ],
      },
    ],
  },
};
