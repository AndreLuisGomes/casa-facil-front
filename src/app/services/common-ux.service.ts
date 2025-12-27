import { Injectable, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CommonUXService {

  registerOptions = signal<boolean>(true);
  registerCanProceed = signal<boolean>(false);

  constructor(private activatedRoute: ActivatedRoute, private route: Router) {

  }

  reset() {
    this.registerCanProceed.set(false)
    this.registerOptions.set(true);
  }

  toggleRegisterOptions() {
    this.registerOptions.update(signal => signal = !signal);
  }

  toggleRegisterCanProceed() {
    this.registerCanProceed.update(signal => signal = !signal);
  }
}
