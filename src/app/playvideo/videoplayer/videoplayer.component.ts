import { Component, OnInit, ViewChild, AfterViewInit, Input, ElementRef } from '@angular/core';
import { Youtube } from '../../model/youtube';
import { ConfigfakerestService } from '../../Configfakerest.service';
import { Observable } from "rxjs";
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

import { ShareserviceService } from '../../shareservice.service';

declare function onYouTubeIframeAPIReady(): any;

@Component({
  selector: 'app-videoplayer',
  templateUrl: './videoplayer.component.html',
  styleUrls: ['./videoplayer.component.css']
})
export class VideoplayerComponent implements OnInit, AfterViewInit {

  YouTubes: Observable<Youtube[]>;

  YouTubesvideo: any;

  datafromchild: Youtube;

  id: any;

  video_id: any;

  public ClickedYouTube: Youtube;

  ngAfterViewInit() {
    onYouTubeIframeAPIReady();
  }

  constructor(public restapi: ConfigfakerestService,
    private sharedata: ShareserviceService,
    public router: Router) {
  }

  ngOnInit() {

    this.loadVideoPlayerlist();

  }

  loadVideoPlayerlist() {
    return this.restapi.getvideoplayerlist().pipe(map(arr => arr.filter(r => r.approved === 1)))
      .subscribe((data: any) => { this.YouTubes = data })
  }

  handlenotify(eventData: Youtube) {
    this.datafromchild = eventData;
    this.video_id = this.datafromchild.url.split("?v=")[1];
  }

  youtubeControl(youtube: Youtube) {
    this.ClickedYouTube = youtube;
  }

}
