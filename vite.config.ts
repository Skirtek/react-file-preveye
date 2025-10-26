import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'

export default defineConfig({
    plugins: [
        react(),
        dts({
            insertTypesEntry: true,
            include: ['src'],
            exclude: ['**/*.test.ts', '**/*.test.tsx', '**/*.spec.ts', '**/*.spec.tsx'],
        }),
    ],
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'ReactFilePreveye',
            formats: ['es', 'cjs'],
            fileName: (format) => `react-file-preveye.${format}.js`,
        },
        rollupOptions: {
            external: ['react', 'react-dom', 'react/jsx-runtime', 'styled-components', 'mammoth', 'xlsx'],
            output: {
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM',
                    'react/jsx-runtime': 'jsxRuntime',
                    'styled-components': 'styled',
                    mammoth: 'mammoth',
                    xlsx: 'xlsx',
                },
                preserveModules: false,
                exports: 'named',
            },
        },
        sourcemap: true,
        minify: 'esbuild',
        target: 'es2020',
    },
})
