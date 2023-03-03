import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent implements OnInit {
  duration: number = 1500;
  remaining: number;
  private countdownSub: Subscription;
  isRunning: boolean = false;
  isDisabled: boolean = false;
  private crankAudio: HTMLAudioElement;
  private dingAudio: HTMLAudioElement;
  points: number = 0;
  constructor() {
    this.updatepoints();
  }
  ngOnInit() {
    this.remaining = this.duration;
    this.crankAudio = new Audio('../assets/aud/crank.wav');
    this.dingAudio = new Audio('../assets/aud/ding.wav');
    document.addEventListener('keydown', (event) => {
      if (event.code === 'Numpad0') {
        this.isRunning ? null : this.start();
      }
      this.updatepoints();
    });
  }
  start() {
    this.updatepoints();
    this.remaining = this.duration;
    this.crankAudio.play();
    this.isRunning = true;
    this.startCountdown(this.remaining);
  }
  updatepoints(sub: number=0) {
    let points = localStorage.getItem('points');
    const ultimodia = localStorage.getItem('dia');
    const diaatual = new Date();
    if (ultimodia != diaatual.getDate().toString()) {
      this.points = Number(localStorage.getItem('points'));
      this.points += 8;
      localStorage.setItem('points', JSON.stringify(this.points));
      localStorage.setItem('dia', diaatual.getDate().toString());
    }
    if (sub == 1) {
      this.points = Number(localStorage.getItem('points'));
      this.points = this.points - 1;
      localStorage.setItem('points', JSON.stringify(this.points));
      localStorage.setItem('dia', diaatual.getDate().toString());
    }
    this.points = JSON.parse(points);
  }
  stop() {
    this.isRunning = false;
    this.countdownSub?.unsubscribe();
    this.remaining = this.duration;
    this.updatepoints();
  }
  setDisabled(value: boolean) {
    this.isDisabled = value;
  }
  private startCountdown(duration: number) {
    let countdown = new Observable<number>((subscriber) => {
      subscriber.next(duration);
      let timer = setInterval(() => {
        subscriber.next(--duration);
        if (duration <= 0) {
          clearInterval(timer);
          subscriber.complete();
        }
      }, 1000);
    });
    this.countdownSub = countdown.subscribe((value) => {
      this.remaining = value;
    }, null, () => {
      if (this.isRunning) this.dingAudio?.play();
      this.updatepoints(1);
      this.stop();
    });
  }
}
