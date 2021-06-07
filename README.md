# Twitch Orbit

![CI](https://github.com/michaeljolley/twitch-orbit/actions/workflows/CI.yml/badge.svg)
![Docker Image Version (latest semver)](https://img.shields.io/docker/v/michaeljolley/twitch-orbit?sort=semver)
![Contributions Welcome](https://img.shields.io/badge/contributions-welcome-brightgreen)

An application monitors Twitch viewer activity and records to [Orbit](https://orbit.love).

## Events

By default, all activities are recorded with a weight of 1. This can be changed
via environment variables.

The application listens for the following events to record:

| Event | Description |
| --- | --- |
| Chat Message | Viewer sends a message in Twitch chat |
| Command | Viewer has entered a command (`!command`) in Twitch chat |
| Cheer | Viewer has cheered X bits |
| Raid | Streamer has raided the channel with X viewers |
| Subscribe | Viewer has subscribed to the Twitch channel |
| Resubscribe | Viewer has renewed their subscription |
| Gift Subscription | Viewer has received or given a gift subscription |

## Quick Deploy

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy)

## Setup

Rename `.env-sample` to `.env` and provide the correct values for each variable.
Additional [variables](#Environment_Variables) are available and described below.

```bash
npm run install
npm run build
```

## Running the Application

There are two options for running the application: node & Docker.

### Node

After completing the [Setup] above, run `npm run start` to start the application.

### Docker

After completing the [Setup] above, run `docker build .` to build an image. If
running via Docker, ensure you provide the environment variables to the container.

Official versions of the application are also available in the Docker Hub
with the image name: `michaeljolley/twitch-orbit`. Use the `:latest` tag or
a specific version.

## Environment Variables

Use the following environment variables to configure the application for your
use cases.

| Variable | Required | Default | Description |
| --- | --- | --- | --- |
| TWITCH_CHANNELS | X | | A comma separated list of Twitch channels to listen to |
| ORBIT_WS | X | | The Orbit workspace id |
| ORBIT_KEY | X | | The Orbit API key |
| ORBIT_WEIGHT_FOLLOW     | | 1 | Weight to apply for user follows |
| ORBIT_WEIGHT_CHEER      | | 1 | Weight to apply for cheers |
| ORBIT_WEIGHT_SUB        | | 1 | Weight to apply for all subscription events |
| ORBIT_WEIGHT_RAID       | | 1 | Weight to apply for raids |
| ORBIT_WEIGHT_CHAT       | | 1 | Weight to apply for chatting per day |
| ORBIT_WEIGHT_COMMAND    | | 1 | Weight to apply for using a command |

## Code of Conduct

In the interest of fostering an open and welcoming environment, we strive to make participation in our project and our community a harassment-free experience for everyone. Please check out our [Code of Conduct](CODE_OF_CONDUCT.md) in full.

## Contributing

We :heart: contributions from everyone! Check out the [Contributing Guidelines](CONTRIBUTING.md) for more information.

## License

This project is subject to the [MIT License](LICENSE)
