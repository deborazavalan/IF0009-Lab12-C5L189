import { Component } from '@angular/core';
import { CharlaRegistroComponent } from './components/charla-registro/charla-registro.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CharlaRegistroComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'TechConf';
}
