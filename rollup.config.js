var nodeResolve = require('rollup-plugin-node-resolve');
import replace from 'rollup-plugin-replace';
import commonjs from 'rollup-plugin-commonjs';
import rollupTypescript from 'rollup-plugin-typescript';
import typescript from 'typescript';

export default {
    entry: 'src/app/index.tsx',
    format: 'iife',
    moduleName: 'main',
    onwarn: (error) => {
      // output error in red, then exit the process
      console.error('\x1b[41m', 'ERROR: ', error, '\x1b[0m');
      process.exit(-1);
    },
    plugins: [
        replace({
            'process.env.NODE_ENV': JSON.stringify( 'development' ), // used in react
        }),
        rollupTypescript({
            typescript: typescript,
            jsx: "react"
        }),
        nodeResolve({
            jsnext: true,
            browser: true,
            main: true,
            preferBuiltins: false,
        }),
        commonjs({
            include: 'node_modules/**',
            namedExports: {
                'node_modules/react/react.js': ['Component', 'PropTypes', 'createElement'],
                'node_modules/react-dom/index.js': ['findDOMNode', 'render'],
                'node_modules/lodash/lodash.js': ['merge', 'clone'],
            }
        }),
        // builtins(),
    ]
};
