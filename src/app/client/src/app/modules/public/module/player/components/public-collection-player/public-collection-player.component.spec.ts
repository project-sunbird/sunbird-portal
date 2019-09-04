
import {of as observableOf,  Observable, throwError as observableThrowError  } from 'rxjs';
import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CollectionHierarchyAPI, ContentService, CoreModule } from '@sunbird/core';
import { PublicCollectionPlayerComponent } from './public-collection-player.component';
import { PublicPlayerService } from './../../../../services';
import { ActivatedRoute, Router } from '@angular/router';
import { TelemetryModule } from '@sunbird/telemetry';
import { WindowScrollService, SharedModule, ResourceService } from '@sunbird/shared';
import { CollectionHierarchyGetMockResponse, collectionTree,
  download_success,
  download_list,
  download_error, } from './public-collection-player.component.spec.data';
import { DeviceDetectorService } from 'ngx-device-detector';

import { DownloadManagerService } from './../../../../../offline/services';
describe('PublicCollectionPlayerComponent', () => {
  let component: PublicCollectionPlayerComponent;
  let fixture: ComponentFixture<PublicCollectionPlayerComponent>;
  const collectionId = 'do_112270591840509952140';
  const contentId = 'domain_44689';
  const fakeActivatedRoute = {
    params: observableOf({ collectionId: collectionId }),
    // queryParams: Observable.of({ contentId: contentId }),
    'queryParams': observableOf({ language: ['en'] }, {dialCode: '61U24C'}),
    snapshot: {
      params: {
        collectionId: collectionId
      },
      data: {
        telemetry: {
          env: 'get', pageid: 'get', type: 'edit', subtype: 'paginate'
        }
      }
    }
  };
  class RouterStub {
    navigate = jasmine.createSpy('navigate');
  }
  const resourceBundle = {
    'messages': {
      'stmsg': {
        'm0118': 'No content to play'
      },
      'fmsg': {
        'm0090': 'Could not download. Try again later'
      }
    }
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PublicCollectionPlayerComponent],
      imports: [CoreModule, HttpClientTestingModule, RouterTestingModule,
      TelemetryModule.forRoot(), SharedModule.forRoot()],
      providers: [ContentService, PublicPlayerService, ResourceService,
        DownloadManagerService,
        { provide: Router, useClass: RouterStub },
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
        { provide: ResourceService, useValue: resourceBundle }],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicCollectionPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    const windowScrollService = TestBed.get(WindowScrollService);
    spyOn(windowScrollService, 'smoothScroll');
    expect(component).toBeTruthy();
    expect(component.showPlayer).toBeFalsy();
    expect(component.loader).toBeTruthy();
    expect(component.loaderMessage).toEqual({
      headerMessage: 'Please wait...',
      loaderMessage: 'Fetching content details!'
    });
  });
  it('should get content based on route/query params', () => {
    const playerService = TestBed.get(PublicPlayerService);
    const windowScrollService = TestBed.get(WindowScrollService);
    spyOn(windowScrollService, 'smoothScroll');
    spyOn(playerService, 'getCollectionHierarchy').and.returnValue(observableOf(CollectionHierarchyGetMockResponse));
    component.ngOnInit();
    expect(component.collectionTreeNodes).toEqual({ data: CollectionHierarchyGetMockResponse.result.content });
    expect(component.loader).toBeFalsy();
  });
  it('should call setInteractEventData method', () => {
    const windowScrollService = TestBed.get(WindowScrollService);
    spyOn(windowScrollService, 'smoothScroll');
    const edata = {
      id: '',
      type: '',
      pageid: ''
    };
    component.closeCollectionPlayerInteractEdata = edata;
    component.telemetryInteractObject = {
      id: '',
      type: '',
      ver: ''
    };
    expect(component.closeCollectionPlayerInteractEdata).toBeDefined();
  });
  it('should call closeContentPlayer method', fakeAsync(() => {
    const windowScrollService = TestBed.get(WindowScrollService);
    spyOn(windowScrollService, 'smoothScroll');
    const router = TestBed.get(Router);
    const route = TestBed.get(ActivatedRoute);
    const navigation = {
      queryParams: {
        dialCode: '61U24C'
      },
      relativeTo: route
    };
    component.queryParams = { dialCode: '61U24C'};
    component.closeContentPlayer();
    tick(200);
    expect(component.showPlayer).toBeFalsy();
    expect(router.navigate).toHaveBeenCalledWith([], navigation);
  }));
  it('should call playContent method', () => {
    const windowScrollService = TestBed.get(WindowScrollService);
    spyOn(windowScrollService, 'smoothScroll');
    const content = {
      id: 'do_112474267785674752118',
      title: 'Test'
    };
    component.playContent(content);
    expect(component.showPlayer).toBeTruthy();
    expect(component.contentTitle).toEqual(content.title);
  });
  it('should call onPlayContent method', () => {
    const windowScrollService = TestBed.get(WindowScrollService);
    spyOn(windowScrollService, 'smoothScroll');
    const content = { id: 'do_112474267785674752118', title: 'Test' };
    component.collectionTreeNodes = collectionTree;
    const playContentDetails = {
      model : {
        mimeType : 'text/x-url',
        channel: '505c7c48ac6dc1edc9b08f21db5a571d'
      }
    };
    spyOn(component, 'OnPlayContent').and.callThrough();
    spyOn(component, 'playContent').and.callThrough();
    component.queryParams = {};
    component.OnPlayContent(content, true);
    expect(component.OnPlayContent).toHaveBeenCalledWith(content, true);
    expect(component.playContent).toHaveBeenCalledWith(content);
  });
  it('download content', () => {
    const downloadManagerService = TestBed.get(DownloadManagerService);
     const mockData = download_success;
     const mockObservableData = observableOf(mockData);
     spyOn(downloadManagerService, 'startDownload').and.returnValue(mockObservableData);
     component.collectionTreeNodes = collectionTree;
     expect(component.collectionTreeNodes.downloadStatus).toBeFalsy();
     component.downloadContent(component.collectionTreeNodes.children[0].children[0]);
     expect(component.collectionTreeNodes.children[0].children[0].downloadStatus).toEqual('DOWNLOADING');
     expect(component.collectionTreeNodes.downloadStatus).toBeFalsy();
     expect(downloadManagerService.startDownload).toHaveBeenCalled();
   });

   it('Test Download content ', () => {
     const downloadManagerService = TestBed.get(DownloadManagerService);
     const resourceService = TestBed.get(ResourceService);
     resourceService.messages = resourceBundle.messages;
     spyOn(downloadManagerService, 'startDownload').and.returnValue(observableThrowError(download_error));
     component.collectionTreeNodes = collectionTree;
     expect(component.collectionTreeNodes.downloadStatus).toBeFalsy();
     component.downloadContent(component.collectionTreeNodes.children[0].children[0]);
     expect(component.collectionTreeNodes.children[0].children[0].downloadStatus).toEqual('FAILED');
     expect(downloadManagerService.startDownload).toHaveBeenCalled();
     expect(resourceService.messages.fmsg.m0090).toEqual('Could not download. Try again later');
   });

   it('Test DownloadStatus is updating or not ', () => {
     spyOn(component, 'updateDownloadStatus');
     component.updateContent(download_list);
     expect(component.updateDownloadStatus).toHaveBeenCalled();
     });

   it('Test event emit', () => {
     const downloadManagerService = TestBed.get(DownloadManagerService);
     spyOn(downloadManagerService, 'startDownload').and.returnValue(observableThrowError(download_error));
     component.updateDownloadStatus(download_list, CollectionHierarchyGetMockResponse.result.content);
     expect(CollectionHierarchyGetMockResponse.result.content['downloadStatus']).
     toBe('FAILED');
   });

});
