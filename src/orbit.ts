import axios from 'axios';

export abstract class Orbit {

  private static baseUrl = 'https://app.orbit.love/api/v1';

  static async addActivity(activity: Activity, identity: Identity): Promise<void> {
    try {
      const payload = {
        activity,
        identity
      };

      await axios({
        url: `${this.baseUrl}/${process.env.ORBIT_WS}/activities`,
        method: 'POST',
        headers: { Authorization: `Bearer ${process.env.ORBIT_KEY}` },
        data: payload,
        validateStatus: () => true
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
    public weight?: string,
    public activity_type?: string,
    public tags?: Array<string>,
    public key?: string,
    public occurred_at?: string
  ) {}
}

export class Identity {
  constructor(
    public source: string,
    public source_host: string,
    public username: string,
    public url: string
  ) {}
}