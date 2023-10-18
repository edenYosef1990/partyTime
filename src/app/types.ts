export interface Token {
    symbol: string,
    regex: string
  }
  
  export interface Rule {
    symbol: string,
    tokensSymbolsSequence: string[],
    generateNewSyntaxNodeCallback : ((node : SyntaxNode[]) => SyntaxNode) | null
  }
  
  export interface SyntaxNode {
    symbol: string,
    value: string | SyntaxNode[]
  }
  
  export function compareStringArrays(arrL: string[], arrR: string[]): boolean{
    if(arrL.length !== arrR.length) return false;
    for(let i=0; i < arrR.length; i++){
      if (arrL[i] !== arrR[i]) return false;
    }
    return true;
  }
  
 export interface SyntaxTree {
    root: SyntaxNode
  }
  
  export function generateIdentityTokenLowerCase(token: string) : Token{
    return {
      symbol: token,
      regex: token.toLowerCase()
    };
  }
  
  
    export function generateIdentityToken(token: string) : Token{
    return {
      symbol: token,
      regex: token
    };
  }