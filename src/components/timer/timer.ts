import { Component, Input, Output, EventEmitter } from '@angular/core';

export interface ITimer {
  seconds: number;
  secondsRemaining: number;
  runTimer: boolean;
  hasStarted: boolean;
  hasFinished: boolean;
  displayTime: string;
}

@Component({
  selector: 'timer',
  templateUrl: 'timer.html'
})
export class Timer {
    @Input() playState: string;
    @Output() stop: EventEmitter<any> = new EventEmitter<any>();
    timeInSeconds: number;
    duration: number = 0;
    public timer: ITimer;
    constructor() {
    }
 
    ngOnInit() {
        this.initTimer();
    }

    ngOnChanges() {
        if (this.playState == 'playing') {
            if (this.hasFinished) {this.initTimer();}
            this.startTimer();
        }
        else if (this.playState == 'stopped') {
            this.pauseTimer();
        }
    }

    reset_timer() {
        this.initTimer();
        if (this.playState == 'playing') {
            this.startTimer();
        }
    }
 
    hasFinished() {
        return this.timer.hasFinished;
    }
 
    initTimer() {
        if(!this.timeInSeconds) { this.timeInSeconds = 0; }
 
        this.timer = <ITimer>{
            seconds: this.timeInSeconds,
            runTimer: false,
            hasStarted: false,
            hasFinished: false,
            secondsRemaining: this.timeInSeconds
        };
 
        this.timer.displayTime = this.getSecondsAsDigitalClock(this.timer.secondsRemaining);
    }
 
    startTimer() {
        this.timer.hasStarted = true;
        this.timer.runTimer = true;
        this.timerTick();
    }
 
    pauseTimer() {
        this.timer.runTimer = false;
    }
 
    resumeTimer() {
        this.startTimer();
    }
 
    timerTick() {
        setTimeout(() => {
            if (!this.timer.runTimer) { return; }
            this.timer.secondsRemaining--;
            this.timer.displayTime = this.getSecondsAsDigitalClock(this.timer.secondsRemaining);
            if (this.timer.secondsRemaining > 0) {
                this.timerTick();
            }
            else {
                this.timer.hasFinished = true;
                if (this.timeInSeconds > 0) {
                    this.stop.emit(); // emit that timer has finished
                }
            }
        }, 1000);
    }
 
    getSecondsAsDigitalClock(inputSeconds: number) {
        var sec_num = parseInt(inputSeconds.toString(), 10); // don't forget the second param
        var hours   = Math.floor(sec_num / 3600);
        var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        var seconds = sec_num - (hours * 3600) - (minutes * 60);
        var hoursString = '';
        var minutesString = '';
        var secondsString = '';
        hoursString = (hours < 10) ? "0" + hours : hours.toString();
        minutesString = (minutes < 10) ? "0" + minutes : minutes.toString();
        secondsString = (seconds < 10) ? "0" + seconds : seconds.toString();
        return hoursString + 'h:' + minutesString + 'm:' + secondsString + 's';
    }
    
}
