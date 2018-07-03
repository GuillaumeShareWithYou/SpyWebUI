import {Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {ShellComponent} from '../shell/shell.component';
import {ApiService} from '../service/api.service';
import {AuthService} from '../service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  @ViewChild('terminalContainer', {read: ViewContainerRef}) terminalContainer: ViewContainerRef;

  userInfo: any;

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private api: ApiService, private auth: AuthService) {

  }

  ngOnInit(): void {
    this.loadAllTerminal();
  }

  private loadAllTerminal() {
    this.createTerminal();
  }

  private createTerminal() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ShellComponent);
    const componentRef = this.terminalContainer.createComponent(componentFactory);

    (<ShellComponent>componentRef.instance).shellOnClose.subscribe(() => {
      componentRef.hostView.destroy();
    });
  }

  logout() {
    this.auth.logout();
  }
}
