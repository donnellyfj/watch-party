// Copyright 2022 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// TODO: Move video retrieval to service-worker
const video = document.querySelector('video');
console.log("Content running!");

// Listen for message
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log(video);
    console.log(message);
    console.log(document.querySelectorAll('video'));
    if (message.val === 'playPause' && video) {
        console.log("Play/Pause");
        console.log(video);
        console.log(video.paused);
        if (video.paused) {
            console.log("Play");
            video.play();
            // Use this line instead of the previous to play/pause all videos on the page
            // document.querySelectorAll('video').forEach(vid => vid.play());
        }
        else {
            console.log("Pause");
            video.pause();
            // Use this line instead of the previous to play/pause all videos on the page
            // document.querySelectorAll('video').forEach(vid => vid.pause());
        }
    }
    return true;
});
