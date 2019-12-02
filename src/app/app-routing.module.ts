import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { YoutubeplayerlistComponent } from './newvideo/youtubeplayerlist/youtubeplayerlist.component';
import { AddyoutubeplayerComponent } from './newvideo/addyoutubeplayer/addyoutubeplayer.component';
import { EdityoutubeplayerComponent } from './newvideo/edityoutubeplayer/edityoutubeplayer.component';
import { VideoplayerComponent } from './playvideo/videoplayer/videoplayer.component';
import { PlayerComponent } from './playvideo/player/player.component';
import { ControlsComponent } from './playvideo/controls/controls.component';
import { PlaylistComponent } from './playvideo/playlist/playlist.component';

const routes: Routes = [
  {path:"videoplayerlist", component:YoutubeplayerlistComponent},
  {path:"addvideoplayer", component:AddyoutubeplayerComponent},
  {path:"editvideoplayer/:id", component:EdityoutubeplayerComponent},
  {path:"videoplayer", component:VideoplayerComponent,
  children: [
    {path: 'player', component: PlayerComponent}, 
    {path: 'controls', component: ControlsComponent}, 
    {path: 'playlist', component: PlaylistComponent}, 
  ]
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const RouteComponents =[YoutubeplayerlistComponent, AddyoutubeplayerComponent, EdityoutubeplayerComponent,
  VideoplayerComponent, PlayerComponent, ControlsComponent, PlaylistComponent
]
