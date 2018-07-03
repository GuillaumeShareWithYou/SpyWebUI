export class Command {
  private _content: string;
  private _isResponse: boolean;
  private _alert: AlertType;
  constructor(content = '', isResponse = false, alert = AlertType.NORMAL) {
    this.content = content;
    this.isResponse = isResponse;
    this.alert = alert;
  }
  get content(): string {
    return this._content;
  }

  set content(value: string) {
    this._content = value;
  }

  get isResponse(): boolean {
    return this._isResponse;
  }

  set isResponse(value: boolean) {
    this._isResponse = value;
  }


  get alert(): AlertType {
    return this._alert;
  }

  set alert(value: AlertType) {
    this._alert = value;
  }
}

export enum AlertType {
  SUCCESS = 'success',
  DANGER = 'danger',
  NORMAL = 'normal',
  WARNING = 'warning'
}
