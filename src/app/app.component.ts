import { Component } from '@angular/core';
import langJson from '../assets/syntax.json';
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
    if(this.lexicalTreeBuilder.buildTreeFromCode(this.code) !== null){
      console.log("working");
    }else{
      console.log("not working");
    }
  }

  constructor(){
    console.log(langJson.hello);
  }
}
