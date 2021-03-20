import {
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
import { Activity, Identity, Orbit } from "./orbit";

interface WeightConfig {
  weightChat?: number;
  weightCheer?: number;
  weightCommand?: number;
  weightFollow?: number;
  weightGiftSub?: number;
  weightRaid?: number;
  weightSub?: number;
}

const defaultWeights: WeightConfig = {
  weightChat: 1,
  weightCheer: 1,
  weightCommand: 1,
  weightFollow: 1,
  weightGiftSub: 1,
  weightRaid: 1,
  weightSub: 1
};

export abstract class Handlers {

  private static weights: WeightConfig;

  static init(config: WeightConfig): void {
    this.weights = { ...defaultWeights, ...config };
  }

  static async onCommand(user: string, command: string, message: string, flags: OnMessageFlags, extra: OnCommandExtra): Promise<void> {
    if (user === extra.channel) return;

    const date = new Date();

    const activity = new Activity(
      'Command on Twitch',
      `Used command ${command} on Twitch`,
      undefined,
      undefined,
      this.weights.weightCommand?.toFixed(2),
      'twitch:command',
      `twitch-command-${user}-${command}-${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`,
      date.toISOString(),
      undefined
    );

    const identity = new Identity(
      'twitch',
      undefined,
      `https://twitch.tv/${extra.channel}`,
      user,
      undefined,
      undefined,
      `https://twitch.tv/${user}`
    );

    await Orbit.addActivity(
      activity,
      identity
    );
  }

  static async onChat(user: string, message: string, flags: OnMessageFlags, self: boolean, extra: OnMessageExtra): Promise<void>  {
    if (self) return;

    const date = new Date();

    const activity = new Activity(
      'Chat on Twitch',
      `Chatted on Twitch`,
      undefined,
      undefined,
      this.weights.weightChat?.toFixed(2),
      'twitch:chat',
      `twitch-chat-${user}-${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`,
      date.toISOString(),
      undefined
    );

    const identity = new Identity(
      'twitch',
      undefined,
      `https://twitch.tv/${extra.channel}`,
      user,
      undefined,
      undefined,
      `https://twitch.tv/${user}`
    );

    await Orbit.addActivity(
      activity,
      identity
    );
  }

  static async onCheer(user: string, message: string, bits: number, flags: OnCheerFlags, extra: OnCheerExtra): Promise<void> {
    const date = new Date();

    const activity = new Activity(
      'Cheer on Twitch',
      `Cheered ${bits} on Twitch`,
      undefined,
      undefined,
      this.weights.weightCheer?.toFixed(2),
      'twitch:cheer',
      `twitch-cheer-${user}-${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`,
      date.toISOString(),
      undefined
    );

    const identity = new Identity(
      'twitch',
      undefined,
      `https://twitch.tv/${extra.channel}`,
      user,
      undefined,
      undefined,
      `https://twitch.tv/${user}`
    );

    await Orbit.addActivity(
      activity,
      identity
    );
  }

  static async onRaid(user: string, viewers: number, extra: OnRaidExtra): Promise<void> {
    const date = new Date();

    const activity = new Activity(
      'Raid on Twitch',
      `Raided with ${viewers} viewers on Twitch`,
      undefined,
      undefined,
      this.weights.weightRaid?.toFixed(2),
      'twitch:raid',
      `twitch-raid-${user}-${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`,
      date.toISOString(),
      undefined
    );

    const identity = new Identity(
      'twitch',
      undefined,
      `https://twitch.tv/${extra.channel}`,
      user,
      undefined,
      undefined,
      `https://twitch.tv/${user}`
    );

    await Orbit.addActivity(
      activity,
      identity
    );
  }

  static async onResub(user: string, message: string, streakMonths: number, cumulativeMonths: number, subTierInfo: any, extra: OnResubExtra): Promise<void> {
    const date = new Date();

    const activity = new Activity(
      'Sub on Twitch',
      `Resub for ${cumulativeMonths} months on Twitch`,
      undefined,
      undefined,
      this.weights.weightSub?.toFixed(2),
      'twitch:sub',
      `twitch-sub-${user}-${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`,
      date.toISOString(),
      undefined
    );

    const identity = new Identity(
      'twitch',
      undefined,
      `https://twitch.tv/${extra.channel}`,
      user,
      undefined,
      undefined,
      `https://twitch.tv/${user}`
    );

    await Orbit.addActivity(
      activity,
      identity
    );
  }

  static async onSub(user: string, message: string, subTierInfo: any, extra: OnSubExtra): Promise<void> {
    const date = new Date();

    const activity = new Activity(
      'Sub on Twitch',
      `Sub on Twitch`,
      undefined,
      undefined,
      this.weights.weightSub?.toFixed(2),
      'twitch:sub',
      `twitch-sub-${user}-${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`,
      date.toISOString(),
      undefined
    );

    const identity = new Identity(
      'twitch',
      undefined,
      `https://twitch.tv/${extra.channel}`,
      user,
      undefined,
      undefined,
      `https://twitch.tv/${user}`
    );

    await Orbit.addActivity(
      activity,
      identity
    );
  }

  static async onSubGift(gifterUser: string, streakMonths: number, recipientUser: string, senderCount: number, subTierInfo: any, extra: OnSubGiftExtra): Promise<void> {
    const date = new Date();

    const activity = new Activity(
      'Sub on Twitch',
      `Sub on Twitch`,
      undefined,
      undefined,
      this.weights.weightSub?.toFixed(2),
      'twitch:sub',
      `twitch-sub-${recipientUser}-${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`,
      date.toISOString(),
      undefined
    );

    const identity = new Identity(
      'twitch',
      undefined,
      `https://twitch.tv/${extra.channel}`,
      recipientUser,
      undefined,
      undefined,
      `https://twitch.tv/${recipientUser}`
    );

    const gifterActivity = new Activity(
      'Gifted sub on Twitch',
      `Gifted sub to ${recipientUser} on Twitch`,
      undefined,
      undefined,
      this.weights.weightGiftSub?.toFixed(2),
      'twitch:sub:gift',
      `twitch-sub-gift-${recipientUser}-${gifterUser}-${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`,
      date.toISOString(),
      undefined
    );

    const gifterIdentity = new Identity(
      'twitch',
      undefined,
      `https://twitch.tv/${extra.channel}`,
      gifterUser,
      undefined,
      undefined,
      `https://twitch.tv/${gifterUser}`
    );

    await Orbit.addActivity(
      activity,
      identity
    );

    await Orbit.addActivity(
      gifterActivity,
      gifterIdentity
    );
  }
}
