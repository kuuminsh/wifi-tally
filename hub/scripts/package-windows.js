const fs = require('fs')
const path = require('path')
const { spawnSync } = require('child_process')

const projectDir = path.resolve(__dirname, '..')
const distDir = path.join(projectDir, 'dist')
const frontendDir = path.join(distDir, 'frontend')

fs.rmSync(frontendDir, { recursive: true, force: true })
fs.cpSync(path.join(projectDir, 'build'), frontendDir, { recursive: true })

const result = spawnSync(
  process.platform === 'win32' ? 'npx.cmd' : 'npx',
  ['pkg', 'dist/server.js', '--targets', 'node16-win-x64', '--output', 'dist/vtally.exe'],
  { cwd: projectDir, stdio: 'inherit' },
)

if (result.error) {
  throw result.error
}
process.exit(result.status ?? 1)