import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

import { Youtube } from '../../model/youtube';

declare function youTubePlayerChangeVideoId(video_id): any;

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {

  @Input() youtube: Youtube;

  video_id: string;

  @Output() notify: EventEmitter<Youtube> = new EventEmitter<Youtube>();

  @Output() youtubepass = new EventEmitter<Youtube>();
  constructor() { }

  ngOnInit() {

  }

  playselectedvideo() {
    this.notify.emit(this.youtube);
    this.video_id = this.youtube.url.split("?v=")[1];
    youTubePlayerChangeVideoId(this.video_id);
    this.youtubepass.emit(this.youtube);
  }

}
