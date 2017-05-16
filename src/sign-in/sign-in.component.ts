import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { DataService } from "../common/data.service";
import { Observable } from 'rxjs';

// import * as firebase from 'firebase';

@Component({
  styleUrls: ['sign-in.component.scss'],
  templateUrl: 'sign-in.component.html'
})

export class SignInComponent {
  constructor(private auth: AuthService, private router: Router, private dataService: DataService, ) {

  }

  signInWithGithub(): void {
    this.auth.signInWithGithub()
      .then(() => this.postSignIn());
  }

  signInWithGoogle(): void {
    this.auth.signInWithGoogle()
      .then(() => this.postSignIn());
  }

  signInWithTwitter(): void {
    this.auth.signInWithTwitter()
      .then(() => this.postSignIn());
  }

  signInWithFacebook(): void {
    this.auth.signInWithFacebook()
      .then(() => this.postSignIn());
  }

  private postSignIn(): void {
    console.log('postSignIn()::Auth', this.auth.authState);
    this.updateCurrentUserProfile().subscribe((response) => {
      console.log(response);
      this.router.navigate(['/dashboard']);
    })
  }

  private updateCurrentUserProfile(): Observable<any> {
    const updates: any = {};
    updates.github_userid = this.auth.authState.github.uid;
    let person: any;
    return this.dataService.getPerson(this.auth.authState.uid)
      .take(1)
      .flatMap(personResponse => {
        console.log('getPerson', personResponse);
        person = personResponse;
        return this.dataService.getGitHubUser(updates.github_userid);
      })
      .flatMap(profile => {
        console.log('user profile', profile);
        updates.g_username = profile.login;
        updates.g_userid = this.auth.authState.github.uid;
        return this.dataService.updatePerson(person, updates);
      });
  }
}
