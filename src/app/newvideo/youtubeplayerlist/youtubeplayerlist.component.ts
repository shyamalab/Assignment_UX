import { Component, OnInit, Input } from '@angular/core';

import { Youtube } from '../../model/youtube';
import { ConfigfakerestService } from '../../Configfakerest.service';
import { Observable } from "rxjs";
import { Router } from '@angular/router';


@Component({
  selector: 'app-youtubeplayerlist',
  templateUrl: './youtubeplayerlist.component.html',
  styleUrls: ['./youtubeplayerlist.component.css']
})

export class YoutubeplayerlistComponent implements OnInit {

  @Input() YouTubes: Observable<Youtube[]>;

  tempid: number;

  appYouTubes: any;
  constructor(public restapi: ConfigfakerestService,
    public router: Router) { }

  ngOnInit() {
    this.loadVideoPlayerlist();
  }
  loadVideoPlayerlist() {
    return this.restapi.getvideoplayerlist()
      .subscribe((data: any) => { this.YouTubes = data })
  }

  deletevideoplayer(id) {
    this.restapi.deletevideoplayer(id).subscribe(data => {
      this.loadVideoPlayerlist();
    },
      error => console.log(error));

  }

  approvevideoPlayer(id) {
    this.tempid = id;
    this.restapi.getvideoplayer(id).subscribe((data: any) => {
      this.appYouTubes = data
      this.appYouTubes.approved = 1;
      this.update_approvedVideoPlayer()
    });
  }

  update_approvedVideoPlayer() {
    this.restapi.editvideoplayer(this.tempid, this.appYouTubes).subscribe(data => {
      this.ngOnInit();
      this.router.navigate(['/addvideoplayer']);
    })
  }
}
