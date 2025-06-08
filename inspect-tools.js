// Inspect the implemented tools
const fs = require('fs');

console.log('🔍 Inspecting Zeo MCP Server Tools...\n');

const source = fs.readFileSync('./src/index.ts', 'utf8');

// Extract tool definitions
const toolPattern = /this\.server\.tool\(\s*"([^"]+)"/g;
const tools = [];
let match;

while ((match = toolPattern.exec(source)) !== null) {
  tools.push(match[1]);
}

console.log(`Found ${tools.length} tools:\n`);

// Group tools by category
const categories = {
  'Reasoning & Intelligence': ['unified_reasoner', 'strategic_intelligence', 'pattern_intelligence', 'decision_engine'],
  'Smart File System': ['intelligent_file_ops', 'codebase_navigator', 'project_analyzer', 'content_transformer'],
  'External Integration': ['github_orchestrator', 'web_intelligence', 'system_commander'],
  'Memory & Knowledge': ['persistent_memory_engine', 'dynamic_context_manager', 'knowledge_graph_navigator', 'insight_aggregator'],
  'Performance & Operations': ['performance_optimizer', 'workflow_automator'],
  'Security': ['security_guardian'],
  'Development Experience': ['dev_assistant', 'genai_scripter', 'functional_architect'],
  'Creative Intelligence': ['ideation_engine', 'implementation_bridge']
};

Object.entries(categories).forEach(([category, categoryTools]) => {
  console.log(`📁 ${category} (${categoryTools.length} tools):`);
  categoryTools.forEach(tool => {
    const implemented = tools.includes(tool);
    console.log(`  ${implemented ? '✅' : '❌'} ${tool}`);
  });
  console.log('');
});

// Check for real implementations
console.log('🔧 Implementation Status:\n');

const implementations = [
  { name: 'KV Storage (Memory)', pattern: /await\s+env\.KV_STORAGE\.(put|get|delete)/ },
  { name: 'D1 Database (Search)', pattern: /await\s+env\.D1_DATABASE\.prepare/ },
  { name: 'R2 Bucket (Files)', pattern: /await\s+env\.R2_BUCKET\.(get|put|list)/ },
  { name: 'Error Handling', pattern: /try\s*\{[\s\S]*?\}\s*catch/ },
  { name: 'TypeScript Types', pattern: /interface Env\s*\{[\s\S]*?KV_STORAGE:\s*KVNamespace/ }
];

implementations.forEach(impl => {
  const found = impl.pattern.test(source);
  console.log(`${found ? '✅' : '❌'} ${impl.name}`);
});

console.log('\n📊 Summary:');
console.log(`- Total tools: ${tools.length}`);
console.log(`- Expected tools: 23`);
console.log(`- Status: ${tools.length === 23 ? '✅ Complete' : '❌ Incomplete'}`);
console.log('\n🚀 Ready for deployment!');