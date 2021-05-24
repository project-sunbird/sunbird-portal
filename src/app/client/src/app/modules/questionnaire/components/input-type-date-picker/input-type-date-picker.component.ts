import { Component, Input, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: "input-type-date-picker",
  templateUrl: "./input-type-date-picker.component.html",
  styleUrls: ["./input-type-date-picker.component.scss"],
})
export class InputTypeDatePickerComponent implements OnInit {
  date: any;
  @Input() questionnaireForm: FormGroup;
  @Input() question: any;
  constructor() {}

  ngOnInit() {
    this.questionnaireForm.addControl(
      this.question._id,
      new FormControl(0, Validators.required)
    );
  }

  onChange(e) {
    let value = e.target.value;
    this.question.value = value;
    this.question.startTime = this.question.startTime
      ? this.question.startTime
      : Date.now();
    this.question.endTime = Date.now();
  }
}
