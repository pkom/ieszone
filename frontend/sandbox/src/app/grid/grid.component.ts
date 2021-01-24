import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'demo-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent implements OnInit {
  examSchedule = [
    {
      date: 'Monday (2-5-20)',
      forenoon: 'Maths 1st Paper',
      afternoon: 'Botany/Zoolagy Practicals',
    },
    {
      date: 'Tuesday (3-5-20)',
      forenoon: 'English',
      afternoon: 'History',
    },
    {
      date: 'Wednesday (4-5-20)',
      forenoon: 'Botany',
      afternoon: 'zoology',
    },
    {
      date: 'Thursday (5-5-20)',
      forenoon: 'Tamil',
      afternoon: 'Geography',
    },
    {
      date: 'Friday (6-5-20)',
      forenoon: 'Maths 2nd Paper',
      afternoon: 'Physics/Chemistry Practicals',
    },
    {
      date: 'Saturday (7-5-20)',
      forenoon: 'Hindi',
      afternoon: 'Computer Science',
    },
    {
      date: 'Monday (9-5-20)',
      forenoon: 'Physics',
      afternoon: 'Chemistry',
    },
    {
      date: 'Tuesday (10-5-20)',
      forenoon: 'General Knowledge',
      afternoon: '-',
    },
  ];
  scheduleCols = ['date', 'forenoon', 'afternoon'];
  scheduleDefs = [
    {
      name: 'date',
      displayName: `Date \\ Time`,
      isHeader: true,
      align: 'center',
      style: { flex: '0 0 150px' },
    },
    {
      name: 'forenoon',
      displayName: 'Forenoon ( 9.30 am to 12.00 pm )',
      align: 'center',
    },
    {
      name: 'afternoon',
      displayName: 'Afternoon ( 1.30 am to 4.00 pm )',
      align: 'center',
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
