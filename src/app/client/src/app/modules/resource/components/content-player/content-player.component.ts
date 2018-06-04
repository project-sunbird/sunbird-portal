import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ContentService, UserService, PlayerService, CopyContentService, PermissionService, BreadcrumbsService } from '@sunbird/core';
import * as _ from 'lodash';
import { PopupEditorComponent, NoteCardComponent, INoteData } from '@sunbird/notes';
import {
  ConfigService, IUserData, ResourceService, ToasterService,
  WindowScrollService, NavigationHelperService, PlayerConfig, ContentData, ContentUtilsServiceService, ITelemetryShare
} from '@sunbird/shared';

/**
 *Component to play content
 */
@Component({
  selector: 'app-content-player',
  templateUrl: './content-player.component.html',
  styleUrls: ['./content-player.component.css']
})
export class ContentPlayerComponent implements OnInit {
  sharelinkModal: boolean;
  /**
   * contains link that can be shared
   */
  shareLink: string;
  /**
   * content id
   */
  contentId: string;

  contentStatus: string;
  /**
   * contains player configuration
   */
  playerConfig: PlayerConfig;
  /**
   * Flag to show player
   */
  showPlayer = false;
  /**
   * Flag to show error
   */
  showError = false;
  /**
   * contain error message
   */
  errorMessage: string;
  /**
   * contain contentData
   */
  contentData: ContentData;
  /**
	 * telemetryShareData
	*/
  telemetryShareData: Array<ITelemetryShare>;
  /**
   * to show loader while copying content
   */
  showCopyLoader = false;
  /**
   * To show/hide the note popup editor
   */
  showNoteEditor = false;
  /**
   * This variable holds the details of the note created
   */
  createNoteData: INoteData;
  closeUrl: any;
  constructor(public activatedRoute: ActivatedRoute, public navigationHelperService: NavigationHelperService,
    public userService: UserService, public resourceService: ResourceService, public router: Router,
    public toasterService: ToasterService, public windowScrollService: WindowScrollService, public playerService: PlayerService,
    public copyContentService: CopyContentService, public permissionService: PermissionService,
    public contentUtilsServiceService: ContentUtilsServiceService, public breadcrumbsService: BreadcrumbsService) {
  }
  /**
   *
   * @memberof ContentPlayerComponent
   */
  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.contentId = params.contentId;
      this.contentStatus = params.contentStatus;
      this.userService.userData$.subscribe(
        (user: IUserData) => {
          if (user && !user.err) {
            this.getContent();
          }
        });
    });
  }
  /**
   * used to fetch content details and player config. On success launches player.
   */
  getContent() {
    const option: any = {};
    if (this.contentStatus && this.contentStatus === 'Unlisted') {
      option.params = {mode: 'edit'};
    }
    this.playerService.getContent(this.contentId, option).subscribe(
      (response) => {
        if (response.result.content.status === 'Live' || response.result.content.status === 'Unlisted') {
          const contentDetails = {
            contentId: this.contentId,
            contentData: response.result.content
          };

          this.playerConfig = this.playerService.getConfig(contentDetails);
          this.contentData = response.result.content;
          this.showPlayer = true;
          this.windowScrollService.smoothScroll('content-player');
          this.breadcrumbsService.setBreadcrumbs([{ label: this.contentData.name, url: '' }]);
        } else {
          this.toasterService.warning(this.resourceService.messages.imsg.m0027);
          this.close();
        }
      },
      (err) => {
        this.showError = true;
        this.errorMessage = this.resourceService.messages.stmsg.m0009;
      });
  }
  /**
   * retry launching player with same content details
   * @memberof ContentPlayerComponent
   */
  tryAgain() {
    this.showError = false;
    this.getContent();
  }
  /**
   * closes conent player and revert to previous url
   * @memberof ContentPlayerComponent
   */
  close() {
    this.navigationHelperService.navigateToResource();
  }

  /**
   * This method calls the copy API service
   * @param {contentData} ContentData Content data which will be copied
   */
  copyContent(contentData: ContentData) {
    this.showCopyLoader = true;
    this.copyContentService.copyContent(contentData).subscribe(
      (response) => {
        this.toasterService.success(this.resourceService.messages.smsg.m0042);
        this.showCopyLoader = false;
      },
      (err) => {
        this.showCopyLoader = false;
        this.toasterService.error(this.resourceService.messages.emsg.m0008);
      });
  }
  createEventEmitter(data) {
    this.createNoteData = data;
  }
  onShareLink() {
    this.shareLink = this.contentUtilsServiceService.getPublicShareUrl(this.contentId, this.contentData.mimeType);
     this.setTelemetryShareData(this.contentData);
  }
    setTelemetryShareData(param) {
    this.telemetryShareData = [{
      id: param.identifier,
      type: 'published course',
      ver: param.pkgVersion ? param.pkgVersion : 1,
      params: [
        {id: param.identifier}
      ]
    }];
  }
}
