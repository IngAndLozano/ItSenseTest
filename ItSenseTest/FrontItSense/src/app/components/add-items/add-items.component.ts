import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/app/service/api-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-items',
  templateUrl: './add-items.component.html',
  styleUrls: ['./add-items.component.css']
})
export class AddItemsComponent {
  itemsForm: FormGroup;
  type_manufracture: string[] = ['Elaborado a mano', 'Elaborado a mano y máquina'];

  constructor(
    private formBuilder: FormBuilder, 
    private apiService: ApiServiceService, 
    private router: Router
  ) {
    this.itemsForm = this.formBuilder.group({
      ItemsArray: this.formBuilder.array([
        this.createFormItem()
      ]),
    });
  }

  get ItemsArray() {
    return this.itemsForm.get('ItemsArray') as FormArray;
  }

  agregarFormulario() {
    this.ItemsArray.push(this.createFormItem());
  }

  eliminarFormulario(index: number) {
    this.ItemsArray.removeAt(index);
  }

  createFormItem(): FormGroup {
    return this.formBuilder.group({
      nombre: [''], 
      tipoElaboracion: [''], 
      defecto: [false] 
    });
  }

  addItems() {
    if (!this.itemsForm) {
      this.showAlertError();
      console.error('El formulario de items no ha sido inicializado correctamente.');
      return;
    }
    const itemsArray = this.itemsForm.get('ItemsArray');
    if (!itemsArray) {
      this.showAlertError();
      console.error('No se encontró el FormArray ItemsArray en itemsForm.');
      return;
    }
    const items = itemsArray.value;
    this.apiService.postProducts(items).subscribe(
      (res) => {
        this.showAlert();
      },
      (error) => {
        this.showAlertError();
      }
    );
  }

  // Swal Alerts
  showQuestionAlert() {
    Swal.fire({
      title: "AGREGAR ITEM",
      text: "¿Seguro quieres agregar este item?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "rgb(1, 1, 88)",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, crear",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.addItems();
      }
    });
  }

  showAlertGetOut() {
    Swal.fire({
      title: "Abandonar Operación",
      text: "¿Deseas abandonar la operación?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "rgb(1, 1, 88)",
      cancelButtonColor: "#d33",
      confirmButtonText: "Abandonar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/Inventory']);
      }
    });
  }

  showAlertError() {
    Swal.fire({
      icon: 'error',
      title: 'ERROR',
      text: 'Hubo un error al crear el Usuario.',
    });
  }

  showAlert() {
    Swal.fire({
      icon: 'success',
      title: 'ITEM CREADO',
      text: 'El item se creó exitosamente',
    });
    this.router.navigate(['/Inventory']);
  }
}
