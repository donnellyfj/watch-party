# Watch Party Chrome extension

A WIP project to try and create a watch party out of any website that plays video. Right now it's code patched together from various docs ([Python WebSockets](https://websockets.readthedocs.io/), [Chrome extensions](https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/functional-samples/tutorial.websockets)) to get a base WebSocket system working, and allows for synchronized play/pause on various video streaming websites.

## Running this extension

1. Clone this repository.
2. Run server.py to start the WebSocket server, either locally or hosted on some service (i.e. Heroku).
3. Change the URL in service-worker.js to point to the server from the previous step.
2. Load this directory in Chrome as an [unpacked extension](https://developer.chrome.com/docs/extensions/mv3/getstarted/development-basics/#load-unpacked).
3. Pin the extension from the extension menu.
4. Use the different buttons that pop up after clicking on the pinned extension.
    1. Toggle - Connect/disconnect from the server. Successful conection is indicated by the grey icon turning red.
    2. Button - Send a test message to the server.
    3. Play/Pause - Play or pause the video on the current tab.
6. Check the [service worker status](https://developer.chrome.com/docs/extensions/mv3/tut_debugging/#sw-status) to see when the service worker is active/inactive.
