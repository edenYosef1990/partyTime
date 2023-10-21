import { Rule, SyntaxNode } from "../types";

export function generateGenericListRules(singleItemName: string , multiItemsName: string | null) : Rule[] {
    let singlItemNameUppercase = singleItemName.toLocaleUpperCase();
    if (multiItemsName === null){
        multiItemsName = singlItemNameUppercase.toLocaleUpperCase() + 'S';
    }
    else{
        multiItemsName = multiItemsName.toLocaleUpperCase();
    }
    let multipleItemsNameUppercase = multiItemsName;
    return [
    {symbol: multipleItemsNameUppercase,
        tokensSymbolsSequence: [multipleItemsNameUppercase, singlItemNameUppercase],
        generateNewSyntaxNodeCallback: (nodes : SyntaxNode[]) => {
        return {
            symbol: multipleItemsNameUppercase,
            value: [...(nodes[0].value as SyntaxNode[]),nodes[1]]
        } satisfies SyntaxNode;
        }
    },
    {symbol: multipleItemsNameUppercase,
        tokensSymbolsSequence: [ singlItemNameUppercase, singlItemNameUppercase],
        generateNewSyntaxNodeCallback: null
    }];
}
 