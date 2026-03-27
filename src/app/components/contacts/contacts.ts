import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-contacts',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './contacts.html',
  styleUrl: './contacts.scss',
})
  
export class Contacts implements OnInit {

  contactForm: FormGroup;
  private router = inject(Router);
  isThanksPage = false;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      description: ['', [Validators.required]]
    });
  }

  ngOnInit() {    
    this.isThanksPage = this.router.url.includes('thanks');
  }

  onSubmit() {
    if (this.contactForm.valid) {
      console.log('Form Data:', this.contactForm.value);      
      alert('Thank you! Your message has been sent.');
      this.contactForm.reset();
    }
  }
}
