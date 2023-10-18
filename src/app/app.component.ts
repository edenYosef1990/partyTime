import { Component } from '@angular/core';
import langJson from '../assets/syntax.json';

interface Token {
  symbol: string,
  regex: string
}

interface Rule {
  symbol: string,
  tokensSymbolsSequence: string[],
}

interface SyntaxNode {
  symbol: string,
  value: string | SyntaxNode[]
}

function compareStringArrays(arrL: string[], arrR: string[]): boolean{
  if(arrL.length !== arrR.length) return false;
  for(let i=0; i < arrR.length; i++){
    if (arrL[i] !== arrR[i]) return false;
  }
  return true;
}

interface SyntaxTree {
  root: SyntaxNode
}

function generateIdentityTokenLowerCase(token: string) : Token{
  return {
    symbol: token,
    regex: token.toLowerCase()
  };
}


function generateIdentityToken(token: string) : Token{
  return {
    symbol: token,
    regex: token
  };
}

let RULES : Rule[] = [
  {symbol: 'SET_VALUE_COMMAND',
    tokensSymbolsSequence: ['SET','NAME','EQUAL','NUMBER']
  },
  {symbol: 'LINE',
  tokensSymbolsSequence: ['SET_VALUE_COMMAND']
},
  {symbol: 'ROOT',
    tokensSymbolsSequence: ['LINES']
  },
  {symbol: 'LINES',
    tokensSymbolsSequence: ['LINE','LINES']
  },
  {symbol: 'LINES',
    tokensSymbolsSequence: ['END']
  }
]

let TOKENS = [
  ...(
    ["ROOT" ,"LINE", "LINES", "END", "SET_VALUE_COMMAND",
]
    .map(token => generateIdentityToken(token))
  ),
  ...(
    ["SET",
    "AS" ,"PRESS" , "PLAYER" , 
    "UP", "DOWN", "LEFT", "RIGHT"]
    .map(token => generateIdentityTokenLowerCase(token))
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

  tryCollapseUsingRules(nodes: SyntaxNode[], rules: Rule[]): boolean{
    let isChanged : boolean = false;
    let treeAsTokensArr : string[] = nodes.map(node => node.symbol);
    for(let i=0; i < treeAsTokensArr.length ; i++){
      for(let j=i + 1; j < treeAsTokensArr.length ; j++){
        for(let rule of rules){
          if(rule.tokensSymbolsSequence.length === (j - i + 1) &&
              compareStringArrays(rule.tokensSymbolsSequence,treeAsTokensArr.slice(i,j+1))){
                let children = nodes.splice(i,j+1);
                nodes.push({symbol: rule.symbol , value: children});
                isChanged = true;
          }
        }
      }
    }
    return isChanged;
  }

  parseLine(line: string): null | SyntaxNode[] {
    let spaceChar = " ";
    let wordInLine = line.split(spaceChar);
    let nodes: SyntaxNode[] = [];
    for(let word of wordInLine){
        let res = this.tryMatchToken(word);
        if(res == null){
          console.log(`the word ${word} is undentified`);
          return null;
        }
        else{
          nodes.push({symbol: res , value: word});
        }
    };
    return nodes;
  }

  split(code: string) : SyntaxTree | null{
    let lines = code.split('\n');
    let linesSyntaxSubtrees : SyntaxNode[] = [];
    for(let line of lines){
      let lineTokensNodes = this.parseLine(line);
      if (lineTokensNodes === null) return null;
      while (lineTokensNodes.length > 1) {
        if(!this.tryCollapseUsingRules(lineTokensNodes, RULES)) return null;
      }
      linesSyntaxSubtrees.push(lineTokensNodes[0]);
    }


    console.log("before");
    console.log(linesSyntaxSubtrees);

    while (linesSyntaxSubtrees.length > 1) {
      if(!this.tryCollapseUsingRules(linesSyntaxSubtrees, RULES)) return null;
      console.log("current");
      console.log(linesSyntaxSubtrees);
    }

    console.log("after");
    console.log(linesSyntaxSubtrees);

    return {root: linesSyntaxSubtrees[0]}
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
