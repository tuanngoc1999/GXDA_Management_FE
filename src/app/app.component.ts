import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'DA_Management_FE';
  mobileQuery: MediaQueryList;
  userName: string | null = null;

  profile = {
    daskboard: false,
    catechistManagement: false,
    classManagement: false,
    registationSectionMangement: false,
    classAssign: false,
    profile: false
  };

  // fillerNav = Array.from({length: 50}, (_, i) => `Nav Item ${i + 1}`);
  private _mobileQueryListener: () => void;

  constructor() {
    const changeDetectorRef = inject(ChangeDetectorRef);
    const media = inject(MediaMatcher);
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.userName = localStorage.getItem('userName');
    this.getProfile();

  }

  getProfile(): void {
    const storedProfile = localStorage.getItem('profile');
    if (storedProfile) {
      const jsonObject = JSON.parse(storedProfile);
      this.profile.daskboard = jsonObject?.p24;
      this.profile.catechistManagement = jsonObject?.p10 || jsonObject?.p11 || jsonObject?.p12 || jsonObject?.p13 || jsonObject?.p14 || jsonObject?.p15;
      this.profile.classManagement = jsonObject?.p18 || jsonObject?.p19 || jsonObject?.p20 || jsonObject?.p21;
      this.profile.registationSectionMangement = jsonObject?.p22 || jsonObject?.p23;
      this.profile.classAssign = jsonObject?.p9;
      this.profile.profile = jsonObject?.p16 || jsonObject?.p17;
    }
  }
}
