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
import { EditorModule } from '@tinymce/tinymce-angular';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bootcamp-contents',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, EditorModule],
  templateUrl: './bootcamp-contents.component.html',
  styleUrl: './bootcamp-contents.component.css'
})
export class BootcampContentsComponent implements OnInit {
  formMessage: string | null = null;
  bootcampContentUpdateForm: FormGroup;
  bootcampContentCreateForm: FormGroup;
  selectedBootcampContent: any;
  showUpdateModal: boolean = false;
  showCreateModal: boolean = false;
  bootcampList: BootcampListItemDto;
  bootcampContentList: BootcampcontentListItemDto;

  constructor(
    private bootcampContentService: BootcampContentService,
    private bootcampService: BootcampService,
    private formBuilder: FormBuilder,
    private change: ChangeDetectorRef,
    private toastr:ToastrService
  ) { }
  ngOnInit(): void {
    this.loadBootcampContent();
    this.updateForm();
    this.createForm();
  }

  loadBootcampContent() {
    const pageRequest: PageRequest = { pageIndex: 0, pageSize: 30 };
    this.getBootcampContents(pageRequest);
    this.getBootcamps(pageRequest);
  }
  updateForm() {
    this.bootcampContentUpdateForm = this.formBuilder.group({
      bootcampId: ['', [Validators.required]],
      videoUrl: ['', [Validators.required]],
      content: ['', [Validators.required]]
    });
  }
  createForm() {
    this.bootcampContentCreateForm = this.formBuilder.group({
      bootcampId: ['', [Validators.required]],
      videoUrl: ['', [Validators.required]],
      content: ['', [Validators.required]]
    });
  }
  getBootcampContents(pageRequest: PageRequest) {
    this.bootcampContentService.getList(pageRequest).subscribe(response => {
      this.bootcampContentList = response;
    });
  }
  getBootcamps(pageRequest: PageRequest) {
    this.bootcampService.getList(pageRequest).subscribe(response => {
      this.bootcampList = response;
    })
  }
  delete(id: number) {
    Swal.fire({
      title: 'Emin misiniz?',
      text: "Bu veriyi silmek istediğinizden emin misiniz?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Evet, sil!',
      cancelButtonText: 'İptal',
    }).then((result) => {
      if (result.isConfirmed) {
        this.bootcampContentService.delete(id).subscribe({
          next: () => {
            this.toastr.success('Silme işlemi başarılı!');
            this.loadBootcampContent();
          },
          error: (error) => {
            this.toastr.error('Silme işlemi başarısız!', error);
          },
        });
      }
    });
  }
  add() {
    if (this.bootcampContentCreateForm.valid) {
      let bootcampcontent: CreateBootcampcontentRequest = Object.assign({}, this.bootcampContentCreateForm.value);
      this.bootcampContentService.create(bootcampcontent).subscribe({
        next: () => {
        },
        error: (error) => {
          this.toastr.error("Eklenemedi",error);
          this.change.markForCheck();
        },
        complete: () => {
          this.toastr.success("Başarıyla eklendi!");
          this.change.markForCheck();
          this.closeModal();
          this.loadBootcampContent();
        }
      });
    }
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
      next: () => {
        this.closeModal(); // Modal'ı kapat
        this.loadBootcampContent(); // Verileri yeniden getir
        this.toastr.success("Güncelleme başarılı!");
      },
      error: (error) => {
        this.toastr.error('Güncelleme işlemi başarısız:', error);
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
        this.toastr.error('Veri getirme işlemi başarısız:', error);
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
