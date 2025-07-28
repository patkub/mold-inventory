#!/usr/bin/env node

/**
 * Writes environmnet varibles from wrangler.jsonc to .env
 * 
 * Usage ./wrangler-to-env.js [development|production]
 */

const fs = require('node:fs');

// Parse arguments

if (process.argv.length === 2) {
    console.error('Usage ./wrangler-to-env.js [development|production]');
    process.exit(1);
}

const env = process.argv[2];
if (!(env === "development" || env === "production")) {
    console.error('Environment must be either development or production');
    process.exit(1);
}

try {
    // Read wrangler.jsonc as JSON data
    const data = fs.readFileSync('./wrangler.jsonc', 'utf8');
    const json = JSON.parse(data);

    // Get environment variables
    const envVars = json["env"][env]["vars"];

    // Convert envVars JSON object to "key=value" lines
    const envFileLines = Object.entries(envVars).map((e) => `${e[0]}=${e[1]}`);
    // Join as a string with new lines
    const envFileContent = envFileLines.join("\n");

    // Write content to .env file
    fs.writeFileSync(".env", envFileContent);
} catch (err) {
    console.error(err);
}
