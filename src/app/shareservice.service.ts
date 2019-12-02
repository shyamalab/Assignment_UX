import { Injectable } from '@angular/core';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ConfigfakerestService } from './Configfakerest.service';
import { Youtube } from './model/youtube';


@Injectable({
  providedIn: 'root'
})
export class ShareserviceService {

  video_you :string;
  youtube : Youtube;

  youtubeprogess : Youtube;

  constructor(public restapi : ConfigfakerestService) { }

 // id : string;

 likesvideoPlayer(id,like){
  this.restapi.getvideoplayer(id).subscribe((data : any)=>
  { 
    this.youtube = data
    this.youtube.likes = like;
    this.update_approvedVideoPlayer(id);
  });
}

unlikesvideoPlayer(id,unlike){
  this.restapi.getvideoplayer(id).subscribe((data : any)=>
  { 
    this.youtube = data
    this.youtube.unlike = unlike;
    this.update_approvedVideoPlayer(id);
  });
}

  ProgressvideoPlayer(id,progress){
    this.restapi.getvideoplayer(id).subscribe((data : any)=>
    { 
      this.youtubeprogess = data
      this.youtubeprogess.exitplayprogress = progress;
      this.update_progressVideoPlayer(id);
    });
  }

  StatusvideoPlayer1(id,status,prog){
    this.restapi.getvideoplayer(id).subscribe((data : any)=>
    { 
      this.youtube = data
      this.youtube.currentStatus = status;
      this.youtube.exitplayprogress = Math.round(prog);
      this.update_approvedVideoPlayer(id);
    });
  }

  StatusvideoPlayer(id,status){
    this.restapi.getvideoplayer(id).subscribe((data : any)=>
    { 
      this.youtube = data
      this.youtube.currentStatus = status;
      this.update_approvedVideoPlayer(id);
    });
  }

  update_progressVideoPlayer(id){

    this.restapi.editvideoplayer(id, this.youtubeprogess).subscribe(data => {  
        })        
    } 

  update_approvedVideoPlayer(id){

    this.restapi.editvideoplayer(id, this.youtube).subscribe(data => {  
        })        
    } 
}
