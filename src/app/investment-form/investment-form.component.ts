import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MockService } from '../services/mock.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-investment-form',
  standalone: false,
  templateUrl: './investment-form.component.html',
  styleUrls: ['./investment-form.component.css']
})
export class InvestmentFormComponent {
  investmentForm: FormGroup;
  today: string;

  constructor(private fb: FormBuilder, private mockService: MockService, private snackBar: MatSnackBar) {
    const currentDate = new Date();
    this.today = currentDate.toISOString().split('T')[0];

    this.investmentForm = this.fb.group({
      asset: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]],
      price: ['', [Validators.required, Validators.min(1)]],
      date: ['', Validators.required]
    });
  }

  submitForm() {
    if (this.investmentForm.valid) {
      this.mockService.addInvestment(this.investmentForm.value);
      // alert('Investment Added!');
      this.snackBar.open('Success! Investment Added!.', 'Close', {
        duration: 5000,
        panelClass: ['success-snackbar']
      });
      this.investmentForm.reset();
    }
  }
}
