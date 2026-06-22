const { execSync } = require('child_process');
try {
  const output = execSync('git log -p -n 10 src/components/ResourceHub.tsx | grep -E "id:|title:|category:"').toString();
  require('fs').writeFileSync('git_history.txt', output);
} catch (e) {
  require('fs').writeFileSync('git_history.txt', e.message);
}
