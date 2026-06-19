import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet, IonItem, IonLabel } from '@ionic/angular/standalone';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet, IonItem, IonLabel],
})
export class AppComponent {
  constructor() {}
}
