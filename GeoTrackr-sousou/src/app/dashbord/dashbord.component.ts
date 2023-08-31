import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { ListUsersService } from 'src/services/list-users.service';
import { TraceService } from 'src/services/trace.service';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css']
})
export class DashbordComponent implements OnInit {
  userCount!: number;
  chart!: Chart;
  pieChart!: Chart<'pie'>;

  counts: { [key: string]: number } = {};

  constructor(private userService: ListUsersService, private traceService: TraceService) {}

  ngOnInit(): void {
    this.userService.countUsers().subscribe(count => {
      this.userCount = count;
      this.createGraph();
      this.createPieChart();
    });
  }

  createGraph() {
    const canvas = document.getElementById('userChart') as HTMLCanvasElement;
    this.chart = new Chart(canvas, {
      type: 'bar',
      data: {
        labels: ['Utilisateurs'],
        datasets: [
          {
            label: 'Nombre d\'utilisateurs',
            data: [this.userCount],
            backgroundColor: 'rgba(75, 192, 192, 0.5)'
          }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  createPieChart() {
    this.traceService.getTraceCountsByStatus().subscribe((results: any) => {
      if (results && typeof results === 'object') {
        this.counts = results;
        this.updatePieChart();
      } else {
        console.log("Les données ne sont pas au format attendu.");
      }
    }, (error) => {
      console.error("Une erreur s'est produite lors de l'appel à l'API :", error);
    });
  }
  

  updatePieChart() {
    const totalCount = this.counts['VALIDE'] + this.counts['BROUILLON'] + this.counts['REJETE'];
    const pieCanvas = document.getElementById('pieChart') as HTMLCanvasElement;
  
    const pieData = {
      labels: ['Valide', 'Brouillon', 'Rejeté'],
      datasets: [
        {
          data: [
            (this.counts['VALIDE'] / totalCount) * 100,
            (this.counts['BROUILLON'] / totalCount) * 100,
            (this.counts['REJETE'] / totalCount) * 100
          ],
          backgroundColor: ['green', 'gray', 'red']
        }
      ]
    };
  
  
  

    const pieOptions = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top' as 'top',
        },
        title: {
          display: true,
          text: 'Statut des Traces'
        }
      }
    };

    if (this.pieChart) {
      this.pieChart.data = pieData;
      this.pieChart.options = pieOptions;
      this.pieChart.update();
    } else {
      this.pieChart = new Chart<'pie'>(pieCanvas, {
        type: 'pie',
        data: pieData,
        options: pieOptions
      });
    }
  }
}
