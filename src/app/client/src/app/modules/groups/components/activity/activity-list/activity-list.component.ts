import { Component, Input } from '@angular/core';
import { ConfigService } from '../../../../shared/services/config/config.service';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ResourceService } from '../../../../shared/services/resource/resource.service';
import { ACTIVITY_DETAILS, MY_GROUPS } from '../../routerLinks';
import { Router } from '@angular/router';

export interface IActivity {
  name: string;
  identifier: string;
  appIcon: string;
  organisation: string[];
  subject: string;
}
@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.scss']
})
export class ActivityListComponent {
  @Input() groupId;
  @Input() currentMember;
  numberOfSections = new Array(this.configService.appConfig.SEARCH.PAGE_LIMIT);
  showLoader = false;
  activityList = [];
  showMenu = false;
  selectedActivity: IActivity;
  unsubscribe$ = new Subject<void>();

  constructor(
    private configService: ConfigService,
    public resourceService: ResourceService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.showLoader = true;
    this.getActivities();

    fromEvent(document, 'click')
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(item => {
        if (this.showMenu) {
          this.showMenu = false;
        }
      });
  }

  getActivities() {
    setTimeout(() => {
      this.showLoader = false;
      this.activityList = [
        {
          name: 'Class 5 English',
          identifier: 'do_123523212190',
          appIcon: 'https://ntpproductionall.blob.core.windows.net/ntp-content-production/content/do_3129265279296552961416/artifact/book_2_1491393340123.thumb_1577945304197.png',
          organisation: ['Pre-prod Custodian Organization'],
          subject: 'Social Science'
        }, {
          name: 'India & Contemporary World II',
          identifier: 'do_123523212112',
          appIcon: 'https://ntpproductionall.blob.core.windows.net/ntp-content-production/content/do_31291521464536268819635/artifact/jess1cc_1575435434756.thumb.jpg',
          organisation: ['Prod Custodian Organization'],
          subject: 'Social Science'
        }, {
          name: 'Footprints without Feet - English Supplementary Reader',
          identifier: 'do_1235232121343',
          appIcon: 'https://ntpproductionall.blob.core.windows.net/ntp-content-production/content/do_3130298331259453441627/artifact/jefp1cc.thumb.jpg',
          organisation: ['Prod Custodian Organization'],
          subject: 'Social Science'
        }, {
          name: 'Class 5 English',
          identifier: 'do_1235232121565',
          appIcon: 'https://ntpproductionall.blob.core.windows.net/ntp-content-production/content/do_3129265279296552961416/artifact/book_2_1491393340123.thumb_1577945304197.png',
          organisation: ['Pre-prod Custodian Organization'],
          subject: 'Social Science'
        }, {
          name: 'India & Contemporary World II',
          identifier: 'do_123523212145462',
          appIcon: 'https://ntpproductionall.blob.core.windows.net/ntp-content-production/content/do_31291521464536268819635/artifact/jess1cc_1575435434756.thumb.jpg',
          organisation: ['Prod Custodian Organization'],
          subject: 'Social Science'
        }, {
          name: 'Footprints without Feet - English Supplementary Reader',
          identifier: 'do_123523212121232',
          appIcon: 'https://ntpproductionall.blob.core.windows.net/ntp-content-production/content/do_3130298331259453441627/artifact/jefp1cc.thumb.jpg',
          organisation: ['Prod Custodian Organization'],
          subject: 'Social Science'
        }];
    }, 1000);
  }

  openActivity(event: any, activity: IActivity) {
    // TODO add telemetry here
    this.router.navigate([`${MY_GROUPS}/${ACTIVITY_DETAILS}`, activity.identifier]);
  }

  getMenuData(event, member) {
    this.showMenu = !this.showMenu;
    this.selectedActivity = member;
    event.event.stopImmediatePropagation();
  }

  performAction(action: string) {
    // TODO add telemetry here
    if (action === 'removeActivity') {
      this.activityList = this.activityList.filter(item => item.identifier !== this.selectedActivity.identifier);
    }
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
