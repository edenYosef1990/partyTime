import { Component } from '@angular/core';
import langJson from '../assets/syntax.json';
import { Rule, SyntaxNode, SyntaxTree, compareStringArrays } from './types';
import { GLOBAL_RULES, RULES, TOKENS } from './lang_data';
import { LexicalTreeBuilder } from './lexical-stree-builder';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'edenScript';
  code: string = "";
  lexicalTreeBuilder : LexicalTreeBuilder = new LexicalTreeBuilder();

  click(){
    this.lexicalTreeBuilder.buildTreeFromCode(this.code);
  }

  constructor(){
    console.log(langJson.hello);
  }
}
