import { Component, OnInit, ViewEncapsulation, OnDestroy, ViewContainerRef } from '@angular/core';
import { DataService } from "../common/data.service";
import { IPost, IComment, IPerson, ILike, ITag, ICamera, ILocation, CompositePost, Post, IScore, Score } from "../common/data.model";

import { Observable, Subscription } from 'rxjs';
import { FirebaseListObservable } from "angularfire2";

import * as _ from "lodash";
import { AuthService } from "../auth/auth.service";
import { MdDialogRef, MdDialog, MdDialogConfig } from "@angular/material";
import { PostComponent } from "../post/post.component";

import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Component({
  selector: 'leaderboard-root',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LeaderboardComponent implements OnInit, OnDestroy {

  // Realtime Database observables
  private userCommitsThisDay: FirebaseListObservable<IScore[]>;
  private userCommitsThisWeek: FirebaseListObservable<IScore[]>;
  private userCommitsThisMonth: FirebaseListObservable<IScore[]>;

  private repoCommitsThisDay: FirebaseListObservable<IScore[]>;
  private repoCommitsThisWeek: FirebaseListObservable<IScore[]>;
  private repoCommitsThisMonth: FirebaseListObservable<IScore[]>;

  private leaderboardWeekly$: FirebaseListObservable<any[]>;

  constructor(private dataService: DataService,
    private authService: AuthService,
    public dialog: MdDialog,
    public viewContainerRef: ViewContainerRef,
    private http: Http) {

    this.userCommitsThisDay = this.dataService.userCommitsThisDay;
    this.userCommitsThisWeek = this.dataService.userCommitsThisWeek;
    this.userCommitsThisMonth = this.dataService.userCommitsThisMonth;

    this.repoCommitsThisDay = this.dataService.repoCommitsThisDay;
    this.repoCommitsThisWeek = this.dataService.repoCommitsThisWeek;
    this.repoCommitsThisMonth = this.dataService.repoCommitsThisMonth;

    this.leaderboardWeekly$ = this.dataService.leaderboardWeekly;

  }

  ngOnInit() {
  }

  ngOnDestroy() { }

  togglePostLike(post: CompositePost, evt: Event) {
    post.liked = !post.liked;

    this.dataService.updatePostLikes(post.id, this.authService.id, post.liked);
  }

}
