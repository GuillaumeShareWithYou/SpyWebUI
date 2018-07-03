export class Connection {
  private _id: number;

  private _ipAddress: string;

  private _port: number;

  private _userUsername: string;


  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get ipAddress(): string {
    return this._ipAddress;
  }

  set ipAddress(value: string) {
    this._ipAddress = value;
  }

  get port(): number {
    return this._port;
  }

  set port(value: number) {
    this._port = value;
  }

  get userUsername(): string {
    return this._userUsername;
  }

  set userUsername(value: string) {
    this._userUsername = value;
  }
}
