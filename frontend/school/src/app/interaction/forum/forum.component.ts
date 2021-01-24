import {
  trigger,
  transition,
  stagger,
  animate,
  style,
  query,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ListItem } from 'frontend/shared/src/lib/controls/controls.interface';

@Component({
  selector: 'iz-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss'],
  animations: [
    trigger('listAnimation', [
      transition('* => *', [
        query(
          ':enter',
          [
            style({ opacity: 0 }),
            stagger(100, [animate('1s', style({ opacity: 1 }))]),
          ],
          { optional: true },
        ),
      ]),
    ]),
  ],
})
export class ForumComponent implements OnInit {
  self = {
    title: 'Swetha.D',
    heroBg: 'transparent',
    mainBg: 'transparent',
    img: 'assets/icons/girl.svg',
    align: 'right',
    reverse: true,
  };
  forumList: ListItem[] = [
    {
      title: 'Botany Forum',
      description:
        'Check out the following link on further underating on todays topic Biology is the study of life',
      img: 'assets/icons/biological.svg',
      heroBg: 'transparent',
      mainBg: 'transparent',
    },
    {
      title: 'Chess Club',
      description: '@higher Class Todays class will be postponed to tommorow.',
      img: 'assets/icons/chess-board.svg',
      heroBg: 'transparent',
      mainBg: 'transparent',
    },
    {
      title: 'Swetha.D',
      description:
        'I am having a query on behalf of 6A, We have special classes tomorrow which conflicts with the chess class.',
      heroBg: 'transparent',
      mainBg: 'transparent',
      img: 'assets/icons/girl.svg',
      align: 'right',
      reverse: true,
    },
  ];

  commentForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.commentForm = this.fb.group({
      description: [''],
    });
  }

  addcomment() {
    let comment = this.commentForm.value;
    if (this.commentForm.value.description) {
      comment = Object.assign(comment, this.self);
      this.forumList.push(comment);
      this.commentForm.reset();
    }
  }
}
