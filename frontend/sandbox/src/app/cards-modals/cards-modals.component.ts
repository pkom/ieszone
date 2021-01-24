import { Component, OnInit, ViewChild } from '@angular/core';
import { Color } from 'frontend/shared/src/lib/controls/controls.enum';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ModalControl } from 'frontend/shared/src/lib/controls/modal/modal.control';
import {
  ListItem,
  Card,
} from 'frontend/shared/src/lib/controls/controls.interface';

@Component({
  selector: 'demo-cards-modals',
  templateUrl: './cards-modals.component.html',
  styleUrls: ['./cards-modals.component.scss'],
})
export class CardsModalsComponent implements OnInit {
  @ViewChild('modalTemplate') content;

  cards: Card[] = [
    {
      title: 'natural history museum',
      subTitle: '1 Day',
      content: {
        name: 'Ferdinand.K',
        mobile: '7373675898',
      },
      img: 'assets/images/place-small.svg',
      class: 'col-sm-4',
      tag: 'FREE',
      buttons: [
        { name: 'more', color: Color.SECONDARY },
        { name: 'select', color: Color.PRIMARY },
      ],
    },
    {
      title: 'natural history museum',
      subTitle: '1 Day',
      content: {
        name: 'Ferdinand.K',
        mobile: '7373675898',
      },
      buttons: [{ name: 'select', color: Color.PRIMARY }],
    },
    {
      title: 'natural history museum',
      subTitle: '1 Day',
      content: {
        name: 'Ferdinand.K',
        mobile: '7373675898',
      },
    },
  ];

  items: ListItem[] = [
    {
      title: 'Gentle Remainder',
      description:
        'Third Term Fees  Due on May 10th. Kindly, Ignore if already paid.',
      img: 'assets/icons/fees.svg',
      color: Color.GENTLE,
    },
    {
      title: 'Parents - Teacher Metting 1st Quarter',
      content: {
        description:
          'Meeting scheduled on May 16th to discuss on last exam result with ',
        teacher: 'Harish.B',
      },
      img: 'assets/icons/calendar.svg',
      color: Color.WARN,
    },
    {
      title: 'Transparent Hero Element',
      description:
        'Third Term Fees  Due on May 10th. Kindly, Ignore if already paid.',
      img: 'assets/icons/fees.svg',
      color: Color.GENTLE,
      heroBg: 'transparent',
    },
    {
      title: 'Complete Transparent',
      description:
        'Meeting scheduled on May 16th to discuss on last exam result with Harish.B',
      img: 'assets/icons/calendar.svg',
      heroBg: 'transparent',
      mainBg: 'transparent',
    },
    {
      title: 'List Item Reverse',
      description:
        'Third Term Fees  Due on May 10th. Kindly, Ignore if already paid.',
      color: Color.GENTLE,
      img: 'assets/icons/calendar.svg',
      heroBg: 'transparent',
      reverse: true,
    },
    {
      title: 'List Item Reverse with Action icons',
      description:
        'Third Term Fees  Due on May 10th. Kindly, Ignore if already paid.',
      color: Color.GENTLE,
      primaryAction: { icon: 'check' },
      secondaryAction: { icon: 'clear', color: Color.ERROR },
      heroBg: 'transparent',
      reverse: true,
    },
    {
      title: 'Alignment Modified',
      description:
        'Check out the following link on further underating on todays topic Biology is the study of life',
      heroBg: 'transparent',
      mainBg: 'transparent',
      img: 'assets/icons/biological.svg',
      align: 'right',
      reverse: true,
    },
    {
      title: 'Mat Icon',
      description: 'Material Icons can also be used instead',
      icon: 'folder',
    },
    {
      title: 'Pending Approval',
      description:
        '7th May - 8th May : I will be visiting my relative wedding, Kindly, approve  this leave request.',
      heroTitle: '2',
      heroSubtitle: 'days',
    },
    {
      title: 'Without Icon or image',
      description:
        '7th May - 8th May : I will be visiting my relative wedding, Kindly, approve  this leave request.',
    },
  ];
  constructor(private _snackBar: MatSnackBar, public dialog: MatDialog) {}

  ngOnInit(): void {}

  linkHandler(e) {
    // Do some action here
    // console.log(`Content ${JSON.stringify(e)}`);
  }

  notify() {
    this._snackBar.open('This is a notification', 'Close');
  }

  openModal() {
    const dialogRef = this.dialog.open(ModalControl, {
      width: '250px',
      data: {
        title: 'Confirm Action',
        type: Color.SECONDARY,
        primaryBtn: {
          name: 'Ok',
          color: Color.PRIMARY,
          focus: true,
        },
        closeBtn: {
          name: 'Close',
          color: Color.SECONDARY,
        },
        content: this.content,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      // Returns true for anything other than close or cancel
    });
  }

  heroClick(e) {
    // console.log(`Hero ${e}`);
  }
  primaryClick(e) {
    // console.log(`Primary ${e}`);
  }
  secondaryClick(e) {
    // console.log(`Secondary ${e}`);
  }
}
