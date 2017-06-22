"use strict";

export interface OptionSettings<Type> {
  destination?: string;
  help?: string;
  callback? : (value : Type) => Type;
  default? : Type;
}

export interface OptionInterface {
    readonly requires_value : boolean;
    set_value (value : string) : void;
    get_name () : string;
    matches (key : string) : boolean;
}

export abstract class Option<Type> {

  protected shortopt : string;
  protected longopt : string;
  protected settings : OptionSettings<Type> = {};
  protected value : Type | undefined = undefined;

  readonly requires_value : boolean = true;

  constructor (shortopt: string, longopt: string, settings : OptionSettings<Type> = {}) {
    this.shortopt = shortopt;
    this.longopt = longopt;
    this.settings = settings;
  }

  public abstract set_value (value : string) : void;

  public get_value () : Type | undefined {
    if (this.settings.callback) {
      return this.settings.callback.call(this, this.value);
    }
    return this.value
  }

  public get_shortopt () : string {
    return this.shortopt;
  }

  public get_longopt () : string {
    return this.longopt;
  }

  public get_help () : string {
    return this.settings.help || "";
  }

  public get_name () : string {
    if (this.settings.destination) {
      return this.settings.destination;
    }
    return this.longopt;
  }

  public matches (key : string) : boolean {
    return (this.shortopt === key || this.longopt === key);
  }

}

