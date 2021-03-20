import dotenv from 'dotenv';
import ComfyJS from "comfy.js";
import { Handlers } from './events';

dotenv.config();

const main = (): void => {

  /**
   * Load & validate required environment variables
   */
  const twitchChannels = process.env.TWITCH_CHANNELS?.split(',');
  const orbitWS = process.env.ORBIT_WS;
  const orbitKey = process.env.ORBIT_KEY;

  _validateOptions(twitchChannels, orbitWS, orbitKey);

  const twitchUser = twitchChannels ? twitchChannels[0] : '';

  const weightFollow = process.env.ORBIT_WEIGHT_FOLLOW ? parseFloat(process.env.ORBIT_WEIGHT_FOLLOW) : undefined;
  const weightCheer = process.env.ORBIT_WEIGHT_CHEER ? parseFloat(process.env.ORBIT_WEIGHT_CHEER) : undefined;
  const weightSub = process.env.ORBIT_WEIGHT_SUB ? parseFloat(process.env.ORBIT_WEIGHT_SUB) : undefined;
  const weightRaid = process.env.ORBIT_WEIGHT_RAID ? parseFloat(process.env.ORBIT_WEIGHT_RAID) : undefined;
  const weightChat = process.env.ORBIT_WEIGHT_CHAT ? parseFloat(process.env.ORBIT_WEIGHT_CHAT) : undefined;
  const weightCommand = process.env.ORBIT_WEIGHT_COMMAND ? parseFloat(process.env.ORBIT_WEIGHT_COMMAND) : undefined;

  console.log(`Initializing Twitch-Orbit integration:\nTwitch Channels: ${twitchChannels?.join(', ')}\nOrbit WS: ${orbitWS}\nWeights:\nChat: ${weightChat}\nFollow: ${weightFollow}\nCommand: ${weightCommand}\nCheer: ${weightCheer}\nSub: ${weightSub}\nRaid: ${weightRaid}`);

  ComfyJS.onError = (err: string) => {
    console.error(err);
  };

  Handlers.init({
    weightChat,
    weightCheer,
    weightCommand,
    weightFollow,
    weightRaid,
    weightSub
  });

  ComfyJS.onChat = Handlers.onChat;
  ComfyJS.onCheer = Handlers.onCheer;
  ComfyJS.onCommand = Handlers.onCommand;
  ComfyJS.onRaid = Handlers.onRaid;
  ComfyJS.onResub = Handlers.onResub;
  ComfyJS.onSub = Handlers.onSub;
  ComfyJS.onSubGift = Handlers.onSubGift;

  ComfyJS.Init(twitchUser, undefined, twitchChannels);
};

const _validateOptions = (twitchChannels?: string[], orbitWS?: string, orbitKey?: string): void => {
  const missingFields: string[] = [];
  if (!twitchChannels || twitchChannels.length === 0) {
    missingFields.push('TWITCH_CHANNELS');
  }
  if (!orbitWS || orbitWS.length === 0) {
    missingFields.push('ORBIT_WS');
  }
  if (!orbitKey || orbitKey.length === 0) {
    missingFields.push('ORBIT_KEY');
  }

  if (missingFields.length > 0) {
    throw `${missingFields.join(', ')} environment variables are required.`;
  }
};

main();