import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'titleCase'
})
export class TitleCasePipe implements PipeTransform {

  transform(value: string): string {
    let words  = value.split(' ');
    let splitword = []
    for (let i in words){
      if(words[i].trim().length >0){
        words[i] = this.captializeFirstLetter(words[i]);
        splitword.push(words[i]);
      }
    }
    return splitword.join(' ');
  }

  captializeFirstLetter(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  }

}
