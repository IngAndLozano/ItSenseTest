import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/app/service/api-service.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  data: any[] = [];
  
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = [];
  AvailableProducts = true;
  DefectiveProducts = true;

  constructor(
    public apiService: ApiServiceService,
    private router: Router,
  ) {
    this.dataSource = new MatTableDataSource<any>();
  }
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  ngOnInit() {
    if(window.localStorage.getItem('token') != null){
      this.ReadProducts();
      this.displayedColumns = [
        'id',
        'nombre',
        'estado',
        'defecto',
        'tipoElaboracion',
        'fecha_ingreso',
        'fecha_salida',
        'Acciones'
      ];
    } else {
      this.showAlertErrorAuth();
    }
  }
  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ReadProducts() {
    this.AvailableProducts = true;
    this.DefectiveProducts = true;
    this.apiService.getProducts().subscribe(
      (res: any) => {
        this.data = res.sort((a: any, b: any) => a.id - b.id);
        this.dataSource.data = this.data;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        this.showAlertErrorAuth();
        console.error('Error al obtener el inventario:', error);
      }
    );
  }

  exitItem(id: number) {
    this.apiService.putProducts(id).subscribe((res) => {
      this.showAlert();
      this.ReadProducts();
    }, (error) => {
      console.error(error);
      this.showAlertError();
    });
  }

  loadProducts(available: boolean | null, defective: boolean | null): void {
    this.apiService.getStates(available, defective).subscribe(
      (res: any) => {
        this.data = res.sort((a: any, b: any) => a.id - b.id);
        this.dataSource.data = this.data;
      },
      (error) => {
        this.showAlertErrorAuth();
        console.error('Error al obtener el inventario:', error);
      }
    );
  }

  filterAvailableProducts(): void {
    this.AvailableProducts = false;
    this.loadProducts(true, null);
  }
  
  filterUnavailableProducts(): void {
    this.AvailableProducts = true;
    this.loadProducts(false, null);
  }
  
  filterDefectiveProducts(): void {
    this.DefectiveProducts = false;
    this.loadProducts(null, true);
  }
  
  filterNonDefectiveProducts(): void {
    this.DefectiveProducts = true;
    this.loadProducts(null, false);
  }

  // Swal Alerts
  showQuestionAlert(id: number) {
    Swal.fire({
      title: "GENERAR REGISTRO DE SALIDA",
      text: "¿Deseas generar un registro de salida?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "rgb(1, 1, 88)",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, generar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
         this.exitItem(id);
      }
    });
  }

  showAlertError() {
    Swal.fire({
      icon: 'error',
      title: 'ERROR',
      text: 'Hubo un error al crear el registro de salida.',
    });
  }
  
  showAlertErrorAuth() {
    Swal.fire({
      icon: 'error',
      title: 'ERROR',
      text: 'No tienes permiso para ver la información',
    });
  }

  showAlert() {
    Swal.fire({
      icon: 'success',
      title: 'REGISTRO  CREADO',
      text: 'El registro se generó exitosamente',
    });
  }
}
