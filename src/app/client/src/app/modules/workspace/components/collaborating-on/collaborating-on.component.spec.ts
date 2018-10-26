import {throwError as observableThrowError, of as observableOf,  Observable } from 'rxjs';
import { CollaboratingOnComponent } from './collaborating-on.component';
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Ng2IziToastModule } from 'ng2-izitoast';
import { SharedModule, PaginationService, ToasterService, ResourceService, ConfigService , DateFilterXtimeAgoPipe} from '@sunbird/shared';
import { SearchService, ContentService } from '@sunbird/core';
import { WorkSpaceService } from '../../services';
import { UserService, LearnerService, CoursesService, PermissionService } from '@sunbird/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { Response } from './collaborating.component.spec.data';
import { SuiModalService, TemplateModalConfig, ModalTemplate } from 'ng2-semantic-ui';
import { OrderModule } from 'ngx-order-pipe';
describe('CollaboratingOnComponent', () => {
  let component: CollaboratingOnComponent;
  let fixture: ComponentFixture<CollaboratingOnComponent>;
  const resourceBundle = {
    'messages': {
      'fmsg': {
        'm0084': 'Fetching collaborating content failed, please try again later...'
      },
      'stmsg': {
        'm0124': 'We are fetching collaborating content...',
        'm0123': 'You are not yet collaborating on any creation yet'
      },
      'smsg': {
        'm0006': 'Content deleted successfully...'
      }
    }
  };
  class RouterStub {
    navigate = jasmine.createSpy('navigate');
  }
  const fakeActivatedRoute = {
    'params': observableOf({ pageNumber: '1' }),
    'queryParams': observableOf({ subject: ['english', 'odia'] }),
    snapshot: {
      params: [
        {
          pageNumber: '1',
        }
      ],
      data: {
        telemetry: {
          env: 'workspace', pageid: 'workspace-content-collaborating-on', type: 'list',
          object: { type: 'workspace', ver: '1.0' }
        }
      }
    }
  };
  const bothParams = { 'params': { 'pageNumber': '1' }, 'queryParams': { 'sort_by': 'Updated On' } };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CollaboratingOnComponent],
      imports: [HttpClientTestingModule, Ng2IziToastModule, OrderModule, SharedModule.forRoot()],
      providers: [PaginationService, WorkSpaceService, UserService,
        SearchService, ContentService, LearnerService, CoursesService,
        PermissionService, ResourceService, ToasterService,
        { provide: ResourceService, useValue: resourceBundle },
        { provide: Router, useClass: RouterStub },
        { provide: ActivatedRoute, useValue: fakeActivatedRoute }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollaboratingOnComponent);
    component = fixture.componentInstance;
  });
  it('should call search api and returns result count more than 1', inject([SearchService], (searchService) => {
    spyOn(searchService, 'compositeSearch').and.callFake(() => observableOf(Response.searchSuccessWithCountTwo));
    component.fecthAllContent(9, 1, bothParams);
    fixture.detectChanges();
    expect(component.collaboratingContent).toBeDefined();
    expect(component.showLoader).toBeFalsy();
    expect(component.noResult).toBeFalsy();
    expect(component.collaboratingContent.length).toBeGreaterThan(1);
  }));

  it('should throw error', inject([SearchService], (searchService) => {
    const toasterService = TestBed.get(ToasterService);
    spyOn(searchService, 'compositeSearch').and.callFake(() => observableThrowError({}));
    spyOn(toasterService, 'error').and.callThrough();
    fixture.detectChanges();
    component.fecthAllContent(9, 1, bothParams);
    expect(component.collaboratingContent.length).toBeLessThanOrEqual(0);
    expect(component.collaboratingContent.length).toEqual(0);
    expect(component.showLoader).toBeFalsy();
    expect(component.noResult).toBeFalsy();
    expect(component.showError).toBeTruthy();
    expect(toasterService.error).toHaveBeenCalledWith(resourceBundle.messages.fmsg.m0084);
  }));
  it('should show no results for result count 0', inject([SearchService], (searchService) => {
    spyOn(searchService, 'compositeSearch').and.callFake(() => observableOf(Response.searchSuccessWithCountZero));
    component.fecthAllContent(9, 1, bothParams);
    fixture.detectChanges();
    expect(component.collaboratingContent).toBeDefined();
    expect(component.showLoader).toBeFalsy();
    expect(component.noResult).toBeTruthy();
    expect(component.showError).toBeFalsy();
    expect(component.noResultMessage.messageText).toBe(resourceBundle.messages.stmsg.m0123);
  }));

  it('should call fetchall content method and change the route  ', inject([ConfigService, Router],
    (configService, route) => {
      component.queryParams = { subject: ['english'] };
      const queryParams = { subject: [] };
      spyOn(component, 'fecthAllContent').and.callThrough();
      component.fecthAllContent(9, 1, bothParams);
      fixture.detectChanges();
      expect(component.fecthAllContent).toHaveBeenCalledWith(9, 1, bothParams);
      expect(component.sort).toEqual({lastUpdatedOn: 'desc'});
    }));
  it('should call setpage method and page number should be default, i,e 1', inject([ConfigService, Router],
    (configService, route) => {
      component.pager = Response.pager;
      component.pager.totalPages = 0;
      component.navigateToPage(3);
      fixture.detectChanges();
      expect(component.pageNumber).toEqual(1);
    }));
  it('should call setpage method and set proper page number', inject([ConfigService, Router],
    (configService, route) => {
      component.pager = Response.pager;
      component.pager.totalPages = 8;
      component.navigateToPage(1);
      const sortByOption = 'Created On';
      component.queryParams = { subject: ['english'] };
      fixture.detectChanges();
      expect(route.navigate).toHaveBeenCalledWith(['workspace/content/collaborating-on', 1], { queryParams: undefined });
    }));
  it('should call inview method for visits data', () => {
    spyOn(component, 'inview').and.callThrough();
    component.telemetryImpression = {
      context: { env: 'workspace', cdata: [] },
      edata: {
        pageid: 'workspace-content-collaborating-on',
        type: 'view', uri: '/workspace/content/collaborating-on'
      }
    };
    component.inview(Response.event);
    expect(component.inview).toHaveBeenCalled();
    expect(component.inviewLogs).toBeDefined();
  });
  it('should open  editor on edit icon click when status is not processing  ', inject([WorkSpaceService, Router],
    (workSpaceService, route, http) => {
      spyOn(component, 'contentClick').and.callThrough();
      component.contentClick(Response.searchSuccessWithCountTwo.result.content[1]);
      expect(route.navigate).toHaveBeenCalledWith(['/workspace/content/edit/collection',
        'do_2124341006465925121871', 'TextBook', 'collaborating-on', 'NCF']);
      fixture.detectChanges();
  }));
  it('should set lastUpdated Date by calling the filter', inject([SearchService], (searchService) => {
    spyOn(searchService , 'compositeSearch').and.callFake(() => observableOf(Response.searchSuccessWithCountTwo));
    fixture.detectChanges();
    component.fecthAllContent(9, 1, bothParams);
    const  fromnow = new DateFilterXtimeAgoPipe();
    expect(fromnow.transform(Response.searchSuccessWithCountTwo.result.content[0].lastSubmittedOn, null)).toEqual('6 months ago');
  }));
});
