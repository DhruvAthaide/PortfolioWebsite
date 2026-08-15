import { build } from 'esbuild';
import path from 'node:path';

// Transpiles a TS module (types stripped, no bundling) and imports it in-process.
// Used by build scripts that need real data from src/**.ts without a full app build.
export async function loadTsModule(relativePath) {
  const entry = path.resolve(process.cwd(), relativePath);
  const result = await build({
    entryPoints: [entry],
    bundle: false,
    write: false,
    format: 'esm',
    platform: 'node',
    target: 'node18',
    logLevel: 'silent',
  });
  const code = result.outputFiles[0].text;
  const dataUrl = 'data:text/javascript;base64,' + Buffer.from(code, 'utf8').toString('base64');
  return import(dataUrl);
}
