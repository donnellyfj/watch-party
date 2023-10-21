# Watch Party Chrome extension

A WIP project to try and create a watch party out of any website that plays video. Right now it's code patched together from various docs (Python WebSockets, Chrome extensions) to get a base WebSocket system working, and then I'll start to build up the actual extension functionality.

## Running this extension

1. Clone this repository.
2. Load this directory in Chrome as an [unpacked extension](https://developer.chrome.com/docs/extensions/mv3/getstarted/development-basics/#load-unpacked).
3. Pin the extension from the extension menu.
4. Use the different buttons that pop up after clicking on the pinned extension.
6. Check the [service worker status](https://developer.chrome.com/docs/extensions/mv3/tut_debugging/#sw-status) to see when the service worker is active/inactive.
