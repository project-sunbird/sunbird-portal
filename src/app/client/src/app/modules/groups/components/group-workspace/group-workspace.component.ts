import { Component, OnInit, OnDestroy } from '@angular/core';
import { ResourceService } from '@sunbird/shared';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash-es';
import { GroupsService } from '../../services';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-group-workspace',
  templateUrl: './group-workspace.component.html',
  styleUrls: ['./group-workspace.component.scss']
})
export class GroupWorkspaceComponent implements OnInit, OnDestroy {
  groupData;
  showModal = false;
  private groupId: string;
  public unsubscribe$ = new Subject<void>();
  showActivityList = false;
  HideAddActivity = true;
  showFilters = false;

  constructor(private activatedRoute: ActivatedRoute, private groupService: GroupsService,
    public resourceService: ResourceService) {
    this.groupService = groupService;
  }
  ngOnInit() {
    this.groupId = _.get(this.activatedRoute, 'snapshot.params.groupId');
    this.getGroupData();
  }
  getGroupData() {
    this.groupService.getGroupById(this.groupId).pipe(takeUntil(this.unsubscribe$)).subscribe(groupData => {
      this.groupData = groupData;
    }, err => { });
  }
  addActivity() {
    this.showModal = true;
  }
  closeModal() {
    this.showModal = false;
  }
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
  ActivitiesList() {
    this.showActivityList = true;
    this.closeModal();
    this.HideAddActivity = false;
  }
  filterList() {
    this.showFilters = true;
  }
}
