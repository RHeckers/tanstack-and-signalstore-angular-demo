import { Component, input, model } from '@angular/core';
import { outputFromObservable, toObservable } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { debounce, distinctUntilChanged, filter, timer } from 'rxjs';

@Component({
  selector: 'app-number-input',
  imports: [FormsModule],
  templateUrl: './number-input.html',
  styleUrl: './number-input.scss',
})
export class NumberInput {
  value = model.required<number>();
  maxValue = input(999999);
  debounceTime = input(250);

  valueChange = outputFromObservable(
    toObservable(this.value).pipe(
      debounce(() => timer(this.debounceTime())),
      distinctUntilChanged(),
      filter((v) => v <= this.maxValue()),
    ),
  );
}
