import { Component, Input } from '@angular/core';
import Chart, { ChartItem } from 'chart.js/auto';
import { PostService } from 'src/app/modules/core/services/post.service';
import { IPost } from '../../interfaces/post.interfaces';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss'],
})
export class StatsComponent {
  labels: string[] = [];
  data: number[] = [];

  @Input() posts!: IPost[];

  ngOnInit() {
    this.posts.map((post) => this.labels.push(post.title));

    this.posts.map((post) => {
      const item = window.localStorage.getItem(post._id);

      if (item) {
        this.data.push(JSON.parse(item).views);
      } else {
        this.data.push(1);
      }
    });

    console.log(this.data);
    this.createChart();
  }

  createChart() {
    new Chart(document.getElementById('acquisitions') as ChartItem, {
      type: 'doughnut',
      data: {
        labels: this.labels.map((row) => row),
        datasets: [
          {
            label: 'Post popularity',
            data: this.data.map((row) => row),
          },
        ],
      },
    });
  }
}
