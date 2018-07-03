import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ConnectionService} from './connection.service';
import {map} from 'rxjs/operators';
import {Connection} from '../model/Connection';
import {ParseError} from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class CommandService {

  constructor(private connectionService: ConnectionService) {
  }


}
