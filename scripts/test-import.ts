console.log('start');
import { parseGitHubUrl } from '../src/lib/analysis/governance-engine';
console.log('imported');
const r = parseGitHubUrl('https://github.com/facebook/react');
console.log('result:', r);
