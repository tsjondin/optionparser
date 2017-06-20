"use strict";

export class TextTools {

	public static pad (text : string, size : number, character : string = " ") : string {
		while (text.length < size) {
			text = text + character;
		}
		return text;
	}

	public static chunk_words (text : string, size : number) : Array<string> {

		let words : Array<string> = text.split(/\s+/);
		let lines : Array<string> = [];
		let line : string = "";

		while (words.length > 0) {
			let word : string | undefined = words.shift();
			if (word) {
				if ((line.length + word.length) > size) {
					lines.push(line);
					words.unshift(word);
					line = "";
				} else {
					line = line + " " + word;
				}
			}
		}

		if (line.length > 0) {
			lines.push(line);
		}

		return lines;

	}

}
