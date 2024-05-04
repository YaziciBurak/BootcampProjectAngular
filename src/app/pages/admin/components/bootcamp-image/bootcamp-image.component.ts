import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BootcampimageListItemDto } from '../../../../features/models/responses/bootcampimage/bootcampimage-list-item-dto';
import { BootcampListItemDto } from '../../../../features/models/responses/bootcamp/bootcamp-list-item-dto';
import { BootcampImageService } from '../../../../features/services/concretes/bootcamp-image.service';
import { BootcampService } from '../../../../features/services/concretes/bootcamp.service';
import { PageRequest } from '../../../../core/models/page-request';
import { CreateBootcampimageRequest } from '../../../../features/models/requests/bootcampimage/create-bootcampimage-request';

@Component({
  selector: 'app-bootcamp-image',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './bootcamp-image.component.html',
  styleUrl: './bootcamp-image.component.css'
})
export class BootcampImageComponent implements OnInit {

  formMessage: string | null = null;
  bootcampImageUpdateForm: FormGroup;
  bootcampImageCreateForm:FormGroup;
  selectedBootcampImage: any;
  showUpdateModal: boolean = false;
  showCreateModal: boolean = false;
  bootcampImageList: BootcampimageListItemDto;
  bootcampList: BootcampListItemDto;

  constructor(
    private bootcampImageService:BootcampImageService, 
    private bootcampService:BootcampService,
    private formBuilder:FormBuilder,
    private change:ChangeDetectorRef
  ) {}
  
  ngOnInit(): void {
    this.loadBootcampImages();
    this.createForm();
  }

  createForm() {
    this.bootcampImageCreateForm = this.formBuilder.group({
      imagePath: ['', [Validators.required]],
      bootcampId:['',], 

      
    })
  }

  loadBootcampImages() {
    const pageRequest: PageRequest = { page: 0, pageSize: 20 };
    this.getBootcamps(pageRequest);
     this.getBootcampImages(pageRequest);  
  }
  getBootcampImages(pageRequest: PageRequest) {
    this.bootcampImageService.getList(pageRequest).subscribe(response => {
      this.bootcampImageList = response;
    });
  }
  getBootcamps(pageRequest: PageRequest) {
    this.bootcampService.getList(pageRequest).subscribe(response => {
      this.bootcampList = response;
      console.log(response);
    });
  }
  delete(id: number) {
    if (confirm('Bu uygulama durumunu silmek istediğinizden emin misiniz?')) {
      this.bootcampImageService.delete(id).subscribe({
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
    this.loadBootcampImages();
    this.formMessage = "Başarıyla Silindi";
    setTimeout(() => {
      this.formMessage = "";
    }, 3000);
  }
  add() {
    if(this.bootcampImageCreateForm.valid) {
      let bootcampImage:CreateBootcampimageRequest = Object.assign({},this.bootcampImageCreateForm.value);
      this.bootcampImageService.create(bootcampImage).subscribe({
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
          this.loadBootcampImages();
        }
        });
      }
    }
    handleCreateSuccess() {
      this.loadBootcampImages();
      this.formMessage = "Başarıyla Eklendi"; 
      setTimeout(() => {
        this.formMessage = "";
      }, 3000);
    }
    openAddModal() {
      this.bootcampImageCreateForm.reset();
      this.showCreateModal = true;
    }
    closeModal() {
      this.showUpdateModal = false;
      this.showCreateModal = false;
    }
}
