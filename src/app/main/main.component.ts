import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {


  isFlash = true;

  constructor (@Inject(DOCUMENT) private document: Document) {}

  ngOnInit(): void {

    const W = window.innerWidth;
    const H = window.innerHeight

    const updateAnimationTiming = () => {
      const animationDuration = 5 + Math.random() * 5; // [5 - 10)
      const animationDelay = 5 + Math.random() * 10; // [5 - 15)
      
      window.requestAnimationFrame(() => {
        this.document.getElementById("below")!.style.setProperty('--animationDuration', animationDuration + 's');
        this.document.getElementById("below")!.style.setProperty('--animationDelay', animationDelay + 's');
      });
      
      const timeout = (animationDuration + animationDelay) * 1000 - 100;
      
      setTimeout(updateAnimationTiming, timeout);
    }

    updateAnimationTiming();

    document.getElementById("below")!.addEventListener('mousemove', (e: any) => {
      window.requestAnimationFrame(() => {
        const X = e.clientX;
        const Y = e.clientY;

        this.document?.getElementById("below")!.style.setProperty('--cursorX', X + 'px');
        this.document?.getElementById("below")!.style.setProperty('--cursorY', Y + 'px');

        const X2 = X - (12 * W / 100) * (X / W - 0.5);
        const Y2 = Y - (12 * W / 100) * (Y / H - 0.5);

        document?.getElementById("below")!.style.setProperty('--cursorX2', X2 + 'px');
        document?.getElementById("below")!.style.setProperty('--cursorY2', Y2 + 'px');
      });
    });

  }


  titleAnimate(event:any){
          // ---- ---- ---- ---- ---- //
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let interval:any = null;

    let iteration = 0;

    clearInterval(interval);

    interval = setInterval(() => {
      event.target.innerText = event.target.innerText
        .split('')
        .map((letter: any, index: any) => {
          if (index < iteration) {
            return event.target.dataset.value[index];
          }
          return letters[Math.floor(Math.random() * 26)];
        })
        .join('');
      if (iteration >= event.target.dataset.value.length) {
        clearInterval(interval);
      }
      iteration += 1 / 3;
    }, 50);      
  }


  aboutMe(){

  }

  projects(){

  }

  lightOn(){
    
    const room = document.getElementById('room');
    const below = document.getElementById('below');

    if (room!.classList.contains('light-on')) {
      room!.classList.remove('light-on');
      room!.classList.add('light-off');
      below!.style.visibility = "hidden";
      this.isFlash = false;

    } else {
      room!.classList.remove('light-off');
      room!.classList.add('light-on');
      below!.style.visibility = "visible";
      this.isFlash = true;

    }
  
  }
  

}
