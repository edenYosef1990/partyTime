import { Component } from '@angular/core';
import langJson from '../assets/syntax.json';

interface Token {
  symbol: string,
  regex: string
}

function generateIdentityToken(token: string) : Token{
  return {
    symbol: token,
    regex: token.toLowerCase()
  };
}

let TOKENS = [
  ...(
    ["SET",
    "AS" ,"PRESS" , "PLAYER" , 
    "UP", "DOWN", "LEFT", "RIGHT"]
    .map(token => generateIdentityToken(token))
  ),

  { symbol: "COLON", regex: ":" },
  { symbol: "ARROW", regex: "=>" },
  { symbol: "EQUAL", regex: "=" },
  { symbol: "NAME" , regex: "[a-zA-Z]+" },
  { symbol: "NUMBER" , regex: "[0-9]+" },
]

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'edenScript';
  code: string = "";



  tryMatchToken(word: string): string | null {
    for(let token of TOKENS){
      let regex = new RegExp(token.regex,"i");
      let match = regex.test(word);
      if(match) {return token.symbol}
    }
    return null;
  }

  parseLine(line: string){
    let spaceChar = " ";
    let wordInLine = line.split(spaceChar);
    for(let word of wordInLine){
        let res = this.tryMatchToken(word);
        if(res == null){
          console.log(`the word ${word} is undentified`);
        }
        else{
          console.log(`match to symbol ${res}`);
        }
    };
  }

  split(code: string){
    let lines = code.split('\n');
    lines.forEach(line => {
      this.parseLine(line);
    });

  }

  click(){
    this.split(this.code);
  }

  constructor(){
    console.log(langJson.hello);
    let text = "set";
    let regex = new RegExp("set","i");
    let match = regex.test(text);
    console.log(match);
  }
}
