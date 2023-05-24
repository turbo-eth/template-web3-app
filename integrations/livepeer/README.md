# Livepeer - TurboETH integration

> [Livepeer](https://livepeer.org/) enables to add on-demand videos and livestreaming support to onchain apps.

To be able to use livestream, first we need to create a api key from the [livepeer studio](https://livepeer.studio/dashboard).

How to create an api key is documented on the livepeer developer website [here](https://docs.livepeer.org/guides/developing/quickstart)

- Livepeer provides ways to view videos on-demand by uploading from their studio or by uploading via api.
- Livepeer also supports live streaming by creating streams from studio or via their sdk

Livepeer provides integrations for various js libraries/frameworks. We will explore React integration going on.


### On-Demand playback

Playing back a video is as simple as passing the playbackId to the livepeer `Player` component

```javascript
import { Player } from '@livepeer/react';
const playbackId = '<playback id here>';
export const DemoPlayer = () => {
  return (
    <Player
      playbackId={playbackId}
      ...
    />
  );
};
```

This article https://docs.livepeer.org/guides/developing/player from livepeer demonstrates on how to do it.

We can also [upload a video](https://docs.livepeer.org/guides/developing/upload-a-video-asset) from our application by using their `useCreateAsset` react hook. This upload can be viewed from the livepeer studio.


### Livestream

We can create a livestream by first creating a stream object from the `useCreateStream` hook or via the livestream studio. The stream object from the hook will contain the `playbackId` which we can pass directly to the livepeer `Player` object. It is documented over [here](https://docs.livepeer.org/guides/developing/create-a-livestream)

The returned stream object also contain the important `rtmpIngestUrl` url and `streamKey` which we can use for livestreaming purpose.

Apart from creating the livestream object we have to do the streaming from another app. The docs mention how to start a livestream from the obs app https://docs.livepeer.org/guides/developing/stream-via-obs

1. First open the OBS app and create a source from the bottom panel by clicking on '+' button.
2. Now open Settings > Stream. Change the Service type to `Custom` and enter the rtmp ingest url and the stream key in the following input fields. One thing to note here is the rtmp ingest url returned by livepeer has `server + stream` key concatenated. We need to separate it.
3. After that we can do the start streaming from the main page in obs app, this can be seen on the bottom right side.
4. Once we have started the livestream it will take few seconds for the stream to appear in our player. Also as a side note, streaming can also be viewed in the livepeer studio.
