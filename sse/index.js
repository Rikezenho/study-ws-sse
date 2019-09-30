const express = require('express');

const app = express();

function sseDemo(req, res) {
    let messageId = 0;

    const intervalId = setInterval(() => {
        res.write(`id: ${messageId}\n`);
        res.write(`data: Test Message -- ${Date.now()}\n\n`);
        messageId += 1;
    }, 1000);

    req.on('close', () => {
        clearInterval(intervalId);
    });
}

app.get('/event-stream', (req, res) => {
    console.log('Client connected');

    // SSE Setup
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Access-Control-Allow-Origin': '*',
        'Connection': 'keep-alive',
    });
    res.write('\n');

    sseDemo(req, res);
});

app.listen(3000);