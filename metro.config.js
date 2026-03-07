const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

// TanStack Query: "exports" and "react-native" point to missing/broken modern/ts builds.
// Force both packages to use the legacy CJS build so Metro can bundle them.
const TANSTACK_LEGACY = {
  '@tanstack/react-query': path.join(
    __dirname,
    'node_modules',
    '@tanstack',
    'react-query',
    'build',
    'legacy',
    'index.cjs'
  ),
  '@tanstack/query-core': path.join(
    __dirname,
    'node_modules',
    '@tanstack',
    'query-core',
    'build',
    'legacy',
    'index.cjs'
  ),
};

config.resolver.resolveRequest = (context, moduleName, platform) => {
  const legacyPath = TANSTACK_LEGACY[moduleName];
  if (legacyPath) {
    try {
      const fs = require('fs');
      if (fs.existsSync(legacyPath)) {
        return { type: 'sourceFile', filePath: legacyPath };
      }
    } catch (_) {}
  }
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
