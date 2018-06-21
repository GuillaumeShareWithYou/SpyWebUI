import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit {
  topBarMessage = 'Spy Console';
  commands = ['cd /', 'ls -la', 'scan'];
  input = '';

  constructor() {
  }

  ngOnInit() {
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.executeCommand(this.input);
    }
  }

  private executeCommand(input: string) {
    this.input = '';
    this.commands.push(input);
    setTimeout(() => {

      this.scrollToBottom();
      this.requestFocus();
    }, 10);

  }


  requestFocus() {
    document.getElementById('userInput').focus();
  }

  private scrollToBottom() {
    const shell = document.querySelector('.shell-body');
    shell.scrollTop = shell.scrollHeight;
  }
}
