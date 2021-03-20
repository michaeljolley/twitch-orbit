import axios from 'axios';

export abstract class Orbit {

  private static orbitWS = process.env.ORBIT_WS;
  private static orbitKey = process.env.ORBIT_KEY;
  private static baseUrl = 'https://app.orbit.love/api/v1';

  static async addActivity(activity: Activity, identity: Identity): Promise<void> {
    try {
      const payload = {
        activity,
        identity
      };

      await axios({
        url: `${this.baseUrl}/${this.orbitWS}/activities`,
        method: 'POST',
        headers: { Authorization: `Bearer ${this.orbitKey}` },
        data: payload
      });
    }
    catch (err) {
      console.log(err);
    }
  }
}

export class Activity {
  constructor(
    public title: string,
    public description?: string,
    public link?: string,
    public link_text?: string,
    public weight?: string,
    public activity_type?: string,
    public key?: string,
    public occurred_at?: string,
    public tags?: string[]
  ) {}
}

export class Member {
  constructor(
    public bio?: string,
    public birthday?: string,
    public company?: string,
    public location?: string,
    public name?: string,
    public pronouns?: string,
    public shipping_address?: string,
    public slug?: string,
    public tags_to_add?: string[],
    public tags?: string[],
    public tshirt?: string,
    public teammate?: boolean,
    public url?: string,
    public github?: string,
    public twitter?: string,
    public email?: string,
    public linkedin?: string,
    public devto?: string
  ) {}
}

export class Identity {
  constructor(
    public source: string,
    public name?: string,
    public source_host?: string,
    public username?: string,
    public uid?: string,
    public email?: string,
    public url?: string
  ) {}
}