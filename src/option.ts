"use strict";

export abstract class Option {

	protected shortopt : string;
	protected longopt : string;
	protected settings : OptionSettings;
	readonly requires_value : boolean = true;

	constructor (shortopt: string, longopt: string, settings : OptionSettings = {}) {
		this.shortopt = shortopt;
		this.longopt = longopt;
		this.settings = settings;
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

interface OptionCallback {
	(value : any) : any;
}

export interface OptionSettings {
	callback?: OptionCallback;
	destination?: string;
	default?: any;
	type?: string;
	help?: string;
}

export interface OptionInterface {
	readonly requires_value : boolean;
	set_value (value : any) : any;
	get_value () : any;
	get_shortopt () : string;
	get_longopt () : string;
	get_help () : string;
	get_name () : string;
	matches (key : string) : boolean;
}

export class GroupOption extends Option implements OptionInterface {

	private options : Array<OptionInterface> = [];

	constructor (name : string, ...options : Array<OptionInterface>) {
		super("", "");
		this.settings.destination = name;
		this.options = options;
	}

	public set_value (value : any) : void {
		throw new Error(`Cannot set value '${value}' of option group`);
	}

	public get_value () : boolean {
		return this.options.reduce((result : any, option : OptionInterface) => {
			result[option.get_name()] = option.get_value();
			return result;
		}, {});

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

export class FlagOption extends Option implements OptionInterface {

	private value : boolean = false;
	readonly requires_value : boolean = false;

	public set_value () : void {
		this.value = true;
		if (this.settings.callback) {
			this.value = this.settings.callback(this.value);
		}
	}

	public get_value () : boolean {
		return this.value;
	}

}

export class IncrementOption extends Option implements OptionInterface {

	private value : number = 0;
	readonly requires_value : boolean = false;

	public set_value () : void {
		this.value++;
		if (this.settings.callback) {
			this.value = this.settings.callback(this.value);
		}
	}

	public get_value () : number {
		return this.value;
	}

}

export class ListOption extends Option implements OptionInterface {

	private value : Array<string> = [];

	public set_value (value : string) : void {
		this.value.push(value);
		if (this.settings.callback) {
			this.value = this.settings.callback(this.value);
		}
	}

	public get_value () : Array<string> {
		return this.value;
	}

}

export class IntegerOption extends Option implements OptionInterface {

	private value : number = 0;

	public set_value (value : string) : void {
		this.value = parseInt(value, 10);
		if (this.settings.callback) {
			this.value = this.settings.callback(this.value);
		}
	}

	public get_value () : number {
		return this.value;
	}

}

export class NumberOption extends Option implements OptionInterface {

	private value : number = 0;

	public set_value (value : string) : void {
		this.value = parseFloat(value);
		if (this.settings.callback) {
			this.value = this.settings.callback(this.value);
		}
	}

	public get_value () : number {
		return this.value;
	}

}

export class StringOption extends Option implements OptionInterface {

	private value : string = "";

	public set_value (value : string) : void {
		this.value = value;
		if (this.settings.callback) {
			this.value = this.settings.callback(this.value);
		}
	}

	public get_value () : string {
		return this.value;
	}

}
