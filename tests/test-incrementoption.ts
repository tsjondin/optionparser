"use strict";

import {suite, test} from "mocha-typescript";
import {expect} from 'chai';

import {
  OptionParser,
  IncrementOption
} from "../index";

@suite("Test increment options")
export class IncrementOptionTester {

  @test "Short option is correctly parsed from arguments" () {

    const parser = new OptionParser("IncrementOption Test",
      new IncrementOption('t', 'test')
    );

    const options : any = parser.parse(['bin', 'test', '-t']);
    expect(options.test.get_value()).to.equal(1);

  }

  @test "Long option is correctly parsed from arguments" () {

    const parser = new OptionParser("IncrementOption Test",
      new IncrementOption('t', 'test')
    );

    const options : any = parser.parse(['bin', 'test', '--test']);
    expect(options.test.get_value()).to.equal(1);

  }

  @test "Increment option value increases with number of instances" () {

    const parser = new OptionParser("IncrementOption Test",
      new IncrementOption('t', 'test')
    );

    const options : any = parser.parse(['bin', 'test', '--test', '--test', '--test']);
    expect(options.test.get_value()).to.equal(3);

  }

  @test "Increment option value increases with number of instances using mixed options" () {

    const parser = new OptionParser("IncrementOption Test",
      new IncrementOption('t', 'test')
    );

    const options : any = parser.parse(['bin', 'test', '--test', '-t', '--test']);
    expect(options.test.get_value()).to.equal(3);

  }

}

