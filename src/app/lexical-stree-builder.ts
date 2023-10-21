import { GLOBAL_RULES, RULES, TOKENS } from "./lang_data";
import { COMPONENT_DEC_RULES } from "./lang_data/component_dec_lang_data";
import { Rule, SyntaxNode, SyntaxTree, compareStringArrays } from "./types";

export class LexicalTreeBuilder {

  private tryMatchToken(word: string): string | null {
    for(let token of TOKENS){
      let regex = new RegExp(token.regex,"i");
      let match = regex.test(word);
      if(match) {return token.symbol}
    }
    return null;
  }

  private tryCollapseUsingRules(nodes: SyntaxNode[], rules: Rule[]): boolean{
    let isChanged : boolean = false;
    let treeAsTokensArr : string[] = nodes.map(node => node.symbol);
    for(let i=0; i < treeAsTokensArr.length ; i++){
      for(let j=i ; j < treeAsTokensArr.length ; j++){
        for(let rule of rules){
          if(rule.tokensSymbolsSequence.length === (j - i + 1) &&
              compareStringArrays(rule.tokensSymbolsSequence,treeAsTokensArr.slice(i,j+1))){
                let children = nodes.splice(i,j - i + 1);
                if (rule.generateNewSyntaxNodeCallback !== null){
                  nodes.splice(i,0,rule.generateNewSyntaxNodeCallback(children));
                }
                else{
                  nodes.splice(i,0,{symbol: rule.symbol , value: children});
                }
                isChanged = true;
                return true;
          }
        }
      }
    }
    return isChanged;
  }

  private parseLine(line: string): null | SyntaxNode[] {
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

  public buildTreeFromCode(code: string) : SyntaxTree | null{
    let lines = code.split('\n');
    let linesSyntaxSubtrees : SyntaxNode[] = [];
    for(let line of lines){
      let lineTokensNodes = this.parseLine(line);
      if (lineTokensNodes === null) return null;
      while (lineTokensNodes.length > 1) {
        if(!this.tryCollapseUsingRules(lineTokensNodes, [...RULES,...COMPONENT_DEC_RULES])) return null;
      }
      linesSyntaxSubtrees.push(lineTokensNodes[0]);
    }



    while (linesSyntaxSubtrees.length > 1 && linesSyntaxSubtrees[0].symbol !== 'ROOT') {
    if(!this.tryCollapseUsingRules(linesSyntaxSubtrees, [...COMPONENT_DEC_RULES,...RULES,...GLOBAL_RULES])) {
        return null;
        }
    console.log(linesSyntaxSubtrees);
    }
    return {root: linesSyntaxSubtrees[0]};
  }
}