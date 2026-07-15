const fs = require('fs');
const path = require('path');

// dist/lib/vue.d.ts re-exports each Base*.vue by relative path (TS can't inline
// types from the ambient `*.vue` shim declaration). For that import to resolve in a
// consuming project, the .vue sources need to physically exist at the same relative
// path under dist/ that the declaration file expects.
const srcDir = path.resolve(__dirname, '../src/components/ui');
const destDir = path.resolve(__dirname, '../dist/components/ui');

fs.mkdirSync(destDir, { recursive: true });

for (const file of fs.readdirSync(srcDir)) {
  if (file.endsWith('.vue')) {
    fs.copyFileSync(path.join(srcDir, file), path.join(destDir, file));
  }
}
