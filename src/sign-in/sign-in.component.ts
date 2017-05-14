import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../auth/auth.service';
import {DataService} from "../common/data.service";
import {Observable} from 'rxjs';

// import * as firebase from 'firebase';

@Component({
    styleUrls: ['sign-in.component.scss'],
    templateUrl: 'sign-in.component.html'
})

export class SignInComponent {
    constructor(private auth: AuthService, private router: Router, private dataService: DataService,) {

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
      // console.log('Auth', this.auth.authState);
      this.updateCurrentUserProfile().subscribe( () => {
        this.router.navigate(['/dashboard']);
      })
    }

    private updateCurrentUserProfile(): Observable<any> {
      return this.dataService.getPerson(this.auth.authState.uid)
          .flatMap(person => {
              const updates = {
                github_userid: this.auth.authState.github.uid
              }
              return this.dataService.updatePerson(person, updates);
          });
    }
}
