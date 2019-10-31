import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleService } from './google.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title = 'Library';

  public searchForm = this.fb.group({
    search: ['']
  })

  constructor(private router: Router, private googleService: GoogleService, private fb: FormBuilder){}

  public onSubmit(): void{
    this.googleService.setSearchTerms(this.searchForm.get('search').value);
    this.router.navigate(['/search']);
  }
}
