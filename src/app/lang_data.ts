import { Rule, SyntaxNode, generateIdentityToken, generateIdentityTokenLowerCase } from "./types";

export const GLOBAL_RULES : Rule[] = [
  {symbol: 'BLOCKS',
    tokensSymbolsSequence: ['BLOCKS','BLOCK'],
    generateNewSyntaxNodeCallback: (nodes : SyntaxNode[]) => {
      return {
        symbol: 'BLOCKS',
        value: [...(nodes[0].value as SyntaxNode[]),nodes[1]]
      } satisfies SyntaxNode;
    }
  },
  {symbol: 'BLOCKS',
    tokensSymbolsSequence: ['BLOCK','BLOCK'],
    generateNewSyntaxNodeCallback: null
  },
  {symbol: 'ROOT',
    tokensSymbolsSequence: ['BLOCK','END'],
    generateNewSyntaxNodeCallback: null
  },
  {symbol: 'ROOT',
    tokensSymbolsSequence: ['BLOCKS','END'],
    generateNewSyntaxNodeCallback: null
  },
]

export const RULES : Rule[] = [
  {symbol: 'SET_VALUE_COMMAND',
    tokensSymbolsSequence: ['SET','NAME','EQUAL','NUMBER'],
    generateNewSyntaxNodeCallback: null
  },
  {symbol: 'BLOCK',
  tokensSymbolsSequence: ['SET_VALUE_COMMAND'],
  generateNewSyntaxNodeCallback: null
  }
]

export const TOKENS = [
    { symbol: "COMPONENT_DEC_TITLE_HEADER", regex: "component_dec:" },
    { symbol: "SYSTEM_INIT_TITLE", regex: "ststem_init:" },
    { symbol: "SYSTEM_LOOP_TITLE", regex: "ststem_loop:" },
  ...(
    ["ROOT" ,"LINE", "LINES", "BLOCK", "BLOCKS", "END", "SET_VALUE_COMMAND",
]
    .map(token => generateIdentityToken(token))
  ),
  ...(
    ["SET",
    "AS" ,"PRESS" , "PLAYER" , 
    "UP", "DOWN", "LEFT", "RIGHT",
    "FOR" ,"VAR", "IN", "STRING", "NUMBER"]
    .map(token => generateIdentityTokenLowerCase(token))
  ),

  { symbol: "CURL_OPEN", regex: "{" },
  { symbol: "CURL_CLOSE" , regex: "}" },
  { symbol: "COLON", regex: ":" },
  { symbol: "ARROW", regex: "=>" },
  { symbol: "EQUAL", regex: "=" },
  { symbol: "NAME" , regex: "[a-zA-Z]+" },
  { symbol: "NUMBER" , regex: "[0-9]+" },
]