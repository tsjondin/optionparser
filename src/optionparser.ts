"use strict";

import {
	OptionInterface,
	GroupOption,
	FlagOption
} from "./option";

export class OptionMissingArgumentError extends Error {
	constructor (message : string) {
		super(message);
		Object.setPrototypeOf(this, OptionMissingArgumentError.prototype);
	}
}

export class OptionInvalidKeyError extends Error {
	constructor (message : string) {
		super(message);
		Object.setPrototypeOf(this, OptionInvalidKeyError.prototype);
	}
}

export class OptionParser {

	private options : Array<OptionInterface> = [];
	private description : string = "";

	private executable : string | undefined;
	private bin : string | undefined;

	constructor (description : string, ...options : Array<OptionInterface>) {

		this.description = description;
		this.options = options;

		this.add(new FlagOption('h', 'help', {
			help: 'Shows this help',
			callback: () => {
				this.help();
			}
		}));

	}

	private get (key: string) : OptionInterface | undefined {
		let opt : OptionInterface | undefined = this.options.find((option : OptionInterface) : boolean => {
			return option.matches(key);
		});
		if (opt instanceof GroupOption) {
			return opt.get(key);
		}
		return opt;
	}

	public add (option : OptionInterface) {
		this.options.push(option);
		return this;
	}

	/**
	 * Writes full help text to STDOUT
	 */
	public help () : void {
		const write = process.stdout.write.bind(process.stdout);
		write(`Usage: ${this.executable} [options]\n`);
		// this.groups.forEach((group : GroupOption) => group.render());
		process.exit(1);
	}

	/**
	 * Minimal highly context-full recursive descent parser for command-line
	 * arguments and options
	 */
	public parse (args : Array<string> = process.argv) : object {

		const MATCH_KEY : RegExp = /^(\-\-|\-)(.+)/;
		let parameters : Array<string | undefined> = [];

		const accept_key = (stream : Array<string>) : Function => {

			let match : RegExpMatchArray | null;
			let input : string | undefined = stream.shift();

			if (input && (match = input.match(MATCH_KEY))) {
				let option = this.get(match[2]);
				if (option && !option.requires_value) {
					option.set_value(undefined);
					return accept_key;
				} else if (!option) {
					throw new OptionInvalidKeyError(
						`${this.executable}: invalid option -- '${match[2]}'\n` +
						`Try '${this.executable} --help' for more information\n`
					);
				} else {
					return accept_value(match[2], stream);
				}
			}

			/**
			 * Short-circuit parser and expect that trailing arguments are raw data
			 * and not options.
			 */
			parameters.push(input);
			while (stream.length > 0) {
				parameters.push(stream.shift());
			}
			return accept_key;

		}

		const accept_value =  (key : string, stream : Array<string>) : Function => {

			let input : string | undefined = stream.shift();

			if (input && !input.match(MATCH_KEY)) {
				let option = this.get(key);
				if (option) {
					option.set_value(input);
					return accept_key;
				}
			}

			throw new OptionMissingArgumentError(
				`${this.executable}: option requires an argument -- '${key}'\n` +
				`Try '${this.executable} --help' for more information\n`
			);

		}

		this.bin = args.shift();
		this.executable = args.shift();

		if (this.executable) {
			this.executable = this.executable.split(/\//).pop();
		}

		let accept : Function = accept_key;
		while (args.length > 0) {
			accept = accept(args);
		}

		return this.options.reduce((result : any, option : OptionInterface) => {
			result[option.get_name()] = option.get_value();
			return result;
		}, {});

	}

}