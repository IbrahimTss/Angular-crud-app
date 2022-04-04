import { Component, OnInit,ViewChild } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ApiService } from './services/api.service';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = ['Productname', 'Category', 'Date','Freshness', 'Price','Comments','Action','Image'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator ;
  @ViewChild(MatSort) sort!: MatSort;

    constructor(private api: ApiService,private  dialog :MatDialog){}
  
    ngOnInit(): void {
      this.getAlldata();
  }
    openDialog() {
    this.dialog.open(DialogComponent, {
      width:'30%'
    }).afterClosed().subscribe(val=>{
      if(val === 'save'){
        this.getAlldata();
      }
    })
  }
    // Filter method 

    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
  
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }

      // Edit

  

    // Api data connections 

    getAlldata(){
      this.api.getproduct()
      .subscribe({
        next:(res)=>{
         this.dataSource = new MatTableDataSource(res);
         this.dataSource.paginator = this.paginator;
         this.dataSource.sort = this.sort;
        },
        error:(err)=>{
          console.log('Didnt get the data')
        }
      })
    }

    deleteproduct(id:number){
      this.api.deleteproduct(id)
      .subscribe({
        next:(res)=>{
          alert("Product deleted successfully")
          this.getAlldata();
        },
        error:()=>{
          alert("Error in deletion ")
        }
      })

    }

    editProduct(row : any){
      this.dialog.open(DialogComponent,{
        width:'30%',
        data:row
      }).afterClosed().subscribe(val=>{
        if(val === 'update'){
          this.getAlldata();
        }
      })
    }

  
}
