import { defineConfig } from 'rollup';
import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { dts } from 'rollup-plugin-dts';

export default defineConfig([
  // Main bundle
  {
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
      '@fluentui/react-button',
      '@fluentui/react-color-picker',
      '@fluentui/react-icons',
      '@fluentui/react-input',
      '@fluentui/react-select',
      '@fluentui/react-swatch-picker',
      '@ctrl/tinycolor',
    ],
    plugins: [
      nodeResolve(),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        exclude: [
          '**/*.stories.tsx',
          '**/*.stories.ts',
          '**/*.stories.js',
          '**/*.stories.jsx',
          '**/*.test.ts',
          '**/*.test.tsx',
          '**/*.test.js',
          '**/*.test.jsx',
        ],
      }),
    ],
  },
  // Type definitions
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.d.ts',
      format: 'es',
    },
    external: [
      'react',
      'react-dom',
      '@fluentui/react-components',
      '@fluentui/react-button',
      '@fluentui/react-color-picker',
      '@fluentui/react-icons',
      '@fluentui/react-input',
      '@fluentui/react-select',
      '@fluentui/react-swatch-picker',
      '@ctrl/tinycolor',
    ],
    plugins: [
      dts({
        tsconfig: './tsconfig.json',
        exclude: [
          '**/*.stories.tsx',
          '**/*.stories.ts',
          '**/*.stories.js',
          '**/*.stories.jsx',
          '**/*.test.ts',
          '**/*.test.tsx',
          '**/*.test.js',
          '**/*.test.jsx',
        ],
      }),
    ],
  },
]);
