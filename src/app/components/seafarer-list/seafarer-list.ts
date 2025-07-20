import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { SeafarerService } from '../../Core/services/seafarer.service';
import { AuthService } from '../../Core/services/auth.service';
import { Seafarer } from '../../Core/models/seafarer.model';

@Component({
  selector: 'app-seafarer-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatDialogModule,
    MatChipsModule
  ],
  templateUrl: './seafarer-list.html',
  styleUrl: './seafarer-list.scss'
})
export class SeafarerListComponent implements OnInit {
  seafarers: Seafarer[] = [];
  isLoading = false;
  displayedColumns: string[] = [
    'EmployeeName',
    'EmployeeCode',
    'JobName',
    'Nationality',
    'Phone',
    'Email',
    'PassportNumber',
    'VisaExpiryDate',
    'Status',
    'actions'
  ];

  constructor(
    private seafarerService: SeafarerService,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadSeafarers();
  }

  loadSeafarers(): void {
    this.isLoading = true;
    this.seafarerService.getAllSeafarers().subscribe({
      next: (response) => {
        // Handle the API response structure
        this.seafarers = response.Data || [];
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        this.snackBar.open('Failed to load seafarers', 'Close', {
          duration: 3000
        });
        console.error('Error loading seafarers:', error);
      }
    });
  }

  addSeafarer(): void {
    this.router.navigate(['/seafarer-form']);
  }

  editSeafarer(seafarer: Seafarer): void {
    this.router.navigate(['/seafarer-form', seafarer.Id]);
  }

  activateSeafarer(seafarer: Seafarer): void {
    if (seafarer.Id && seafarer.EmpId) {
      this.seafarerService.activateDeactivateSeafarer(seafarer.Id, 1, seafarer.EmpId).subscribe({
        next: () => {
          this.snackBar.open('Seafarer activated successfully', 'Close', {
            duration: 3000
          });
          this.loadSeafarers();
        },
        error: (error) => {
          this.snackBar.open('Failed to activate seafarer', 'Close', {
            duration: 3000
          });
          console.error('Error activating seafarer:', error);
        }
      });
    }
  }

  deactivateSeafarer(seafarer: Seafarer): void {
    if (seafarer.Id && seafarer.EmpId) {
      this.seafarerService.activateDeactivateSeafarer(seafarer.Id, 2, seafarer.EmpId).subscribe({
        next: () => {
          this.snackBar.open('Seafarer deactivated successfully', 'Close', {
            duration: 3000
          });
          this.loadSeafarers();
        },
        error: (error) => {
          this.snackBar.open('Failed to deactivate seafarer', 'Close', {
            duration: 3000
          });
          console.error('Error deactivating seafarer:', error);
        }
      });
    }
  }

  getStatusText(status: number | undefined): string {
    switch (status) {
      case 1:
        return 'Active';
      case 2:
        return 'Inactive';
      default:
        return 'Unknown';
    }
  }

  getStatusColor(status: number | undefined): string {
    switch (status) {
      case 1:
        return 'primary';
      case 2:
        return 'warn';
      default:
        return 'accent';
    }
  }

  formatDate(dateString: string | undefined): string {
    if (!dateString) return '-';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString();
    } catch {
      return '-';
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}

