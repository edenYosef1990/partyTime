import { Rule, SyntaxNode, generateIdentityToken, generateIdentityTokenLowerCase } from "./types";

export const GLOBAL_RULES : Rule[] = [
  {symbol: 'LINES',
    tokensSymbolsSequence: ['LINES','LINE'],
    generateNewSyntaxNodeCallback: (nodes : SyntaxNode[]) => {
      return {
        symbol: 'LINES',
        value: [...(nodes[0].value as SyntaxNode[]),nodes[1]]
      } satisfies SyntaxNode;
    }
  },
  {symbol: 'LINES',
    tokensSymbolsSequence: ['LINE','LINE'],
    generateNewSyntaxNodeCallback: null
  },
  {symbol: 'ROOT',
    tokensSymbolsSequence: ['LINE','END'],
    generateNewSyntaxNodeCallback: null
  },
  {symbol: 'ROOT',
    tokensSymbolsSequence: ['LINES','END'],
    generateNewSyntaxNodeCallback: null
  },
]

export const RULES : Rule[] = [
  {symbol: 'SET_VALUE_COMMAND',
    tokensSymbolsSequence: ['SET','NAME','EQUAL','NUMBER'],
    generateNewSyntaxNodeCallback: null
  },
  {symbol: 'LINE',
  tokensSymbolsSequence: ['SET_VALUE_COMMAND'],
  generateNewSyntaxNodeCallback: null
  }
]

export const TOKENS = [
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