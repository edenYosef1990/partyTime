import { Rule, SyntaxNode } from "../types";
import { generateGenericListRules } from "./generic_list_rules";

export const ENTITY_GENERATION_RULES : Rule[] = [
  {
    symbol: 'BLOCK',
    tokensSymbolsSequence: ['ENTITY_GEN'],
    generateNewSyntaxNodeCallback: null
  },
  {
    symbol: 'COMPONENT_DEC',
    tokensSymbolsSequence: ['ENTITY_GEN_TITLE', 'CURL_OPEN','COMPONENT_GENS','CURL_CLOSE'],
    generateNewSyntaxNodeCallback: null
  },
  { symbol: 'ENTITY_GEN_TITLE',
    tokensSymbolsSequence: ['ENTITY_GEN_TITLE_HEADER', 'NAME'],
    generateNewSyntaxNodeCallback: null
  },
  ...generateGenericListRules("COMPONENT_GEN",null),
  {
    symbol: 'COMPONENT_GEN',
    tokensSymbolsSequence: ['NAME','COLON','STRING'],
    generateNewSyntaxNodeCallback: null
  }
]