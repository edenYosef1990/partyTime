import { Rule, SyntaxNode, generateIdentityToken, generateIdentityTokenLowerCase } from "../types";
import { generateGenericListRules } from "./generic_list_rules";

export const GLOBAL_RULES : Rule[] = [
  ...generateGenericListRules("BLOCK",null),
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
