import { Pipe, PipeTransform } from '@angular/core';

/**
 * Converts a given value in seconds to the format MM:SS for display.
 */
@Pipe({
  name: 'timerDisplay'
})
export class TimerDisplayPipe implements PipeTransform {

  /**
   * Converts a given value in seconds to the format MM:SS
   * @param fullTime time in seconds
   */
  transform(fullTime: number): string {
    let minutes: string = Math.floor(fullTime/60).toString().padStart(2, '0');
    let seconds: string = Math.round(fullTime%60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  }

}
