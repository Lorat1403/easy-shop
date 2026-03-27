import { Component, signal, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
  
export class App implements OnInit {
  protected readonly title = signal('easy-shop'); 

  ngOnInit(): void {   
  } 
}
