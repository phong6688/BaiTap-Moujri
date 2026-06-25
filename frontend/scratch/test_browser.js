import { exec } from 'child_process';
import http from 'http';

// Start MsEdge headlessly
console.log('Starting Edge in headless debugging mode...');
const edgeProcess = exec('"C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe" --headless --disable-gpu --remote-debugging-port=9222 http://localhost:5173/');

// Wait 3 seconds for the browser to load the page
setTimeout(() => {
  console.log('Fetching targets from http://localhost:9222/json/list...');
  http.get('http://localhost:9222/json/list', (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      try {
        const targets = JSON.parse(data);
        console.log(`Found ${targets.length} targets.`);
        const target = targets.find(t => t.url.includes('5173') || t.type === 'page');
        if (!target) {
          console.error('No page target found for http://localhost:5173');
          edgeProcess.kill();
          return;
        }

        console.log('Connecting to WebSocket:', target.webSocketDebuggerUrl);
        const ws = new WebSocket(target.webSocketDebuggerUrl);

        ws.onopen = () => {
          console.log('WebSocket connection established. Enabling Runtime and Page...');
          
          // Enable Runtime to capture console messages and exceptions
          ws.send(JSON.stringify({ id: 1, method: 'Runtime.enable' }));
          
          // Evaluate a script to get document.body.innerHTML
          setTimeout(() => {
            ws.send(JSON.stringify({
              id: 2,
              method: 'Runtime.evaluate',
              params: {
                expression: 'document.getElementById("root").innerHTML'
              }
            }));
            
            // Also evaluate page title or check for global errors
            ws.send(JSON.stringify({
              id: 3,
              method: 'Runtime.evaluate',
              params: {
                expression: 'window.__vite_plugin_react_preamble_installed__'
              }
            }));
          }, 1500);
        };

        ws.onmessage = (event) => {
          const msg = JSON.parse(event.data);
          
          // Log console API calls
          if (msg.method === 'Runtime.consoleAPICalled') {
            const args = msg.params.args.map(a => a.value || JSON.stringify(a)).join(' ');
            console.log(`[Browser Console - ${msg.params.type}]`, args);
          }
          
          // Log uncaught exceptions
          if (msg.method === 'Runtime.exceptionThrown') {
            console.error('[Browser Exception]', JSON.stringify(msg.params.exceptionDetails, null, 2));
          }

          if (msg.id === 2) {
            console.log('--- Root InnerHTML ---');
            console.log(msg.result?.result?.value || '(empty or undefined)');
            console.log('----------------------');
          }
          
          if (msg.id === 3) {
            console.log('Vite preamble installed:', msg.result?.result?.value);
            // Close everything
            ws.close();
            edgeProcess.kill();
            process.exit(0);
          }
        };

        ws.onerror = (err) => {
          console.error('WebSocket error:', err);
          edgeProcess.kill();
        };

        ws.onclose = () => {
          console.log('WebSocket closed.');
          edgeProcess.kill();
        };

      } catch (e) {
        console.error('Error parsing targets:', e);
        edgeProcess.kill();
      }
    });
  }).on('error', (err) => {
    console.error('Failed to query targets:', err.message);
    edgeProcess.kill();
  });
}, 3000);
