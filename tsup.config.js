import { defineConfig } from 'tsup';

export default defineConfig({
  entry: { index: 'src/index.jsx' },
  outDir: 'dist',
  format: ['cjs', 'esm'],
  external: ['react', 'react-dom']
});