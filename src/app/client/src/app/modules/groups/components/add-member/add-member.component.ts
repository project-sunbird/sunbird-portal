import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.scss']
})
export class AddMemberComponent {

  public  membersList = [
    {identifier: '1', initial: 'A', title: 'Abc', isAdmin: false,  isMenu: false, indexOfMember: 1}
  ];
  config={size:'small', isBold:true, isSelectable:false, view:"horizontal"}
}

