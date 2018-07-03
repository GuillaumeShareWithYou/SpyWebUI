import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs';
import {Connection} from '../model/Connection';
import {map} from 'rxjs/operators';
import {User} from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  connections: Connection[];


  constructor(private api: ApiService) {
  }

  getAllConnections(): Observable<Connection> {
    const sub = this.api.get<Connection>('/ip');
    sub.subscribe(co => this.connections = co);
    return sub;
  }

  portAndIpMatches(ip, port): boolean {

    const co = this.getConnectionByIpCache(ip);
    return co.port === port;
  }

  getConnectionByIpCache(ip): Connection {
    if (this.connections === undefined)
      throw new Error('you must scan first !');
    const co = this.connections.filter(c => c.ipAddress === ip)[0];
    if (co === undefined)
      throw Error('ip address not found');
    return co;
  }

  crack(ip: string, port: number) {
    const co = this.getConnectionByIpCache(ip);
    if (co.port !== port)
      throw Error(`port ${port} not accessible`);
    return this.getUserByIp(co.id).pipe(map(user => user.email));
  }

  getUserByIp(id: number) {
    return this.api.get<User>(`/ip/${id}/user`);
  }
}
