const TEN_SECONDS_MS = 10 * 1000;
const rand = Math.random(); // Random number to help identify user for debugging purposes
let webSocket = null;

// Connect to server, replace URL to point to your server
function connect() {
  // NOTE: Depending on hosting service, you might need to use 'wss://...' instead of 'ws://...'
  webSocket = new WebSocket('ws://localhost:8765');

  webSocket.onopen = (event) => {
    chrome.action.setIcon({ path: 'icons/socket-active.png' });
  };

  // Listen for play/pause event
  webSocket.onmessage = (event) => {
    let data = JSON.parse(event.data)
    console.log(data);
    console.log(data.message);
    if (data.message === "Nice one! You played/paused!") {
      console.log("Play/Pause triggered by " + data.id)
      playPause();
    }
  };

  // Disconnect from server
  webSocket.onclose = (event) => {
    chrome.action.setIcon({ path: 'icons/socket-inactive.png' });
    console.log('websocket connection closed');
    webSocket = null;
  };
}

// Listen for disconnect event
function disconnect() {
  if (webSocket) {
    webSocket.close();
  }
}

// Send a message every 10 seconds, the ServiceWorker will
// be kept alive as long as messages are being sent.
function keepAlive() {
  const keepAliveIntervalId = setInterval(
    () => {
      if (webSocket) {
        console.log('ping');
        webSocket.send(JSON.stringify({message: 'ping', id: rand}));
      } else {
        clearInterval(keepAliveIntervalId);
      }
    },
    // It's important to pick an interval that's shorter than 30s, to
    // avoid that the service worker becomes inactive.
    TEN_SECONDS_MS
  );
}

function toggleConnect() {
  if (webSocket) {
    console.log('Toggle off');
    disconnect();
  } else {
    console.log('Toggle on');
    connect();
    keepAlive();
  }
}

function buttonPress() {
  console.log('Pressed!');
  if (webSocket) {
    webSocket.send(JSON.stringify({message: 'You pressed it!', id: rand}));
  }
}

function playPause() {
  console.log('Play/Pause!');
  // Send message to content
  console.log(rand);
  chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
    chrome.tabs.sendMessage(tabs[0].id, {val: 'playPause', id: rand});
  });
}

// Listen for message
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // Extra button for test purposes
  if (message.val === 'buttonPress') {
    buttonPress();
  }
  // Toggle WebSocket connection on action button click
  else if (message.val === 'toggleConnect') {
    toggleConnect();
  }
  // Play/pause the video for all users
  else if (message.val === 'playPause') {
    playPause();
    // Alert server that play/Pause button was pressed
    if (webSocket) {
      webSocket.send(JSON.stringify({message: 'You played/paused!', id: rand}));
    }
  }
  // Handle unknown message
  else {
    console.log(message);
  }
  return true;
});
