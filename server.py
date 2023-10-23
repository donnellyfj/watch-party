#!/usr/bin/env python
# This file contains the code to run the websocket server

import asyncio
import websockets
from websockets import broadcast
from websockets.server import serve
import json
import os
import signal

# Store all connected users
connected = set()

# Send message to all connected users except the user that the message came from
# to avoid a feedback loop
async def echo(websocket):
    async for message in websocket:
        data = json.loads(message)
        print(data)
        if ('message' not in data):
            print("ERROR: Data missing 'message' field!")
        elif ('id' not in data):
            print("ERROR: Data missing 'id' field!")
        else:
            # Send instruction to everyone but current user
            # NOTE: This might be made faster by broadasting to everyone in connected, and then
            #       checking on the client side to make sure the 'id' field of the sent message isn't
            #       the same as the cleint's ID
            print(websocket, connected, data)
            out = []
            for client in connected:
                if client != websocket:
                    out.append(client)
            broadcast(out, json.dumps({'message': "Nice one! " + data['message'], 'id': data['id']}))

async def handler(websocket):
    # Add new client to list
    connected.add(websocket)
    print(websocket)
    try:
        # Listen for messages from new client
        await echo(websocket)
    finally:
        # Remove client on disconnect
        connected.remove(websocket)
    

async def main():
    # Use the following two lines instead of the rest of the function to test locally
    # async with serve(handler, "localhost", 8765):
    #     await asyncio.Future()  # run forever

    # Set the stop condition when receiving SIGTERM.
    loop = asyncio.get_running_loop()
    stop = loop.create_future()
    loop.add_signal_handler(signal.SIGTERM, stop.set_result, None)

    port = int(os.environ.get("PORT", "8001"))
    async with websockets.serve(handler, "", port):
        await stop

asyncio.run(main())
