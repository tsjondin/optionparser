"use strict";

import {suite, test} from "mocha-typescript";
import {expect} from 'chai';

import {
	OptionParser,
	StringOption,
	OptionMissingArgumentError
} from "../index";

@suite("Test string options")
class StringOptionTester {

	@test "Short option is correctly parsed from arguments" () {

		const parser = new OptionParser("StringOption Test",
			new StringOption('t', 'test')
		);

		const options : any = parser.parse(['bin', 'test', '-t', 'value']);
		expect(options.test).to.equal('value');

	}

	@test "Long option is correctly parsed from arguments" () {

		const parser = new OptionParser("StringOption Test",
			new StringOption('t', 'test')
		);

		const options : any = parser.parse(['bin', 'test', '--test', 'value']);
		expect(options.test).to.equal('value');

	}

	@test "String option requires value" () {

		const parser = new OptionParser("StringOption Test",
			new StringOption('t', 'test')
		);

		expect(parser.parse.bind(parser, ['bin', 'test', '--test']))
			.to.throw(OptionMissingArgumentError);

	}

}

