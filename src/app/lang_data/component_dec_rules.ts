import { Rule, SyntaxNode } from "../types";

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
  {
    symbol: 'PROPERTIES',
    tokensSymbolsSequence: ['PROPERTIES','PROPERTY'],
    generateNewSyntaxNodeCallback: (nodes : SyntaxNode[]) => {
      return {
        symbol: 'PROPERTIES',
        value: [...(nodes[0].value as SyntaxNode[]),nodes[1]]
      } satisfies SyntaxNode;
    }
  },
  {
    symbol: 'PROPERTIES',
    tokensSymbolsSequence: ['PROPERTY','PROPERTY'],
    generateNewSyntaxNodeCallback: null
  },
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