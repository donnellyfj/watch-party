#!/usr/bin/env python
# Simple check to test connection on locally hosted server. If only one instance of this file
# is connected to the server, there will be no response. If there are multiple instances, then
# all other instances will receive a response. This is to mimic what happens when one user plays
# or pauses the video that all users are watching. If the user who played/paused also received a
# response from the server, their video would be thrown into a feedback loop where it is constantly
# switching between being played/paused.

import asyncio
from websockets.sync.client import connect
import json
import time

def hello():
    with connect("ws://localhost:8765") as websocket:
        websocket.send(json.dumps({'message': "Hello world!", 'id': time.localtime()}))
        message = websocket.recv()
        print(f"Received: {message}")

hello()
