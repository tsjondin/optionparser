"use strict";

import {suite, test} from "mocha-typescript";
import {expect} from 'chai';

import {
  OptionParser,
  FlagOption
} from "../index";

@suite("Test flag options")
export class FlagOptionTester {

  @test "Short option is correctly parsed from arguments" () {

    const parser = new OptionParser("FlagOption Test",
      new FlagOption('t', 'test')
    );

    const options : any = parser.parse(['bin', 'test', '-t']);
    expect(options.test.get_value()).to.equal(true);

  }

  @test "Long option is correctly parsed from arguments" () {

    const parser = new OptionParser("FlagOption Test",
      new FlagOption('t', 'test')
    );

    const options : any = parser.parse(['bin', 'test', '--test']);
    expect(options.test.get_value()).to.equal(true);

  }

  @test "Missing flag option results in 'undefined'" () {

    const parser = new OptionParser("FlagOption Test",
      new FlagOption('t', 'test')
    );

    const options : any = parser.parse(['bin', 'test']);
    expect(options.test.get_value()).to.equal(undefined);

  }

}

