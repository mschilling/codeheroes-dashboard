import {TestBed, async} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {} from 'jasmine';
import {APP_BASE_HREF} from '@angular/common'

import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {MaterialModule} from '@angular/material';
import 'hammerjs';
import {FlexLayoutModule} from "@angular/flex-layout";
import {MomentModule} from 'angular2-moment';

import {AuthModule} from '../auth/auth.module';
import {FirebaseModule} from '../firebase/firebase.module';
import {LandingModule} from '../landing/landing.module';
import {SignInModule} from '../sign-in/sign-in.module';

import {AppHeaderComponent} from '../app-header/app-header.component';
import {FeedModule} from "../feed/feed.module";
import {WordCloudModule} from "../word-cloud/word-cloud.module";
import {MapModule} from "../map/map.module";
import {PersonModule} from "../person/person.module";
import {PostComponent} from "../post/post.component";
import {DashboardModule} from "../dashboard/dashboard.module";

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        AppHeaderComponent,
        PostComponent
      ],
      imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        BrowserAnimationsModule,
        RouterModule.forRoot([], {useHash: false}),
        MaterialModule,
        FlexLayoutModule,
        MomentModule,

        AuthModule,
        FirebaseModule,

        LandingModule,
        SignInModule,
        FeedModule,
        PersonModule,
        WordCloudModule,
        MapModule,
        DashboardModule,
      ],
      providers: [{provide: APP_BASE_HREF, useValue : '/' }],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  // it(`should have as title 'app works!'`, async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.debugElement.componentInstance;
  //   expect(app.title).toEqual('app works!');
  // }));
  //
  // it('should render title in a h1 tag', async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('h1').textContent).toContain('app works!');
  // }));
});
