import { Pipe, PipeTransform } from '@angular/core';

/**
 * Takes a number and returns an an iterable over that number. Meant for use in ngFor.
 */
@Pipe({
  name: 'times'
})
export class TimesPipe implements PipeTransform {

  /**
   * Takes a number and returns an an iterable over that number.
   * @param value the number to create the iterable over.
   */
  transform(value: number): Iterable<number> {
    const iterable = <Iterable<number>>{};
    iterable[Symbol.iterator] = function* () {
      let n = 0;
      while (n < value) {
        yield ++n;
      }
    };
    return iterable;
  }

}
// TODO: Remove if unneeded