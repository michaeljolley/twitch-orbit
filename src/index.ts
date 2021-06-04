import dotenv from 'dotenv';
import ComfyJS, { 
  OnCheerExtra, 
  OnCheerFlags, 
  OnCommandExtra, 
  OnMessageExtra, 
  OnMessageFlags, 
  OnRaidExtra, 
  OnResubExtra, 
  OnSubExtra, 
  OnSubGiftExtra 
} from "comfy.js";
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

  const weightFollow = process.env.ORBIT_WEIGHT_FOLLOW ? parseFloat(process.env.ORBIT_WEIGHT_FOLLOW) : 1;
  const weightCheer = process.env.ORBIT_WEIGHT_CHEER ? parseFloat(process.env.ORBIT_WEIGHT_CHEER) : 1;
  const weightSub = process.env.ORBIT_WEIGHT_SUB ? parseFloat(process.env.ORBIT_WEIGHT_SUB) : 1;
  const weightRaid = process.env.ORBIT_WEIGHT_RAID ? parseFloat(process.env.ORBIT_WEIGHT_RAID) : 1;
  const weightChat = process.env.ORBIT_WEIGHT_CHAT ? parseFloat(process.env.ORBIT_WEIGHT_CHAT) : 1;
  const weightCommand = process.env.ORBIT_WEIGHT_COMMAND ? parseFloat(process.env.ORBIT_WEIGHT_COMMAND) : 1;

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

  ComfyJS.onChat = (user: string, message: string, flags: OnMessageFlags, self: boolean, extra: OnMessageExtra) => Handlers.onChat(user, message, flags, self, extra);
  ComfyJS.onCheer = (user: string, message: string, bits: number, flags: OnCheerFlags, extra: OnCheerExtra) => Handlers.onCheer(user, message, bits, flags, extra);
  ComfyJS.onCommand = (user: string, command: string, message: string, flags: OnMessageFlags, extra: OnCommandExtra) => Handlers.onCommand(user, command, message, flags, extra);
  ComfyJS.onRaid = (user: string, viewers: number, extra: OnRaidExtra) => Handlers.onRaid(user, viewers, extra);
  ComfyJS.onResub = (user: string, message: string, streakMonths: number, cumulativeMonths: number, subTierInfo: any, extra: OnResubExtra) => Handlers.onResub(user, message, streakMonths, cumulativeMonths, subTierInfo, extra);
  ComfyJS.onSub = (user: string, message: string, subTierInfo: any, extra: OnSubExtra) => Handlers.onSub(user, message, subTierInfo, extra);
  ComfyJS.onSubGift = (gifterUser: string, streakMonths: number, recipientUser: string, senderCount: number, subTierInfo: any, extra: OnSubGiftExtra) => Handlers.onSubGift(gifterUser, streakMonths, recipientUser, senderCount, subTierInfo, extra);

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