import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm',
      sourcemap: true,
    },
  ],
  external: [
    'react',
    'react-dom',
    '@fluentui/react-components',
    '@fluentui/react-swatch-picker',
    '@fluentui/react-color-picker',
    '@fluentui/react-input',
    '@fluentui/react-button',
    '@fluentui/react-select',
    '@fluentui/react-icons',
    '@ctrl/tinycolor',
  ],
  plugins: [
    resolve({
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
    }),
    commonjs({
      include: 'node_modules/**',
    }),
    typescript({
      tsconfig: './tsconfig.json',
      sourceMap: true,
      declaration: false,
      exclude: ['**/__tests__/**', '**/*.test.*', '**/*.spec.*'],
    }),
  ],
  onwarn(warning, warn) {
    // Skip certain warnings
    if (warning.code === 'CIRCULAR_DEPENDENCY') return;
    if (warning.code === 'UNUSED_EXTERNAL_IMPORT') return;
    
    // Use default for everything else
    warn(warning);
  },
};
