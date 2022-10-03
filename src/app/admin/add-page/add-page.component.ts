import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/shared/product.service';

@Component({
  selector: 'app-add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.scss']
})
export class AddPageComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  submitted: boolean = false;

  constructor(private proudctService: ProductService) {
    this.form = new FormGroup({
      type: new FormControl(null, Validators.required),
      title: new FormControl(null, Validators.required),
      photo: new FormControl(null, Validators.required),
      info: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required),
    });  
  }

  ngOnInit(): void {
  }

  submit() {
    if (this.form.invalid)
      return;

    const product = {
      type: this.form.get("type")?.value,
      title: this.form.get("title")?.value,
      photo: this.form.get("photo")?.value,
      info: this.form.get("info")?.value,
      price: this.form.get("price")?.value,
      date: new Date()
    }
    
    this.proudctService.create(product).subscribe(response => console.log(response));

    this.submitted = true;
  }

}
