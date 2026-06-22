import { execSync } from 'child_process';
import fs from 'fs';

try {
  let result = "HISTORY FOR ABOUT.TSX:\n\n";
  result += execSync('git log -p src/components/About.tsx').toString();
  
  result += "\n\nHISTORY FOR PROGRAM.TSX:\n\n";
  result += execSync('git log -p src/components/Program.tsx').toString();

  fs.writeFileSync('/history.txt', result);
} catch (e) {
  fs.writeFileSync('/history.txt', e.toString());
}
