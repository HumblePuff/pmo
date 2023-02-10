import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {

  @Input() pauseEnabled: boolean = false;
  @Input() duration: number = 600;
  remaining: number;

  private countdownSub: Subscription;

  isRunning: boolean = false;
  isPaused: boolean = false;
  isDisabled: boolean = false;


  private crankAudio: HTMLAudioElement;
  private tickingAudio: HTMLAudioElement;
  private dingAudio: HTMLAudioElement;

  

  constructor() { }

  ngOnInit() {
    this.remaining = this.duration;
    this.crankAudio = new Audio('../assets/aud/crank.wav');
    this.dingAudio = new Audio('../assets/aud/ding.wav');
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.duration) {
      this.stop();
    }
  }

  start() {
    this.remaining = this.duration;
    this.crankAudio.play();
    this.unpause();
  }

  stop() {
    this.tickingAudio?.pause();
    this.pause();
    this.isPaused = false;
    this.remaining = this.duration;
  }

  pause() {
    this.tickingAudio?.pause();
    this.isRunning = false;
    this.isPaused = true;
    this.countdownSub?.unsubscribe();
  }

  unpause() {
    this.tickingAudio?.play();
    this.isRunning = true;
    this.isPaused = false;
    this.startCountdown(this.remaining);
  }

  get showPauseButton() {
    return this.pauseEnabled && (this.countdownSub && !this.countdownSub.closed || this.isPaused);
  }

  setDisabled(value: boolean) {
    this.isDisabled = value;
  }

  private startCountdown(duration: number) {
    // declare countdown observable
    let countdown: Observable<number> = new Observable<number>(subscriber => {
      subscriber.next(duration);
      let timer = setInterval(() => {
        subscriber.next(--duration);
        if (duration <= 0) {
          clearInterval(timer);
          subscriber.complete();
        }
      }, 1000);
    });

    // subscribe to the newly created observable to update the UI variables.
    this.countdownSub = countdown.subscribe(
      value => {
        this.remaining = value;
      },
      err => { },
      () => {
        if (this.isRunning) { this.dingAudio?.play() };
        this.stop();
      }
    );
      }





}

