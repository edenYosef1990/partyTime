import { Rule, SyntaxNode } from "../types";
import { generateGenericListRules } from "./generic_list_rules";

export const COMPONENT_DEC_RULES : Rule[] = [
  {
    symbol: 'BLOCK',
    tokensSymbolsSequence: ['COMPONENT_DEC'],
    generateNewSyntaxNodeCallback: null
  },
  {
    symbol: 'COMPONENT_DEC',
    tokensSymbolsSequence: ['COMPONENT_DEC_TITLE', 'CURL_OPEN','PROPERTIES','CURL_CLOSE'],
    generateNewSyntaxNodeCallback: null
  },
  { symbol: 'COMPONENT_DEC_TITLE',
    tokensSymbolsSequence: ['COMPONENT_DEC_TITLE_HEADER', 'NAME'],
    generateNewSyntaxNodeCallback: null
  },
  ...generateGenericListRules("PROPERTY","PROPERTIES"),
  {
    symbol: 'PROPERTY',
    tokensSymbolsSequence: ['NAME','COLON','STRING'],
    generateNewSyntaxNodeCallback: null
  },{
    symbol: 'PROPERTY',
    tokensSymbolsSequence: ['NAME','COLON','NUMBER'],
    generateNewSyntaxNodeCallback: null
  }
]