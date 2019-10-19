import resolve from 'rollup-plugin-node-resolve'; // to import node_modules packages easily
import commonjs from 'rollup-plugin-commonjs';
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
            include: 'src/**'
        })
    ]
};