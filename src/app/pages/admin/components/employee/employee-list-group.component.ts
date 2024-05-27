import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormsModule, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { EmployeeListItemDto } from '../../../../features/models/responses/employee/employee-list-item-dto';
import { formatDate } from '../../../../core/helpers/format-date';
import { PageRequest } from '../../../../core/models/page-request';
import { EmployeeService } from '../../../../features/services/concretes/employee.service';
import { UpdateEmployeeRequest } from '../../../../features/models/requests/employee/update-employeere-quest';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../features/services/concretes/auth.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-employee-list-group',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './employee-list-group.component.html',
  styleUrl: './employee-list-group.component.css'
})
export class EmployeeListGroupComponent implements OnInit {
  formMessage: string | null = null;
  employeeUpdateForm: FormGroup;
  employeeCreateForm: FormGroup;
  selectedEmployee: any;
  showUpdateModal: boolean = false;
  showCreateModal: boolean = false;
  employeeList: EmployeeListItemDto;
  submitted = false;

  constructor(
    private employeeService: EmployeeService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private change: ChangeDetectorRef,
    private toastr:ToastrService
  ) { }


  ngOnInit(): void {
    this.loadEmployees();
    this.updateForm();
    this.createForm();
  }

  updateForm() {
    this.employeeUpdateForm = this.formBuilder.group({
      userName: ["",[Validators.required,Validators.minLength(4)]],
      firstName:["",[Validators.required, Validators.pattern('^[a-zA-ZçÇğĞıİöÖşŞüÜ]+$'), Validators.minLength(2)]],  
      lastName:["",[Validators.required,Validators.pattern('^[a-zA-ZçÇğĞıİöÖşŞüÜ]+$'),Validators.minLength(2)]], 
      dateOfBirth: ["", Validators.required],
      nationalIdentity: ["",[Validators.required,Validators.pattern('^[0-9]*$'),Validators.minLength(11)]],
      email: ["",[Validators.required,Validators.email]],
      position: ["", Validators.required],
      password: ["", Validators.required,Validators.minLength(6)]
    });
  }
  createForm() {
    this.employeeCreateForm = this.formBuilder.group({
      userName: ["",[Validators.required,Validators.minLength(4)]],
      firstName:["",[Validators.required, Validators.pattern('^[a-zA-ZçÇğĞıİöÖşŞüÜ]+$'), Validators.minLength(2)]],  
      lastName:["",[Validators.required,Validators.pattern('^[a-zA-ZçÇğĞıİöÖşŞüÜ]+$'),Validators.minLength(2)]], 
      dateOfBirth: ["", Validators.required],
      nationalIdentity: ["",[Validators.required,Validators.pattern('^[0-9]*$'),Validators.minLength(11)]],
      email: ["",[Validators.required,Validators.email]],
      position: ["", Validators.required],
      password: ["", Validators.required,Validators.minLength(6)]
    })
  }

  loadEmployees() {
    const pageRequest: PageRequest = {
      pageIndex: 0,
      pageSize: 20
    };
    this.getEmployees(pageRequest);
  }


  getEmployees(pageRequest: PageRequest) {
    this.employeeService.getList(pageRequest).subscribe((response) => {
      this.employeeList = response;
    })
  }

  add() {
    this.submitted = true;
    if (this.employeeCreateForm.valid) {
      let employee = Object.assign({}, this.employeeCreateForm.value);
      this.authService.RegisterEmployee(employee).subscribe({
        error: (error) => {
          this.toastr.error("Eklenemedi",error);
          this.change.markForCheck();
        },
        complete: () => {
          this.toastr.success("Başarıyla Eklendi");
          this.change.markForCheck();
          this.closeModal();
          this.loadEmployees();
        }
      });
    } else {
      this.markFormGroupTouched(this.employeeCreateForm);
    }
  }
  delete(id: string) {
    Swal.fire({
      title: 'Emin misiniz?',
      text: "Bu çalışanı silmek istediğinizden emin misiniz?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Evet, sil!',
      cancelButtonText:'İptal',
    }).then((result) => {
      if (result.isConfirmed) {
        this.employeeService.delete(id).subscribe({
          next: () => {
            this.toastr.success('Silme işlemi başarılı!',);
            this.loadEmployees();
          },
          error: (error) => {
            this.toastr.error('Silme işlemi başarısız!',error);
          }
        });
      }
    });
  }
  update() {
    this.submitted = true;
    if(this.employeeUpdateForm.valid) {
    const id = this.selectedEmployee.id;
    const updatedUserName = this.employeeUpdateForm.value.userName;
    const updatedFirstName = this.employeeUpdateForm.value.firstName;
    const updatedLastName = this.employeeUpdateForm.value.lastName;
    const updatedEmail = this.employeeUpdateForm.value.email;
    const updatedNationalIdentity = this.employeeUpdateForm.value.nationalIdentity;
    const updatedDateOfBirth = this.employeeUpdateForm.value.dateOfBirth;
    const updatedDate = this.employeeUpdateForm.value.updatedDate;
    const updatedPosition = this.employeeUpdateForm.value.position;
    const updatedPassword = this.employeeUpdateForm.value.password;
    const request: UpdateEmployeeRequest = {
      id: id,
      userName: updatedUserName,
      firstName: updatedFirstName,
      lastName: updatedLastName,
      email: updatedEmail,
      nationalIdentity: updatedNationalIdentity,
      dateOfBirth: updatedDateOfBirth,
      updatedDate: updatedDate,
      position: updatedPosition,
      password: updatedPassword
    };
    this.employeeService.update(request).subscribe({
      next: () => {
        this.closeModal();
        this.loadEmployees();
      },
      error: (error) => {
        this.toastr.error('Güncelleme işlemi başarısız:', error);
      }
    });
  } else {
  this.markFormGroupTouched(this.employeeUpdateForm);
}
  }
  openUpdateModal(employee: any) {
    this.employeeService.getById(employee.id).subscribe({
      next: (response) => {
        this.selectedEmployee = { ...response };
        this.employeeUpdateForm.patchValue(
          {
            userName: this.selectedEmployee.userName,
            firstName: this.selectedEmployee.firstName,
            lastName: this.selectedEmployee.lastName,
            email: this.selectedEmployee.email,
            nationalIdentity: this.selectedEmployee.nationalIdentity,
            dateOfBirth: formatDate(this.selectedEmployee.dateOfBirth),
            updatedDate: this.selectedEmployee.updatedDate,
            position: this.selectedEmployee.position,
            password: this.selectedEmployee.password
          }); // Modal içindeki formu güncelle
        this.showUpdateModal = true;
        return response;
      },
      error: (error) => {
        this.toastr.error('Veri getirme işlemi başarısız:', error);
      }
    });
  }
  openAddModal() {
    this.employeeCreateForm.reset();
    this.showCreateModal = true;
  }
  closeModal() {
    this.showUpdateModal = false;
    this.showCreateModal = false;
  }
  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}


