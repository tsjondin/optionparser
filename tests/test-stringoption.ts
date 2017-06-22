"use strict";

import {suite, test} from "mocha-typescript";
import {expect} from "chai";

import {
  OptionParser,
  StringOption,
  OptionMissingArgumentError
} from "../index";

@suite("Test string options")
export class StringOptionTester {

  @test "Short option is correctly parsed from arguments" () {

    const parser = new OptionParser("StringOption Test",
      new StringOption("t", "test")
    );

    const options : any = parser.parse(["bin", "test", "-t", "value"]);
    expect(options.test.get_value()).to.equal("value");

  }

  @test "Long option is correctly parsed from arguments" () {

    const parser = new OptionParser("StringOption Test",
      new StringOption("t", "test")
    );

    const options : any = parser.parse(["bin", "test", "--test", "value"]);
    expect(options.test.get_value()).to.equal("value");

  }

  @test "String option requires value" () {

    const parser = new OptionParser("StringOption Test",
      new StringOption("t", "test")
    );

    expect(parser.parse.bind(parser, ["bin", "test", "--test"]))
      .to.throw(OptionMissingArgumentError);

  }

  @test "Missing string option results in 'undefined'" () {

    const parser = new OptionParser("StringOption Test",
      new StringOption("t", "test")
    );

    const options : any = parser.parse(["bin", "test"]);
    expect(options.test.get_value()).to.equal(undefined);

  }

  @test "Missing string option with 'default' setting set results in default" () {

    const parser = new OptionParser("StringOption Test",
      new StringOption("t", "test", {default: "No such value set"})
    );

    const options : any = parser.parse(["bin", "test"]);
    expect(options.test.get_value()).to.equal("No such value set");

  }

}
