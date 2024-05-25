import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BlackListListItemDto } from '../../../../features/models/responses/blacklist/blacklist-list-item-item-dto';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BlacklistService } from '../../../../features/services/concretes/blacklist.service';
import { PageRequest } from '../../../../core/models/page-request';
import { UpdateBlacklistRequest } from '../../../../features/models/requests/blacklist/update-blacklistre-quest';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-blacklist',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule, ReactiveFormsModule],
  templateUrl: './blacklist.component.html',
  styleUrl: './blacklist.component.css'
})
export class BlacklistComponent implements OnInit {
  formMessage: string | null = null;
  blacklistForm: FormGroup;
  selectedBlacklist: any;
  showUpdateModal: boolean = false;

  blacklistList: BlackListListItemDto;

  constructor(
    private blacklistService: BlacklistService,
    private formBuilder: FormBuilder,
    private toastr:ToastrService
  ) { }

  ngOnInit(): void {
    this.loadBlacklist();
    this.updateForm();
  }

  updateForm() {
    this.blacklistForm = this.formBuilder.group({
      reason: ['', [Validators.required]]
    });
  }

  loadBlacklist() {
    const pageRequest: PageRequest = { pageIndex: 0, pageSize: 20 };
    this.getBlacklists(pageRequest);
  }

  getBlacklists(pageRequest: PageRequest) {
    this.blacklistService.getList(pageRequest).subscribe(response => {
      this.blacklistList = response;
    });
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
        this.blacklistService.delete(id).subscribe({
          next: () => {
            this.toastr.success('Silme işlemi başarılı!');
            this.loadBlacklist();
          },
          error: (error) => {
            this.toastr.error('Silme işlemi başarısız!', error);
          },
        });
      }
    });
  }
  update() {
    const id = this.selectedBlacklist.id;
    const currentApplicantId = this.selectedBlacklist.applicantId;
    const currentDate = this.selectedBlacklist.date;
    const updatedReason = this.blacklistForm.value.reason;

    const request: UpdateBlacklistRequest = {
      id: id,
      applicantId: currentApplicantId,
      date: currentDate,
      reason: updatedReason
    };

    this.blacklistService.update(request).subscribe({
      next: () => {
        this.showUpdateModal = false; // Modal'ı kapat
        this.loadBlacklist(); // Verileri yeniden getir
        this.toastr.success("Güncelleme başarılı!");
      },
      error: (error) => {
        this.toastr.error('Güncelleme işlemi başarısız:', error);
      }
    });
  }

  openUpdateModal(blacklist: any) {
    this.blacklistService.getById(blacklist.id).subscribe({
      next: (response) => {
        this.selectedBlacklist = { ...response };
        this.blacklistForm.patchValue({ reason: this.selectedBlacklist.reason });
        this.showUpdateModal = true; // Modal'ı aç
        return blacklist.id;
      },
      error: (error) => {
        this.toastr.error('Veri getirme işlemi başarısız:', error);
      }
    });
  }
  closeUpdateModal() {
    this.showUpdateModal = false;
  }
}
