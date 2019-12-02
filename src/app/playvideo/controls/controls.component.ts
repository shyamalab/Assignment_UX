import { Component, OnInit, ViewChild, ElementRef, Input, SimpleChanges } from '@angular/core';
import { Youtube } from 'src/app/model/youtube';
import { ConfigfakerestService } from '../../Configfakerest.service';
import { ShareserviceService } from '../../shareservice.service';

declare function videoIdTrigger(): any;

declare var tube_id: any;

declare function youTubePlayerPlay(): any;
declare function youTubePlayerPause(): any;
declare function youTubePlayerStop(): any;
declare function youTubePlayerReplay(videoid): any;
declare function youTubePlayerVolumeChange(volume): any;



@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css']
})
export class ControlsComponent implements OnInit {


  @Input() youcontrol: Youtube;

  youtubeload: Youtube;
  idprogressvalue: number;
  video: string;
  likevalue: number;
  unlikevalue: number;
  id: string;
  Playing:boolean = false;
  Paused:boolean = false;
  Stopped:boolean = false;

  video_id: string;
  @ViewChild('progressvalue', { static: true })
  progressvalue: ElementRef;

  constructor(public restapi: ConfigfakerestService,
    public share: ShareserviceService
  ) { }

  ngOnInit() {
    videoIdTrigger();
  }

  youTubePlayerVolumeChangeInc(input) {

    youTubePlayerVolumeChange(input);
  }
  youTubePlayerPlaynew() {

    if (this.youcontrol == undefined) {
      this.id = tube_id.value;
      this.restapi.getvideoplayer(this.id).subscribe((data: any) => {
        this.youtubeload = data
      })
    } else {
      this.id = this.youcontrol.id;
    }
    youTubePlayerPlay();
    this.share.StatusvideoPlayer(this.id, 'Playing');
    this.Playing = true;
    this.Paused = false;
    this.Stopped = false;

  }

  likevideo() {
    if (this.youcontrol == undefined) {
      this.id = tube_id.value;
      this.restapi.getvideoplayer(this.id).subscribe((data: any) => {
        this.youtubeload = data
      })
      this.likevalue = this.youtubeload.likes + 1;
    } else {
      this.id = this.youcontrol.id;
      this.restapi.getvideoplayer(this.id).subscribe((data: any) => {
        this.youcontrol = data
      })
      this.likevalue = this.youcontrol.likes + 1;
    }

    this.share.likesvideoPlayer(this.id, this.likevalue);
  }

  unlikevideo() {
    if (this.youcontrol == undefined) {
      this.id = tube_id.value;
      this.restapi.getvideoplayer(this.id).subscribe((data: any) => {
        this.youtubeload = data
      })
      this.unlikevalue = this.youtubeload.unlike + 1;
    } else {
      this.id = this.youcontrol.id;
      this.restapi.getvideoplayer(this.id).subscribe((data: any) => {
        this.youcontrol = data
      })
      this.unlikevalue = this.youcontrol.unlike + 1;
    }
    this.share.unlikesvideoPlayer(this.id, this.unlikevalue);
  }


  youTubePlayerPausenew() {
    this.Playing = false;
    this.Paused = true;
    this.Stopped = false;
    if (this.youcontrol == undefined) {
      this.id = tube_id.value;
    } else {
      this.id = this.youcontrol.id;
    }
    youTubePlayerPause();
    this.share.StatusvideoPlayer1(this.id, 'Paused', this.progressvalue.nativeElement.value);
  }

  youTubePlayerStopnew() {
    this.Playing = false;
    this.Paused = false;
    this.Stopped = true;
    if (this.youcontrol == undefined) {
      this.id = tube_id.value;
    } else {
      this.id = this.youcontrol.id;

    }
    youTubePlayerStop();
    this.share.StatusvideoPlayer1(this.id, 'Stopped', this.progressvalue.nativeElement.value);
  }

  youTubePlayerReplaynew() {
    if (this.youcontrol == undefined) {
      this.id = tube_id.value;
      this.restapi.getvideoplayer(this.id).subscribe((data: any) => {
        this.youtubeload = data
      })
      this.video_id = this.youtubeload.url.split("?v=")[1];
    } else {
      this.id = this.youcontrol.id;
      this.video_id = this.youcontrol.url.split("?v=")[1];
    }

    youTubePlayerReplay(this.video_id);
  }

}
