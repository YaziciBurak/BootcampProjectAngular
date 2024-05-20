import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormsModule, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { EmployeeListItemDto } from '../../../../features/models/responses/employee/employee-list-item-dto';
import { formatDate } from '../../../../core/helpers/format-date';
import { PageRequest } from '../../../../core/models/page-request';
import { EmployeeService } from '../../../../features/services/concretes/employee.service';
import { UpdateEmployeeRequest } from '../../../../features/models/requests/employee/update-employeere-quest';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../features/services/concretes/auth.service';


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

  constructor(
    private employeeService: EmployeeService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private change: ChangeDetectorRef

  ) { }



  ngOnInit(): void {
    this.loadEmployees();
    this.updateForm();
    this.createForm();
  }

  updateForm() {
    this.employeeUpdateForm = this.formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      userName: ["", Validators.required],
      dateOfBirth: ["", Validators.required],
      nationalIdentity: ["", Validators.required],
      email: ["", Validators.required],
      position: ["", Validators.required],
      password: ["", Validators.required]
    });
  }
  createForm() {
    this.employeeCreateForm = this.formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      userName: ["", Validators.required],
      dateOfBirth: ["", Validators.required],
      nationalIdentity: ["", Validators.required],
      email: ["", Validators.required],
      position: ["", Validators.required],
      password: ["", Validators.required]
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
    if (this.employeeCreateForm.valid) {
      let employee = Object.assign({}, this.employeeCreateForm.value);
      this.authService.RegisterEmployee(employee).subscribe({
        next: (response) => {
          this.handleCreateSuccess();
        },
        error: (error) => {
          this.formMessage = "Eklenemedi";
          this.change.markForCheck();
        },
        complete: () => {
          this.formMessage = "Başarıyla Eklendi";
          this.change.markForCheck();
          this.closeModal();
          this.loadEmployees();
        }
      });
    }
  }
  handleCreateSuccess() {
    this.loadEmployees();
    this.formMessage = "Başarıyla Eklendi";
    setTimeout(() => {
      this.formMessage = "";
    }, 3000);
  }

  delete(id: string) {
    if (confirm('Bu uygulama durumunu silmek istediğinizden emin misiniz?')) {
      this.employeeService.delete(id).subscribe({
        next: (response) => {
          this.handleDeleteSuccess();
        },
        error: (error) => {
          console.error('Silme işlemi başarısız:', error);
        }
      });
    }
  }

  handleDeleteSuccess() {
    this.loadEmployees();
    this.formMessage = "Başarıyla Silindi";
    setTimeout(() => {
      this.formMessage = "";
    }, 3000);
  }
  update() {
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
      next: (response) => {
        this.closeModal();
        this.loadEmployees();
      },
      error: (error) => {
        console.error('Güncelleme işlemi başarısız:', error);
      }
    });
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
        console.error('Veri getirme işlemi başarısız:', error);
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
}


