import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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


@Component({
  selector: 'app-admin-bootcamps',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,HttpClientModule,CommonModule,RouterModule],
  templateUrl: './admin-bootcamps.component.html',
  styleUrl: './admin-bootcamps.component.css'
})
export class AdminBootcampsComponent implements OnInit{
  @Input() selectedInstructorId:string; 
  @Output() instructorSelected = new EventEmitter<string>(); 
  formMessage: string | null = null;
  bootcampForm: FormGroup;
  selectedBootcamp: any;
  showUpdateModal: boolean = false;
  bootcampStateList: BootcampstateListItemDto;
  
  bootcampList: BootcampListItemDto = {
    index: 0,
    size: 0,
    count: 0,
    hasNext: false,
    hasPrevious: false,
    pages: 0,
    items: []
  };
  instructorList: InstructorListItemDto;


  constructor(
    private bootcampService: BootcampService,
    private formBuilder: FormBuilder,
    private instructorService: InstructorService,
    private bootcampStateService: BootcampStateService
  ) {}

  ngOnInit(): void {
    this.loadApplicationStates();
    this.updateForm();
  }

  updateForm() {
    this.bootcampForm = this.formBuilder.group({
      name: ['', [Validators.required]],  
      instructorId: ['',[Validators.required]],
      instructorFirstName:['' ,[Validators.required]],
      endDate: ['',[Validators.required]], // endDate kontrolünü tanımla
      startDate: ['',],// date kontrolünü tanımla
      bootcampStateId:['',]
    });
  }

  
  loadApplicationStates() {
    const pageRequest: PageRequest = { page: 0, pageSize: 20 };
    this.getBootcamps(pageRequest);
     this.getInstructors();
     this.getBootcampStates();
  }

  onSelectedInstructor(instructorId:string):void{
    this.selectedInstructorId=instructorId;
    this.instructorSelected.emit(this.selectedInstructorId);
    console.log("ON SELECTED INSTRUCTOR ÇALIŞIYOR",this.selectedInstructorId)
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
    this.loadApplicationStates();
    // Güzel bir geri bildirim mesajı oluştur
    this.formMessage = "Başarıyla Silindi";
    setTimeout(() => {
      this.formMessage = "";
    }, 3000);
  }

  onInstructorChange(event: any) {
    const instructorId = event.target.value;
    this.bootcampForm.patchValue({ instructorId: instructorId });
  }
  

  
  update() {
    const id = this.selectedBootcamp.id;
    const instructorId = this.bootcampForm.value.instructorId;
    console.log("Seçilen Eğitmen ID:", instructorId);
    const bootcampStateId = this.bootcampForm.value.bootcampStateId;
    const bootcampImageId = this.selectedBootcamp.bootcampImageId;
    const updatedInstructorFirstName = this.bootcampForm.value.instructorFirstName;
    const updatedInstructorLastName = this.bootcampForm.value.instructorLastName;
    const updatedBootcampStateName = this.selectedBootcamp.bootcampStateName;
    const bootcampImagePath = this.selectedBootcamp.bootcampImagePath;
    const startDate = this.selectedBootcamp.startDate;
    const endDate = this.selectedBootcamp.endDate;
    const updatedName = this.bootcampForm.value.name;

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
          this.showUpdateModal = false; // Modal'ı kapat
          this.loadApplicationStates(); // Verileri yeniden getir
      },
      error: (error) => {
          console.error('Güncelleme işlemi başarısız:', error);
      }
  });
}

  openUpdateModal(bootcamp: any) {
    // İlgili application state'i backend'den getir
    this.bootcampService.getById(bootcamp.id).subscribe({
      next: (response) => {
        // Backend'den gelen verileri formda kullan
        this.selectedBootcamp = { ...response };
        this.bootcampForm.patchValue({ name: this.selectedBootcamp.name,
          startDate: this.selectedBootcamp.startDate,
          endDate: this.selectedBootcamp.endDate,
          instructorId: this.selectedBootcamp.instructorId,
          bootcampStateId: this.selectedBootcamp.bootcampStateId
         }); // Modal içindeki formu güncelle
        this.showUpdateModal = true; // Modal'ı aç
        return response;
      },
      error: (error) => {
        console.error('Veri getirme işlemi başarısız:', error);
      }
    });
  }

 
  

  closeUpdateModal() {
    this.showUpdateModal = false;
  }
}
