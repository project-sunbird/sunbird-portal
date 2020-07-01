import { ResourceService } from '@sunbird/shared';
import { Component, OnInit, Output, EventEmitter, Input, ElementRef } from '@angular/core';

@Component({
  selector: 'app-ftu-popup',
  templateUrl: './ftu-popup.component.html',
  styleUrls: ['./ftu-popup.component.scss']
})
export class FtuPopupComponent implements OnInit {
  @Input() showWelcomePopup;
  @Input() showMemberPopup;
  @Output() close = new EventEmitter();
  slideConfig1 = {
    'slidesToShow': 1,
    'slidesToScroll': 1,
    'infinite': false,
    'rtl': false,
    'dots': true
  };

  constructor(public resourceService: ResourceService, private elementRef: ElementRef) { }

  ngOnInit() {}

  closeModal(modalName) {
    this.showWelcomePopup = false;
    this.close.emit();
  }

  closeMemberPopup(modalName) {
    this.showMemberPopup = false;
    this.close.emit();
  }

}
