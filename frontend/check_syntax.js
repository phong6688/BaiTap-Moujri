import ts from 'typescript';
import fs from 'fs';
import path from 'path';

const currentDir = process.cwd();
const srcPagesDir = path.join(currentDir, 'src', 'Pages');
const srcComponentsDir = path.join(currentDir, 'src', 'components');

const files = fs.readdirSync(srcPagesDir)
  .filter(f => f.endsWith('.tsx'))
  .map(f => path.join(srcPagesDir, f));

// Also check components
const componentFiles = fs.readdirSync(srcComponentsDir)
  .filter(f => f.endsWith('.tsx'))
  .map(f => path.join(srcComponentsDir, f));

const allFiles = [...files, ...componentFiles, path.join(currentDir, 'src', 'App.tsx'), path.join(currentDir, 'src', 'main.tsx')];

console.log(`Checking ${allFiles.length} files...`);

const program = ts.createProgram(allFiles, {
  jsx: ts.JsxEmit.ReactJSX,
  target: ts.ScriptTarget.ES2022,
  module: ts.ModuleKind.ESNext,
  moduleResolution: ts.ModuleResolutionKind.Node10,
  skipLibCheck: true,
  noEmit: true
});

const diagnostics = ts.getPreEmitDiagnostics(program);

if (diagnostics.length === 0) {
  console.log('No syntax or compilation errors found!');
} else {
  console.log(`Found ${diagnostics.length} diagnostics:\n`);
  diagnostics.forEach(diagnostic => {
    if (diagnostic.file) {
      const { line, character } = ts.getLineAndCharacterOfPosition(diagnostic.file, diagnostic.start);
      const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');
      console.log(`${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`);
    } else {
      console.log(ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n'));
    }
  });
}
