import { Component, ViewChild, ElementRef } from '@angular/core';
import { ConfigfakerestService } from './Configfakerest.service';
import { Youtube } from './model/youtube';
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  YouTubes: Observable<Youtube[]>;

  YouTubesvideo: any;

  @ViewChild('name', { static: true })
  name: ElementRef;

  @ViewChild('id', { static: true })
  id: ElementRef;

  constructor(public restapi: ConfigfakerestService
  ) {

  }

  ngOnInit() {

    this.restapi.getvideoplayerlist().pipe(map(arr => arr.filter(r => r.approved === 1))).subscribe((data: any) => {
      this.YouTubes = data
      this.YouTubesvideo = this.YouTubes[0];
      this.name.nativeElement.value = this.YouTubesvideo.url.split("?v=")[1];
      this.id.nativeElement.value = this.YouTubesvideo.id;
    })
  }

}
