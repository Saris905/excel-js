module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                targets: { // babel нужен еще на время запуска node
                    node: 'current'
                }
            }
        ]
    ],
    plugins: ['@babel/plugin-proposal-class-properties']
};
