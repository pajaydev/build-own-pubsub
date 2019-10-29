import resolve from 'rollup-plugin-node-resolve'; // to import node_modules packages easily
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import { uglify } from "rollup-plugin-uglify";

export default {
    input: 'src/index.js',
    output: [
        {
            file: 'dist/pubsub-umd.js',
            format: 'umd',
            moduleName: 'Pubsub',
            name: 'Pubsub'
        }
    ],
    plugins: [
        resolve({
            jsnext: true,
            main: true,
            browser: true
        }),
        commonjs({
            include: 'src/**' // support common js modules.
        }),
        babel({
            babelrc: false,
            presets: [['@babel/env', { modules: false }]]
        }),
        uglify()
    ]
};