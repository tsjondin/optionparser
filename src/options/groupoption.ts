"use strict";

import {Option, OptionInterface, OptionSettings} from './option';

type GroupValue = {[index:string] : OptionInterface};
type OptionList = Array<OptionInterface>;

export class GroupOption extends Option<GroupValue> {

  private options : OptionList = [];
  protected settings : OptionSettings<GroupValue> = {};

  constructor (name : string, settings : OptionSettings<GroupValue> = {}, ...options : OptionList) {
    super("", "", settings);
    this.settings = settings;
    this.settings.destination = name;
    this.options = options;
  }

  public set_value<T> (value : T) : void {
    throw new Error(`Cannot set value '${value}' of option group`);
  }

  public get_value () : GroupValue {

    let value = this.options.reduce((result : GroupValue, option : OptionInterface) => {
      result[option.get_name()] = option;
      return result;
    }, {});

    if (this.settings.callback) {
      return this.settings.callback(value);
    }

    return value;

  }

  public get (key : string) : OptionInterface | undefined {
    let opt : OptionInterface | undefined = this.options.find((option : OptionInterface) : boolean => {
      return option.matches(key);
    });
    if (opt instanceof GroupOption) {
      return opt.get(key);
    }
    return opt;
  }

  public matches (key : string) : boolean {
    return this.options.some((option : OptionInterface) : boolean => (option.matches(key)));
  }

}

