const Sentry = require("@sentry/node");

export function logError(error: any, scope: any) {
  console.log({
    function: scope?.tags?.function,
    metadata: scope.metadata,
    error: error,
  });
}
