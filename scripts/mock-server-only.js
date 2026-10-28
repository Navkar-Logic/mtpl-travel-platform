// Mock server-only module for offline test runs
try {
  const resolved = require.resolve("server-only");
  require.cache[resolved] = {
    id: resolved,
    filename: resolved,
    loaded: true,
    exports: {},
  };
} catch {
  // If server-only is not installed or already mocked, do nothing
}
