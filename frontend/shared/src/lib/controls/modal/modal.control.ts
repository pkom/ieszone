import { Component, OnInit, Inject, TemplateRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface ModalData {
  title: string;
  content: TemplateRef<any>;
}

@Component({
  selector: 'iz-modal',
  templateUrl: './modal.control.html',
  styleUrls: ['./modal.control.scss'],
})
export class ModalControl implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ModalControl>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {}
}
