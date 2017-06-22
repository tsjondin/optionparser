"use strict";

import {suite, test} from "mocha-typescript";
import {expect} from 'chai';
//import {provider} from './decorators';

import {
  OptionParser,
  OptionInvalidKeyError,
  OptionHelpError,
  StringOption,
  FlagOption,
  ListOption
} from "../index";

@suite("Test OptionParser")
export class ParserTester {

  @test "Long option name is used if no destination is set"
  () {

    const parser = new OptionParser("FlagOption Test",
      new StringOption("s", "string")
    );

    const options : any = parser.parse(['bin', 'test'],);
    expect(Object.keys(options)).to.include.members(['string']);

  }

  @test "Destination overrides long option as name"
  () {

    const parser = new OptionParser("FlagOption Test",
      new StringOption("s", "string", {destination: "foobar"})
    );

    const options : any = parser.parse(['bin', 'test']);
    expect(Object.keys(options)).to.include.members(["foobar"]);

  }

  @test "Leftover arguments are treated as parameters"
  () {

    const parser = new OptionParser("Parameter Test");
    parser.parse(['bin', 'test', 'param1', 'param2']);
    expect(parser.get_parameters()).to.deep.equal(['param1', 'param2']);

  }

  @test "Has a default help flag"
  () {
    const parser = new OptionParser("FlagOption Test");
    const options : any = parser.parse(['bin', 'test']);
    expect(Object.keys(options)).to.have.members(['help']);
  }

  @test "Resulting object contains all options given"
  () {

    const parser = new OptionParser("FlagOption Test",
      new StringOption("s", "string"),
      new FlagOption("f", "flag"),
      new ListOption("l", "list")
    );

    const options : any = parser.parse(['bin', 'test']);
    expect(Object.keys(options)).to.include.members(['string', 'flag', 'list']);

  }

  @test "Running with --help/-h option should throw an error containing help text" () {

    const parser = new OptionParser("Help error test");

    expect(parser.parse.bind(parser, ["bin", "test", "--help", "-h"]))
      .to.throw(OptionHelpError);

  }

  @test "Invalid key throws OptionInvalidKeyError" () {

    const parser = new OptionParser("StringOption Test");

    expect(parser.parse.bind(parser, ["bin", "test", "--test"]))
      .to.throw(OptionInvalidKeyError);

  }

}

