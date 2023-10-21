import { Rule, SyntaxNode, generateIdentityToken, generateIdentityTokenLowerCase } from "../types";

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
