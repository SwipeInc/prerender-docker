const prerender = require('prerender');

const forwardHeaders = require('./plugins/forwardHeaders');
const forwardResponseHeaders = require('./plugins/forwardResponseHeaders');
const stripHtml = require('./plugins/stripHtml');
const healthcheck = require('./plugins/healthcheck');
const removePrefetchTags = require('./plugins/removePrefetchTags');
const log = require('./plugins/log');
const consoleDebugger = require('./plugins/consoleDebugger');

const options = {
	pageDoneCheckInterval: process.env.PAGE_DONE_CHECK_INTERVAL || 500,
	pageLoadTimeout: process.env.PAGE_LOAD_TIMEOUT || 20000,
	waitAfterLastRequest: process.env.WAIT_AFTER_LAST_REQUEST || 250,
	chromeFlags: [ '--no-sandbox', '--headless', '--disable-gpu', '--remote-debugging-port=9222', '--hide-scrollbars', '--disable-dev-shm-usage' ],
};
console.log('Starting with options:', options);

const server = prerender(options);

server.use(log);
server.use(healthcheck('_health'));
//server.use(forwardHeaders);
//server.use(forwardResponseHeaders);
server.use(prerender.blockResources());
server.use(prerender.removeScriptTags());
server.use(removePrefetchTags);
server.use(prerender.httpHeaders());
server.use(prerender.sendPrerenderHeader());
if (process.env.DISABLE_CACHE !== "1") {
    console.log("S3 Cache enabled");
    server.use(require('prerender-aws-s3-cache'));
} else {
    console.log("S3 Cache disabled");
}
if (process.env.DEBUG_PAGES) {
	server.use(consoleDebugger);
}
server.use(stripHtml);

server.start();
