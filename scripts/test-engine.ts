import { generateHeuristicAnalysis, parseGitHubUrl } from '../src/lib/analysis/governance-engine';

const url = 'https://github.com/facebook/react';
console.log('Parsing...');
const parsed = parseGitHubUrl(url);
console.log('Parsed:', parsed);

console.log('Generating heuristic analysis...');
const start = Date.now();
const result = generateHeuristicAnalysis(url, 'facebook', 'react', 0);
console.log('Done in', Date.now() - start, 'ms');
console.log('Governance score:', result.governanceScore.overall);
console.log('Health score:', result.health.overall);
console.log('Keys:', Object.keys(result));
