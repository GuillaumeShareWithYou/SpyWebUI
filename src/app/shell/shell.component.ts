import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {AlertType, Command} from '../Command';
import {CommandService} from '../service/command.service';
import {delay, map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Connection} from '../model/Connection';
import {ConnectionService} from '../service/connection.service';
import {ShellConstants} from './ShellConstants';
import set = Reflect.set;

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit {
  topBarMessage = 'Spy Console';
  commands: Command[] = [];
  userCommands: Command[] = [];
  input = '';

  @ViewChild('userInput', {read: ElementRef}) userInput: ElementRef;
  @ViewChild('shellBody', {read: ElementRef}) shellBody: ElementRef;

  @Output() shellOnClose = new EventEmitter<ElementRef>();
  commandSymbol = '$';
  private isThreadSafe = true;
  private intervalDisplay: any;

  constructor(private el: ElementRef,
              private connectionService: ConnectionService) {
  }

  ngOnInit() {
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.keyCode === 13) {
      // Enter
      if (this.input === '') {
        return;
      }
      this.executeCommand(this.input);
    } else if (event.keyCode === 38) {
      // Key Up
      this.input = this.userCommands[this.userCommands.length - 1].content;

      setTimeout(() => {
        this.userInput.nativeElement.selectionStart = this.input.length;
      }, 0);
      // TODO scan command's user and set the value to the input
    }
  }

  private saveUserCommand(value: string) {
    const c = new Command(value);
    this.commands.push(c);
    this.userCommands.push(c);
  }

  private saveComputerCommand(value: string, alert = AlertType.SUCCESS) {
    this.commands.push(new Command(value, true, alert));
  }

  private saveError(value: string) {
    this.saveComputerCommand(value, AlertType.DANGER);
  }

  private executeCommand(command: string) {
    if (!this.isThreadSafe) {
      return;
    }
    this.isThreadSafe = false;
    this.saveUserCommand(command);
    try {
      this.execute(command).subscribe(r => {

          //  this.saveComputerCommand(r, AlertType.SUCCESS);
        }, e => {

          this.saveError(e);
        }, () => this.isThreadSafe = true
      );
    } catch (e) {
      this.saveError(e);
      this.isThreadSafe = true;
    }

    this.input = '';
    this.scrollToBottom();

  }

  execute(command: string): Observable<any> {

    const name = command.trim().split(' ')[0];

    switch (name) {
      case 'scan':
        return this.executeScan();

      case 'crack':
        return this.executeCrack(command);

    }

    throw Error(`command ${name} not supported yet.`);
  }

  private executeScan(): Observable<any> {
    const sub = this.connectionService.getAllConnections();
    sub.pipe(map((e: Connection[]) => e.map(c => `${c.userUsername} => ${c.ipAddress}`)))
      .subscribe((ips: string[]) => {

        this.displayWithInterval(Math.random() * 1000, ...ips);
      });
    return sub;

  }

  private executeCrack(command: string): Observable<string> {
    const args = command.trim().split(new RegExp(' +'));
    if (args.length < 4) {
      throw new Error(ShellConstants.CRACK_DOC);
    }
    const ip = args[1];
    try {
      this.saveComputerCommand('Cracking...');

      const portMin = parseInt(args[2], 10);
      const portMax = parseInt(args[3], 10);
      for (let port = portMin; port < portMax; ++port) {

          this.replaceLastLine(`cracking ${ip}:${port}`);
          if (this.connectionService.portAndIpMatches(ip, port)) {
            this.replaceLastLine('fetching...')
            const sub = this.connectionService.crack(ip, port);
            sub.pipe(delay(2000)).subscribe(email => this.replaceLastLine(email, AlertType.WARNING));
            return sub;
          }

      }


    } catch (e) {
      throw new Error(e);
    }
    throw Error(`cannot hack the ip ${ip} with these ports`);
  }

  private replaceLastLine(value: string, alert = AlertType.SUCCESS) {
    this.commands[this.commands.length - 1].content = value;
    this.commands[this.commands.length - 1].alert = alert;
  }

  private displayWithInterval(interval: number, ...args) {
    if (this.intervalDisplay !== undefined) {
      clearInterval(this.intervalDisplay);
    }
    let i = 0;
    this.intervalDisplay = setInterval(() => {
      this.saveComputerCommand(args[i++]);
    }, interval);
  }

  requestFocus() {
    this.userInput.nativeElement.focus();
  }

  private scrollToBottom() {
    setTimeout(() => {
      const shell = this.shellBody.nativeElement;
      shell.scrollTop = shell.scrollHeight;
    }, 0);
  }

  closeWindow() {
    this.shellOnClose.emit(this.el);
  }
}

