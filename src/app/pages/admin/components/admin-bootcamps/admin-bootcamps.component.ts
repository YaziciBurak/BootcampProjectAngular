import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BootcampListItemDto } from '../../../../features/models/responses/bootcamp/bootcamp-list-item-dto';
import { BootcampService } from '../../../../features/services/concretes/bootcamp.service';
import { PageRequest } from '../../../../core/models/page-request';
import { UpdateBootcampRequest } from '../../../../features/models/requests/bootcamp/update-bootcamp-request';
import { InstructorService } from '../../../../features/services/concretes/instructor.service';
import { BootcampStateService } from '../../../../features/services/concretes/bootcamp-state.service';
import { InstructorListItemDto } from '../../../../features/models/responses/instructor/instructor-list-item-dto';
import { BootcampstateListItemDto } from '../../../../features/models/responses/bootcampstate/bootcampstate-list-item-dto';
import { RouterModule } from '@angular/router';
import { CreateBootcampRequest } from '../../../../features/models/requests/bootcamp/create-bootcamp-request';


@Component({
  selector: 'app-admin-bootcamps',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,HttpClientModule,CommonModule,RouterModule],
  templateUrl: './admin-bootcamps.component.html',
  styleUrl: './admin-bootcamps.component.css'
})
export class AdminBootcampsComponent implements OnInit{
  formMessage: string | null = null;
  bootcampUpdateForm: FormGroup;
  bootcampCreateForm:FormGroup;
  selectedBootcamp: any;
  showUpdateModal: boolean = false;
  showCreateModal: boolean = false;
  bootcampStateList: BootcampstateListItemDto;
  instructorList: InstructorListItemDto;
  
  bootcampList: BootcampListItemDto = {
    index: 0,
    size: 0,
    count: 0,
    hasNext: false,
    hasPrevious: false,
    pages: 0,
    items: []
  };

  constructor(
    private bootcampService: BootcampService,
    private formBuilder: FormBuilder,
    private instructorService: InstructorService,
    private bootcampStateService: BootcampStateService,
    private change:ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadBootcamps();
    this.updateForm();
    this.createForm();
  }

  updateForm() {
    this.bootcampUpdateForm = this.formBuilder.group({
      name: ['', [Validators.required]],  
      instructorId: ['',[Validators.required]],
      instructorFirstName:['' ,[Validators.required]],
      endDate: ['',[Validators.required]], 
      startDate: [''],
      bootcampStateId:['']
    });
  }

  createForm() {
    this.bootcampCreateForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      instructorId: ['',[Validators.required]],
      bootcampStateId:['',], 
      endDate: ['',[Validators.required]], 
      startDate: ['']
    })
  }

  
  loadBootcamps() {
    const pageRequest: PageRequest = { page: 0, pageSize: 20 };
    this.getBootcamps(pageRequest);
     this.getInstructors();
     this.getBootcampStates();
     
  }

  getBootcamps(pageRequest: PageRequest) {
    this.bootcampService.getList(pageRequest).subscribe(response => {
      this.bootcampList = response;
      console.log(response);
    });
  }

  getInstructors() {
    this.instructorService.getListAll().subscribe(response => {
      this.instructorList = response;
    });
  }

  getBootcampStates() {
    this.bootcampStateService.getListAll().subscribe(response => {
      this.bootcampStateList = response;
    });
  }

  delete(id: number) {
    if (confirm('Bu uygulama durumunu silmek istediğinizden emin misiniz?')) {
      this.bootcampService.delete(id).subscribe({
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
    this.loadBootcamps();
    this.formMessage = "Başarıyla Silindi";
    setTimeout(() => {
      this.formMessage = "";
    }, 3000);
  }

  add() {
    if(this.bootcampCreateForm.valid) {
      let bootcamp:CreateBootcampRequest = Object.assign({},this.bootcampCreateForm.value);
      this.bootcampService.create(bootcamp).subscribe({
        next:(response)=>{
          alert("Ekleme Başarılı!")
        },
        error:(error)=>{
          this.formMessage="Eklenemedi";
          this.change.markForCheck();
        },
        complete:()=>{
          this.formMessage="Başarıyla Eklendi";
          this.change.markForCheck();
          this.closeModal();
          this.loadBootcamps();
        }
        });
      }
    }
  
  update() {
    const id = this.selectedBootcamp.id;
    const instructorId = this.bootcampUpdateForm.value.instructorId;
    const bootcampStateId = this.bootcampUpdateForm.value.bootcampStateId;
    const bootcampImageId = this.selectedBootcamp.bootcampImageId;
    const updatedInstructorFirstName = this.bootcampUpdateForm.value.instructorFirstName;
    const updatedInstructorLastName = this.bootcampUpdateForm.value.instructorLastName;
    const updatedBootcampStateName = this.selectedBootcamp.bootcampStateName;
    const bootcampImagePath = this.selectedBootcamp.bootcampImagePath;
    const startDate = this.bootcampUpdateForm.value.startDate;
    const endDate = this.bootcampUpdateForm.value.endDate;
    const updatedName = this.bootcampUpdateForm.value.name;

    const request: UpdateBootcampRequest = {
      id: id,
      instructorId : instructorId,
      bootcampStateId : bootcampStateId,
      bootcampImageId : bootcampImageId,
      instructorFirstName : updatedInstructorFirstName,
      instructorLastName : updatedInstructorLastName,
      bootcampStateName : updatedBootcampStateName,
      bootcampImagePath : bootcampImagePath,
      name : updatedName,
      startDate : startDate,
      endDate : endDate

    };
    this.bootcampService.update(request).subscribe({
      next: (response) => {
          this.closeModal(); // Modal'ı kapat
          this.loadBootcamps(); // Verileri yeniden getir
      },
      error: (error) => {
          console.error('Güncelleme işlemi başarısız:', error);
      }
  });
}

  openUpdateModal(bootcamp: any) {
    this.bootcampService.getById(bootcamp.id).subscribe({
      next: (response) => {
        this.selectedBootcamp = { ...response };
        this.bootcampUpdateForm.patchValue({ name: this.selectedBootcamp.name,
          startDate: this.selectedBootcamp.startDate,
          endDate: this.selectedBootcamp.endDate,
          instructorId: this.selectedBootcamp.instructorId,
          bootcampStateId: this.selectedBootcamp.bootcampStateId
         }); 
        this.showUpdateModal = true; // Modal'ı aç
        return response;
      },
      error: (error) => {
        console.error('Veri getirme işlemi başarısız:', error);
      }
    });
  }

  openAddModal() {
    this.bootcampCreateForm.reset();
    this.showCreateModal = true;
  }
  

  closeModal() {
    this.showUpdateModal = false;
    this.showCreateModal = false;
  }
 

}
