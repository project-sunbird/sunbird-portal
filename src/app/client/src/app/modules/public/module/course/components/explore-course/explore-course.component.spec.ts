import { ExploreCourseComponent } from './explore-course.component';
import {throwError as observableThrowError, of as observableOf,  Observable } from 'rxjs';
import { Ng2IzitoastService } from 'ng2-izitoast';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule, ResourceService, ConfigService, IAction } from '@sunbird/shared';
import { CoreModule, LearnerService, CoursesService, SearchService, OrgDetailsService} from '@sunbird/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Response } from './explore-course.component.spec.data';
import { TelemetryModule } from '@sunbird/telemetry';
import { PublicPlayerService } from './../../../../services';
describe('ExploreCourseComponent', () => {
  let component: ExploreCourseComponent;
  let fixture: ComponentFixture<ExploreCourseComponent>;
  const resourceBundle = {
    'messages': {
      'stmsg': {
        'm0007': 'Search for something else',
        'm0006': 'No result'
      },
      'fmsg': {
        'm0077': 'Fetching search result failed',
        'm0051': 'Fetching other courses failed, please try again later...'
      }
    }
  };
  const mockQueryParma = {
    'query': 'hello'
  };
  class RouterStub {
    navigate = jasmine.createSpy('navigate');
  }
  const fakeActivatedRoute = {
    'params': observableOf({ pageNumber: '3' }),
    'queryParams': observableOf({
      sortType: 'desc', sort_by: 'lastUpdatedOn',
      key: 'hello'
    }),
    snapshot: {
      params: {
        slug: 'ap'
      },
      data: {
        telemetry: {
          env: 'get', pageid: 'get', type: 'edit', subtype: 'paginate'
        }
      }
    }
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, SharedModule.forRoot(), CoreModule.forRoot(), TelemetryModule.forRoot()],
      declarations: [ExploreCourseComponent],
      providers: [ConfigService, SearchService, LearnerService, OrgDetailsService,
        { provide: ResourceService, useValue: resourceBundle },
        { provide: Router, useClass: RouterStub },
        { provide: ActivatedRoute, useValue: fakeActivatedRoute }, PublicPlayerService],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(ExploreCourseComponent);
    component = fixture.componentInstance;
  });
  it('should subscribe to searchService', () => {
    component.slug = '123456567';
    component.queryParams = mockQueryParma;
    component.exploreRoutingUrl = 'explore';
    const searchService = TestBed.get(SearchService);
    const orgManagementService = TestBed.get(OrgDetailsService);
    component.dataDrivenFilter = {};
    spyOn(searchService, 'courseSearch').and.callFake(() => observableOf(Response.successData));
    component.searchList = Response.successData.result.course;
    component.populateCourseSearch();
    expect(component.queryParams.sortType).toString();
    expect(component.showLoader).toBeFalsy();
    expect(component.searchList).toBeDefined();
    expect(component.totalCount).toBeDefined();
  });

  it('should throw error when searchService api throw error ', () => {
    component.slug = '123456567';
    const searchService = TestBed.get(SearchService);
    const orgManagementService = TestBed.get(OrgDetailsService);
    component.dataDrivenFilter = {};
    spyOn(searchService, 'courseSearch').and.callFake(() => observableThrowError({}));
    component.queryParams = mockQueryParma;
    component.populateCourseSearch();
    expect(component.showLoader).toBeFalsy();
    expect(component.noResult).toBeTruthy();
  });
  fit('when count is 0 should show no result found', () => {
    component.slug = '123456567';
    const searchService = TestBed.get(SearchService);
    const orgManagementService = TestBed.get(OrgDetailsService);
    component.dataDrivenFilter = {};
    spyOn(searchService, 'courseSearch').and.callFake(() => observableOf(Response.noResult));
    component.populateCourseSearch();
    expect(component.showLoader).toBeFalsy();
  });
  it('should call processFilterData method', () => {
    const obj = {
      'gradeLevel': [
        {
          'name': 'grade 7',
          'count': 8
        },
        {
          'name': 'class 2',
          'count': 85
        }
      ],
      'subject': [
        {
          'name': 'chemistry',
          'count': 2
        },
        {
          'name': 'marathi',
          'count': 9
        }
      ],
      'medium': [
        {
          'name': 'nepali',
          'count': 1
        },
        {
          'name': 'odia',
          'count': 12
        }
      ],
      'board': [
        {
          'name': 'state (uttar pradesh)',
          'count': 7
        },
        {
          'name': 'state (tamil nadu)',
          'count': 5
        }
      ]
    };
  });
  it('should call compareObjects method', () => {
    const objA = {
      board: ['gradeLevel']
    };
    const objB = {
      board: ['gradeLevel']
    };
    component.compareObjects(objA, objB);
    expect(component.facets).toEqual(undefined);
  });
  it('should call navigateToPage method', () => {
    const router = TestBed.get(Router);
    const page = 3;
    component.pager = {
      currentPage: 3,
      endIndex: 19,
      endPage: 5,
      pageSize: 20,
      pages: [1, 2, 3, 4],
      startIndex: 0,
      startPage: 1,
      totalItems: 45,
      totalPages: 66
    };
    component.exploreRoutingUrl = 'explore';
    component.queryParams = { key: 'abc' };
    component.navigateToPage(page);
    expect(component.pageNumber).toEqual(page);
    expect(router.navigate).toHaveBeenCalledWith(['explore', 3], { queryParams: component.queryParams });
  });
  it('should call getChannelId method', () => {
    const orgService = TestBed.get(OrgDetailsService);
    spyOn(orgService, 'getOrgDetails').and.callFake(() => observableOf(Response.orgDetailsSuccessData));
    component.getChannelId();
    expect(component.hashTagId).toEqual(Response.orgDetailsSuccessData.hashTagId);
  });
  it('should call getChannelId method and return error', () => {
    const router = TestBed.get(Router);
    const orgService = TestBed.get(OrgDetailsService);
    const response = {};
    spyOn(orgService, 'getOrgDetails').and.callFake(() => observableThrowError(response));
    spyOn(component, 'getChannelId').and.callThrough();
    component.getChannelId();
    expect(router.navigate).toHaveBeenCalledWith(['']);
  });

  it('should call inview method', () => {
    component.telemetryImpression = {
      context: {
        env: 'public'
      },
      edata: {
        type: '',
        pageid: '',
        uri: '',
        subtype: 'pageexit'
      }
    };
    const event = Response.inviewData;
    component.inview(event);
    expect(component.telemetryImpression.edata.subtype).toEqual('pageexit');
  });
  it('should unsubscribe from all observable subscriptions', () => {
    spyOn(component.unsubscribe$, 'complete');
    component.ngOnDestroy();
    expect(component.unsubscribe$.complete).toHaveBeenCalled();
  });
  it('should call getFilters with data', () => {
    const searchService = TestBed.get(SearchService);
    const filters = Response.filters;
    const requestParams = Response.requestParam2;
    component.dataDrivenFilter = {};
    component.hashTagId =   '0123166367624478721';
    spyOn(component, 'populateCourseSearch').and.callThrough();
    spyOn(searchService, 'courseSearch').and.callThrough();
    component.ngOnInit();
    expect(component.populateCourseSearch).toHaveBeenCalled();
  });
  it('should call getFilters with no data', () => {
    const searchService = TestBed.get(SearchService);
    const filters = [];
    const requestParams = Response.requestParam3;
    component.dataDrivenFilter = {};
    component.hashTagId =   '0123166367624478721';
    spyOn(component, 'populateCourseSearch').and.callThrough();
    spyOn(searchService, 'courseSearch').and.callThrough();
    component.ngOnInit();
  });
});

