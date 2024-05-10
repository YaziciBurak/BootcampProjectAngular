import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BootcampContentService } from '../../../../features/services/concretes/bootcamp-content.service';
import { BootcampcontentListItemDto } from '../../../../features/models/responses/bootcampcontent/bootcampcontent-list-item-dto';
import { PageRequest } from '../../../../core/models/page-request';
import { CreateBootcampcontentRequest } from '../../../../features/models/requests/bootcampcontent/create-bootcampcontent-request';
import { UpdateBootcampcontentRequest } from '../../../../features/models/requests/bootcampcontent/update-bootcampcontent-request';
import { BootcampListItemDto } from '../../../../features/models/responses/bootcamp/bootcamp-list-item-dto';
import { BootcampService } from '../../../../features/services/concretes/bootcamp.service';

@Component({
  selector: 'app-bootcamp-contents',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './bootcamp-contents.component.html',
  styleUrl: './bootcamp-contents.component.css'
})
export class BootcampContentsComponent implements OnInit{
  formMessage:string | null = null;
  bootcampContentUpdateForm: FormGroup;
  bootcampContentCreateForm:FormGroup;
  selectedBootcampContent: any;
  showUpdateModal: boolean = false;
  showCreateModal: boolean = false;
  bootcampList:BootcampListItemDto;
  bootcampContentList:BootcampcontentListItemDto;

  constructor(
    private bootcampContentService:BootcampContentService, 
    private bootcampService:BootcampService,
    private formBuilder:FormBuilder, 
    private change:ChangeDetectorRef,
  ) {}
  ngOnInit(): void {
    this.loadBootcampContent();
    this.updateForm();
    this.createForm();
  }

  loadBootcampContent() {
    const pageRequest: PageRequest = {page:0, pageSize:30};
    this.getBootcampContents(pageRequest);
    this.getBootcamps(pageRequest);
  }
  updateForm() {
    this.bootcampContentUpdateForm = this.formBuilder.group({
      bootcampId:['' ,[Validators.required]],
      videoUrl: ['',[Validators.required]],
      content: ['',[Validators.required]]
    });
  }
  createForm() {
    this.bootcampContentCreateForm = this.formBuilder.group({
      bootcampId:['' ,[Validators.required]],
      videoUrl: ['',[Validators.required]],
      content: ['',[Validators.required]]
    });
  }
  getBootcampContents(pageRequest: PageRequest) {
    this.bootcampContentService.getList(pageRequest).subscribe(response => {
      this.bootcampContentList = response;
    });
  }
  getBootcamps(pageRequest:PageRequest) {
    this.bootcampService.getList(pageRequest).subscribe(response => {
      this.bootcampList = response;
    })
  }
  delete(id: number) {
    if (confirm('Bu uygulama durumunu silmek istediğinizden emin misiniz?')) {
      this.bootcampContentService.delete(id).subscribe({
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
    this.loadBootcampContent();
    this.formMessage = "Başarıyla Silindi";
    setTimeout(() => {
      this.formMessage = "";
    }, 3000);
  }
  add() {
    if(this.bootcampContentCreateForm.valid) {
      let bootcampcontent:CreateBootcampcontentRequest = Object.assign({},this.bootcampContentCreateForm.value);
      this.bootcampContentService.create(bootcampcontent).subscribe({
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
          this.loadBootcampContent();
        }
        });
      }
    }
    handleCreateSuccess() {
      this.loadBootcampContent();
      this.formMessage = "Başarıyla Eklendi"; 
      setTimeout(() => {
        this.formMessage = "";
      }, 3000);
    }
    update() {
      const id = this.selectedBootcampContent.id;
      const bootcampId = this.bootcampContentUpdateForm.value.bootcampId;
      const videoUrl = this.bootcampContentUpdateForm.value.videoUrl;
      const content = this.bootcampContentUpdateForm.value.content;
     
      const request: UpdateBootcampcontentRequest = {
        id: id,
        bootcampId: bootcampId,
        videoUrl: videoUrl,
        content: content
      };
      this.bootcampContentService.update(request).subscribe({
        next: (response) => {
            this.closeModal(); // Modal'ı kapat
            this.loadBootcampContent(); // Verileri yeniden getir
        },
        error: (error) => {
            console.error('Güncelleme işlemi başarısız:', error);
        }
    });
  }
  openUpdateModal(application: any) {
    this.bootcampContentService.getById(application.id).subscribe({
      next: (response) => {
        this.selectedBootcampContent = { ...response };
        this.bootcampContentUpdateForm.patchValue({ 
          id: this.selectedBootcampContent.id,
          bootcampId: this.selectedBootcampContent.bootcampId,
          videoUrl: this.selectedBootcampContent.videoUrl,
          content: this.selectedBootcampContent.content
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
      this.bootcampContentCreateForm.reset();
      this.showCreateModal = true;
    }
    closeModal() {
      this.showUpdateModal = false;
      this.showCreateModal = false;
    }
}
