
import { Component, OnInit, ViewEncapsulation, OnDestroy, ViewContainerRef } from '@angular/core';
import { DataService } from "../common/data.service";
// import { IPost, IComment, IPerson, ILike, ITag, ICamera, ILocation, CompositePost, Post, IScore, Score } from "../common/data.model";

import { Observable, Subscription } from 'rxjs';
import { FirebaseListObservable } from "angularfire2";

// import * as _ from "lodash";
import { AuthService } from "../auth/auth.service";
// import { MdDialogRef, MdDialog, MdDialogConfig } from "@angular/material";

import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Component({
  selector: 'tv-root',
  templateUrl: './tv.component.html',
  styleUrls: ['./tv.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TvComponent implements OnInit, OnDestroy {

  private items$: FirebaseListObservable<any[]>;

  constructor(
    private dataService: DataService,
    private authService: AuthService
    // public viewContainerRef: ViewContainerRef,
    ) {
    this.items$ = this.dataService.userCommitsThisWeek;

  }

  ngOnInit() { }

  ngOnDestroy() { }

}
