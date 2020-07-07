import { of, throwError } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule, ResourceService, RecaptchaService } from '@sunbird/shared';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { configureTestSuite } from '@sunbird/test-util';
import { AddMemberComponent } from './add-member.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { RecaptchaModule } from 'ng-recaptcha';
import { RecaptchaComponent } from 'ng-recaptcha';
import { TelemetryService } from '@sunbird/telemetry';
import { By } from '@angular/platform-browser';
import { addMemberTestData } from './add-member.component.spec.data';

describe('AddMemberComponent', () => {
  let component: AddMemberComponent;
  let fixture: ComponentFixture<AddMemberComponent>;
  configureTestSuite();
  const resourceBundle = {
    instance: 'DEV',
    messages: {
      emsg: {
        m007: 'Member is already existing',
        m006: 'Unable to add {name} to group',
      },
      smsg: {
        m004: '{memberName} added to group successfully'
      }
    }
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMemberComponent ],
      imports: [SharedModule.forRoot(), RouterTestingModule, HttpClientTestingModule, FormsModule, RecaptchaModule],
      providers: [{ provide: ResourceService, useValue: resourceBundle },
        {provide: APP_BASE_HREF, useValue: '/'}, TelemetryService, RecaptchaService,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    spyOn(component['groupsService'], 'addFieldsToMember');
    component.ngOnInit();
    expect(component.instance).toEqual('DEV');
    expect(component['groupsService'].addFieldsToMember).toHaveBeenCalled();
  });

  it ('should reset values', () => {
    component.reset();
    expect(component.showLoader).toBeFalsy();
    expect(component.isInvalidUser).toBeFalsy();
    expect(component.isVerifiedUser).toBeFalsy();
  });

  it ('should reset form values', () => {
    component.resetValue();
    expect(component.memberId).toEqual('');
    expect(component.showLoader).toBeFalsy();
    expect(component.isInvalidUser).toBeFalsy();
    expect(component.isVerifiedUser).toBeFalsy();
  });

  it ('should return is member is already present', () => {
    component.memberId = '2';
    component.membersList = [{userId: '1', name: 'user'}];
    spyOn(component, 'isExistingMember').and.returnValue(true);
    component.verifyMember();
    expect(component.isExistingMember).toHaveBeenCalled();
  });

  it ('should return is member is not already present', () => {
    component.groupData = {name: 'Test', members: [{userId: '1', role: 'admin', name: 'user'}], createdBy: '1'};
    component.memberId = '2';
    component.membersList = [{userId: '1', name: 'user'}];
    spyOn(component['userService'], 'getUserData').and.returnValue(of ({result: {response: {identifier: '2', name: 'user 2'}}}));
    spyOn(component, 'isExistingMember').and.returnValue(false);
    component.verifyMember();
    expect(component.isExistingMember).toHaveBeenCalled();
    expect(component['userService'].getUserData).toHaveBeenCalledWith('2');
  });

  it ('should throw error', () => {
    component.memberId = '1';
    component.membersList = [{userId: '1', name: 'user'}];
    spyOn(component['toasterService'], 'error');
    const value = component.isExistingMember();
    expect(component['toasterService'].error).toHaveBeenCalledWith(resourceBundle.messages.emsg.m007);
    expect(value).toBeTruthy();
  });

  it ('should not throw error', () => {
    component.memberId = '2';
    component.membersList = [{userId: '1', name: 'user'}];
    const value = component.isExistingMember();
    expect(value).toBeFalsy();
  });

  it ('should get getGroupById()', () => {
    component.memberId = '2';
    component.membersList = [{}];
    component.groupData = {id: '123'};
    const response = {id: '123', name: 'Test', members:
    [{userId: '2', role: 'member', name: 'user'}, {userId: '1', role: 'admin', name: 'user 2'}]};
    spyOn(component['groupsService'], 'addFieldsToMember').and.returnValue([response]);
    spyOn(component['groupsService'], 'getGroupById').and.returnValue(of (response));
    component.getUpdatedGroupData();
    component['groupsService'].getGroupById('123', true).subscribe(data => {
      expect(component['groupsService'].addFieldsToMember).toHaveBeenCalled();
    });
    });

  it ('should  add member to group', () => {
    component.memberId = '2';
    component.groupData = {id: '123'};
    component.membersList = [];
    component.verifiedMember = {title: 'user 2'};
    spyOn(component, 'isExistingMember').and.returnValue(false);
    spyOn(component['groupsService'], 'addMemberById').and.returnValue(of ({}));
    spyOn(component['toasterService'], 'success');
    component.addMemberToGroup();
    expect(component.isExistingMember).toHaveBeenCalled();
    component['groupsService'].addMemberById('123', [{userId: '2', role: 'member'}]).subscribe(data => {
    expect(component['toasterService'].success).toHaveBeenCalledWith('user 2 added to group successfully');
    });
  });

  it ('should throw error while adding member to group id there is error {}', () => {
    component.memberId = '2';
    component.verifiedMember = {title: 'user 2'};
    component.groupData = {id: '123'};
    component.membersList = [];
    spyOn(component['groupsService'], 'addMemberById').and.returnValue(of ({errors: ['2']}));
    spyOn(component, 'showErrorMsg');
    component.addMemberToGroup();
    component['groupsService'].addMemberById('123', [{userId: '2', role: 'member'}]).subscribe(data => {
      expect(data).toEqual({errors: ['2']});
      expect(component.showErrorMsg).toHaveBeenCalledWith(data);
    });
  });

  it ('should throw error while adding member to group', () => {
    component.memberId = '2';
    component.verifiedMember = {title: 'user 2'};
    component.groupData = {id: '123'};
    component.membersList = [];
    spyOn(component['groupsService'], 'addMemberById').and.returnValue(throwError ({}));
    spyOn(component, 'showErrorMsg');
    component.addMemberToGroup();
    component['groupsService'].addMemberById('123', [{userId: '2', role: 'member'}]).subscribe(data => {}, err => {
      expect(component.showErrorMsg).toHaveBeenCalled();
    });
  });

  it('should load re-captcha when googleCaptchaSiteKey is provided', () => {
    const recapta = fixture.debugElement.query(By.directive(RecaptchaComponent));
    expect(recapta).toBeTruthy();
  });

  it('should validate recaptcha and generate success telemetry and verify member', () => {
    const recaptchaService = TestBed.get(RecaptchaService);
    const telemetryService = TestBed.get(TelemetryService);
    spyOn(telemetryService, 'log');
    spyOn(recaptchaService, 'validateRecaptcha').and.returnValue(of(addMemberTestData.recaptchaResponse));
    spyOn(component, 'verifyMember').and.callThrough();
    spyOn(component, 'telemetryLogEvents').and.callThrough();
    component.onVarifyMember();
    component.resolved('captchaToken');
    expect(component.telemetryLogEvents).toHaveBeenCalled();
    expect(telemetryService.log).toHaveBeenCalledWith(addMemberTestData.telemetryLogSuccess);
    expect(component.verifyMember).toHaveBeenCalled();
  });

  it('should should log telemetry if validating captcha fail and reset captcha ', () => {
    const recaptchaService = TestBed.get(RecaptchaService);
    const telemetryService = TestBed.get(TelemetryService);
    spyOn(telemetryService, 'generateErrorEvent');
    spyOn(recaptchaService, 'validateRecaptcha').and.returnValue(throwError(addMemberTestData.recaptchaErrorResponse));
    spyOn(component, 'resetGoogleCaptcha').and.callThrough();
    component.onVarifyMember();
    component.resolved('captchaToken');
    expect(telemetryService.generateErrorEvent).toHaveBeenCalledWith(addMemberTestData.telemetryLogError);
    expect(component.resetGoogleCaptcha).toHaveBeenCalled();
  });

});
