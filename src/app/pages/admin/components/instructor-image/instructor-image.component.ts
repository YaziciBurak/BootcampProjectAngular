import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InstructorimageListItemDto } from '../../../../features/models/responses/instructorimage/instructorimage-list-item-dto';
import { InstructorListItemDto } from '../../../../features/models/responses/instructor/instructor-list-item-dto';
import { InstructorImageService } from '../../../../features/services/concretes/instructor-image.service';
import { InstructorService } from '../../../../features/services/concretes/instructor.service';
import { PageRequest } from '../../../../core/models/page-request';
import { CreateInstructorimageRequest } from '../../../../features/models/requests/instructorimage/create-instructorimage-request';
import { UpdateInstructorimageRequest } from '../../../../features/models/requests/instructorimage/update-instructorimage-request';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-instructor-image',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './instructor-image.component.html',
  styleUrl: './instructor-image.component.css'
})
export class InstructorImageComponent implements OnInit{
  formMessage: string | null = null;
  instructorImageUpdateForm: FormGroup;
  instructorImageCreateForm:FormGroup;
  selectedInstructorImage: any;
  showUpdateModal: boolean = false;
  showCreateModal: boolean = false;
  instructorImageList: InstructorimageListItemDto;
  instructorList: InstructorListItemDto;
  
  constructor(
    private instructorImageService:InstructorImageService,
    private instructorService:InstructorService,
    private formBuilder:FormBuilder,
    private change:ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    this.loadInstructorImages();
    this.createForm();
    this.updateForm();
  }
  updateForm() {
    this.instructorImageUpdateForm = this.formBuilder.group({
      id:[''],
      instructorId:['', [Validators.required]], 
      file: [null, [Validators.required]] 
    })
  }

  createForm() {
    this.instructorImageCreateForm = this.formBuilder.group({
      instructorId:['', [Validators.required]],
      imagePath:[''],  
      file: ['', [Validators.required]] 
    })
  }

  loadInstructorImages() {
    const pageRequest: PageRequest = { page: 0, pageSize: 18};
    this.getInstructorImages(pageRequest);
     this.getInstructors(pageRequest);  
  }
  getInstructorImages(pageRequest: PageRequest) {
    this.instructorImageService.getList(pageRequest).subscribe(response => {
      this.instructorImageList = response;
    });
  }
  getInstructors(pageRequest:PageRequest){
    this.instructorService.getList(pageRequest).subscribe(response => {
      this.instructorList = response;
    })
  }
  delete(id: number) {
    if (confirm('Bu uygulama durumunu silmek istediğinizden emin misiniz?')) {
      this.instructorImageService.delete(id).subscribe({
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
    this.loadInstructorImages();
    this.formMessage = "Başarıyla Silindi";
    setTimeout(() => {
      this.formMessage = "";
    }, 3000);
  }
  add() {
    if(this.instructorImageCreateForm.valid) {
      let instructorImage:CreateInstructorimageRequest = Object.assign({},this.instructorImageCreateForm.value);
      let formData = new FormData();
      formData.append('instructorId', instructorImage.instructorId.toString());
      formData.append('file', instructorImage.file);
      formData.append('imagePath', instructorImage.imagePath);
      this.instructorImageService.create(formData).subscribe({
        next:(response)=>{
          this.handleCreateSuccess();
        },
        error:(error)=>{
          this.formMessage="Eklenemedi";
          this.change.markForCheck();
        },
        complete:()=>{
          this.formMessage="Başarıyla Eklendi";
          this.change.markForCheck();
          this.closeModal();
          this.loadInstructorImages();
        }
        });
      }
    }
    handleCreateSuccess() {
      this.loadInstructorImages();
      this.formMessage = "Başarıyla Eklendi"; 
      setTimeout(() => {
        this.formMessage = "";
      }, 3000);
    }
    update() {
      let instructorImage:UpdateInstructorimageRequest = {...this.instructorImageUpdateForm.value, file:this.instructorImageUpdateForm.get('file').value };
      let formData = new FormData();
      formData.append('id', instructorImage.id.toString());
      formData.append('instructorId', instructorImage.instructorId);
      formData.append('file', instructorImage.file);
    this.instructorImageService.update(formData).subscribe({
      next: (response) => {
          this.closeModal(); // Modal'ı kapat
          this.loadInstructorImages(); // Verileri yeniden getir
      },
      error: (error) => {
          console.error('Güncelleme işlemi başarısız:', error);
      }
   });
    }
    openUpdateModal(instructorImage: any) {
      this.instructorImageService.getById(instructorImage.id).subscribe({
        next: (response) => {
          this.selectedInstructorImage = { ...response };
          this.instructorImageUpdateForm.patchValue({ 
            id: this.selectedInstructorImage.id,
            instructorId: this.selectedInstructorImage.instructorId,
            file: this.selectedInstructorImage.file
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
      this.instructorImageCreateForm.reset();
      this.showCreateModal = true;
    }
    closeModal() {
      this.showUpdateModal = false;
      this.showCreateModal = false;
    }
    onFileChange(event: any) {
      const file = event.target.files[0];
      this.instructorImageCreateForm?.get('file')?.setValue(file);
    }
    onFileUpdateChange(event: any) {
      const file = event.target.files[0];
      this.instructorImageUpdateForm?.get('file')?.setValue(file);
    }
}
