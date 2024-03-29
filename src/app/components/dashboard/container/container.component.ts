import { Component } from '@angular/core';
import { DataService } from '../../../shared/services/data.service';
import { CommonModule } from '@angular/common';
import { FilterPipe } from "../../../shared/pipes/filter.pipe";
import { WatchlistPipe } from "../../../shared/pipes/watchlist.pipe";

@Component({
    selector: 'app-container',
    standalone: true,
    templateUrl: './container.component.html',
    styleUrl: './container.component.scss',
    imports: [CommonModule, FilterPipe, WatchlistPipe]
})
export class ContainerComponent {

  constructor(public dataService: DataService) { }


  selectVideo(video: any) {
    this.dataService.setSelectedVideo(video);
  }
}
