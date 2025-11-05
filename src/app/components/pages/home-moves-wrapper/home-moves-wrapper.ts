import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { providePokemon } from '../../../data-access/providers/pokemon.provider';

@Component({
  selector: 'app-home-moves-wrapper',
  imports: [RouterOutlet],
  templateUrl: './home-moves-wrapper.html',
  providers: [providePokemon()],
})
export class HomeMovesWrapper {}
