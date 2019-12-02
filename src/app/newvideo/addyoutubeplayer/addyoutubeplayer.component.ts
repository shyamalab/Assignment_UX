import { Component, OnInit, Input } from '@angular/core';

import { Youtube } from '../../model/youtube';

import { ConfigfakerestService } from '../../Configfakerest.service';
import { Router, NavigationEnd } from '@angular/router';
import { Observable } from "rxjs";

@Component({
  selector: 'app-addyoutubeplayer',
  templateUrl: './addyoutubeplayer.component.html',
  styleUrls: ['./addyoutubeplayer.component.css']
})
export class AddyoutubeplayerComponent implements OnInit {

  @Input() youtubemodel = {
    id: '',
    title: '',
    url: '',
    status: 'added',
    approved: 0,
    likes: 0,
    unlike: 0,
    currentstatus: '',
    exitplayprogress: 0
  }

  YouTubes: Observable<Youtube[]>;
  titleerror: string;
  urlerror: string;
  constructor(
    public restapi: ConfigfakerestService,
    public router: Router
  ) { }

  ngOnInit() {
    this.loadVideoPlayerlist();
  }
  loadVideoPlayerlist() {
    return this.restapi.getvideoplayerlist()
      .subscribe((data: any) => { this.YouTubes = data })
  }

  addyoutubevideoplayer(datavideo) {
    if (this.youtubemodel.title.length == 0) {
      this.titleerror = "Title is mandatory";
      this.urlerror = "";
    } else if (!this.matchYoutubeUrl(this.youtubemodel.url)) {
      this.titleerror = "";
      this.urlerror = "Invalid Input URL";
    } else {
      this.titleerror = "";
      this.urlerror = "";
      this.restapi.addyoutubevideo(this.youtubemodel)
        .subscribe((data: {}) => {
          this.ngOnInit();
          this.router.navigate(['/addvideoplayer']);
        })
        this.youtubemodel.title ='';
        this.youtubemodel.url='';
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
