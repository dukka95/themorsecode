import { Injectable } from '@angular/core';
import {Dictionary} from "./dictionary";
import InvalidInputError from "../interceptors/invalid-input";

@Injectable({
  providedIn: 'root'
})
export class MorseService {

  constructor() { }

  //
  // Encoding : text to morse
  //
  encode(message : string) :string {

    let cipher : string = '';

    for(let letter of message){

      // Looks up the dictionary and adds the correspponding morse code
      // along with a space to separate morse codes for different characters
      if (!(letter.toLowerCase() in Dictionary)) {
        throw new InvalidInputError(InvalidInputError.INVALID_INPUT);
      }

      cipher += Dictionary[letter.toLowerCase()];

      cipher += ' ';

    }

    return cipher;

  }

  //
  // Decoding : morse to text
  //
  decode(message : string) :string {

    // Extra space added at the end to access the last morse code
    message += ' ';

    let decipher : string = '';
    let citext : string = '';

    let i = 0;

    for(let letter of message) {

      // Check for space
      if(letter!=' ') {

        // Counter to keep track of space
        i = 0;

        // Storing morse code of a single character
        citext += letter;

      } else {

        // If i = 1 that indicates a new character
        i += 1;

        // If i = 2 that indicates a new word
        if (i==2) {
          // Adding space to separate words
          decipher += ' '
        } else {
          // Accessing the keys using their values
          const letterDecodedFromMorseCode = Object.keys(Dictionary).find(key => Dictionary[key] === citext);
          if (!letterDecodedFromMorseCode) {
            throw new InvalidInputError(InvalidInputError.INVALID_MORSE_INPUT);
          }
          decipher += letterDecodedFromMorseCode;
          citext = '';
        }

      }

    }

    return decipher;
  }

}
