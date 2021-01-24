import { Component, OnInit, ViewChild } from '@angular/core';
import { ExpandItem } from 'frontend/shared/src/lib/controls/controls.interface';

@Component({
  selector: 'demo-tab-view',
  templateUrl: './tab-view.component.html',
  styleUrls: ['./tab-view.component.scss'],
})
export class TabViewComponent implements OnInit {
  tabs = [
    { name: 'Quick View' },
    { name: 'Timetable' },
    { name: 'Syllabus' },
    { name: 'Exam Schedule' },
    { name: 'Results' },
  ];

  items: ExpandItem[] = [
    {
      title: 'Botany',
      description: 'Completed (3 / 4)',
      img: 'assets/icons/biological.svg',
      expanded: true,
      content: [
        {
          lesson: '01',
          chapter: 'Plant anatomy',
          staffCompletion: true,
          studentCompletion: true,
        },
        {
          lesson: '02',
          chapter: 'Cell biology',
          staffCompletion: true,
          studentCompletion: false,
        },
        {
          lesson: '03',
          chapter: 'Ecology',
          staffCompletion: true,
          studentCompletion: false,
        },
        {
          lesson: '04',
          chapter: 'Microbiology',
          staffCompletion: false,
          studentCompletion: false,
        },
      ],
    },
    { title: 'Chemistry', img: 'assets/icons/chemistry.svg' },
    { title: 'Physics', img: 'assets/icons/physics.svg' },
    { title: 'Geography', img: 'assets/icons/geography.svg' },
    { title: 'Maths', img: 'assets/icons/maths.svg' },
  ];
  constructor() {}

  ngOnInit(): void {}
}
