import {Connection} from './Connection';
import {Role} from './Role';

export class User {
  private _username: string;
  private _id: number;
  private _email: string;
  private _roles: Role[];

  private _connection: Connection;


  get username(): string {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get roles(): Role[] {
    return this._roles;
  }

  set roles(value: Role[]) {
    this._roles = value;
  }

  get connection(): Connection {
    return this._connection;
  }

  set connection(value: Connection) {
    this._connection = value;
  }
}
