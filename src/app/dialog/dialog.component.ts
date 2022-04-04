import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators} from '@angular/forms';
import { ApiService } from '../services/api.service';
import {MatDialogRef , MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  freshi =["New Brand","Seconds","Refurbished"]
  productForm !: FormGroup;
  activeBtn : string = "Save";
  dialogtitle : string = "Add Additional products"
  constructor(private formbuilder : FormBuilder,
    private api : ApiService,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialogRef:MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.productForm = this.formbuilder.group({
      Productname : ['',Validators.required],
      Category : ['',Validators.required],
      Freshness : ['',Validators.required],
      Price : ['',Validators.required],
      Comments : ['',Validators.required],
      Date : ['',Validators.required],
      Image : ['']
    })
    
    if(this.editData){
      this.dialogtitle ="Edit Product Details"
      this.activeBtn ="Update"
      this.productForm.controls['Productname'].setValue(this.editData.Productname)
      this.productForm.controls['Category'].setValue(this.editData.Category)
      this.productForm.controls['Freshness'].setValue(this.editData.Freshness)
      this.productForm.controls['Price'].setValue(this.editData.Price)
      this.productForm.controls['Comments'].setValue(this.editData.Comments)
      this.productForm.controls['Date'].setValue(this.editData.Date)
      this.productForm.controls['Image'].setValue(this.editData.Image)

    }
  }

  addProd(){
    if(!this.editData){
      if(this.productForm.valid){
        this.api.postproduct(this.productForm.value)
        .subscribe({
          next:(res)=>{
            alert("Product added successfully");
            this.productForm.reset();
            this.dialogRef.close('save')
          },
          error:()=>{
            alert("Fill all the data")
          }
        })
    }
    }else{
      this.updateProduct()
    }
  }
  
  updateProduct(){
    this.api.putproduct(this.productForm.value,this.editData.id)
    .subscribe({
      next:(res)=>{
        alert("Product updated successfully");
        this.productForm.reset();
        this.dialogRef.close("update");
      },
      error:()=>{
        alert("Product not updated ")

      }
    })
  }
}
