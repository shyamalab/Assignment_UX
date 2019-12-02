import { Component, OnInit } from '@angular/core';

import { ConfigfakerestService } from '../../Configfakerest.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edityoutubeplayer',
  templateUrl: './edityoutubeplayer.component.html',
  styleUrls: ['./edityoutubeplayer.component.css']
})
export class EdityoutubeplayerComponent implements OnInit {

  YouTubes: any;
  urlerror: string;
  id = this.actRoute.snapshot.params['id'];

  constructor(
    public restapi: ConfigfakerestService,
    public actRoute: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit() {
    this.restapi.getvideoplayer(this.id).subscribe((data: any) => {
      this.YouTubes = data
      this.YouTubes.status = 'edited';
      this.YouTubes.approved = 0;
    })
  }

  updateVideoPlayer() {
    if (!this.matchYoutubeUrl(this.YouTubes.url)) {
      this.urlerror = "Invalid Input URL";
      this.router.navigate(['/editvideoplayer/'.concat(this.id)]);
    } else {
      this.urlerror = "";
      this.restapi.editvideoplayer(this.id, this.YouTubes).subscribe(data => {
        this.router.navigate(['/addvideoplayer']);

      })

    }
  }
  matchYoutubeUrl(url) {
    let p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    let matches = url.match(p);
    if (matches) {
      return true;
    }
    return false;
  }

}
