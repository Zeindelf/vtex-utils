
const babel = require('rollup-plugin-babel');
const pkg = require('./package');

const now = new Date();
const banner = `
/**
 * VtexUtils.js v${pkg.version}
 * https://github.com/${pkg.repository}
 *
 * Copyright (c) 2017-${now.getFullYear()} ${pkg.author.name}
 * Released under the ${pkg.license} license
 *
 * Date: ${now.toISOString()}
 */
`;

module.exports = {
  // Export banner
    banner,
    input: 'src/vtex-utils.js',
    output: [
        {
            banner,
            file: 'dist/vtex-utils.js',
            format: 'umd',
            name: 'VTEX.VtexUtils',
        },
        {
            banner,
            file: 'dist/vtex-utils.common.js',
            format: 'cjs',
        },
        {
            banner,
            file: 'dist/vtex-utils.esm.js',
            format: 'es',
        },
    ],
    plugins: [
        babel({
            exclude: 'node_modules/**',
            plugins: ['external-helpers'],
        }),
    ],
};
