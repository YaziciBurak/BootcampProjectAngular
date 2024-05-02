import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BlackListListItemDto } from '../../../../features/models/responses/blacklist/blacklist-list-item-item-dto';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BlacklistService } from '../../../../features/services/concretes/blacklist.service';
import { PageRequest } from '../../../../core/models/page-request';
import { UpdateBlacklistRequest } from '../../../../features/models/requests/blacklist/update-blacklistre-quest';

@Component({
  selector: 'app-blacklist',
  standalone: true,
  imports: [CommonModule,HttpClientModule,RouterModule,ReactiveFormsModule],
  templateUrl: './blacklist.component.html',
  styleUrl: './blacklist.component.css'
})
export class BlacklistComponent implements OnInit{
  formMessage: string | null = null;
  blacklistForm: FormGroup;
  selectedBlacklist: any;
  showUpdateModal: boolean = false;
  
  blacklistList: BlackListListItemDto;

  constructor(
    private blacklistService: BlacklistService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loadApplicationStates();
    this.updateForm();
  }

  updateForm() {
    this.blacklistForm = this.formBuilder.group({
      reason: ['', [Validators.required]]
    });
  }

  loadApplicationStates() {
    const pageRequest: PageRequest = { page: 0, pageSize: 20 };
    this.getBlacklists(pageRequest);
  }

  getBlacklists(pageRequest: PageRequest) {
    this.blacklistService.getList(pageRequest).subscribe(response => {
      this.blacklistList = response;
    });
  }

  delete(id: number) {
    if (confirm('Bu uygulama durumunu silmek istediğinizden emin misiniz?')) {
      this.blacklistService.delete(id).subscribe({
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
    this.formMessage = "Başarıyla Silindi";
    setTimeout(() => {
      this.formMessage = "";
    }, 3000);
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
        next: (response) => {
            this.showUpdateModal = false; // Modal'ı kapat
            this.loadApplicationStates(); // Verileri yeniden getir
        },
        error: (error) => {
            console.error('Güncelleme işlemi başarısız:', error);
        }
    });
}

  openUpdateModal(blacklist: any) {
    this.blacklistService.getById(blacklist.id).subscribe({
      next: (response) => {
        // Backend'den gelen verileri formda kullan
        this.selectedBlacklist = { ...response };
        this.blacklistForm.patchValue({ reason: this.selectedBlacklist.reason }); // Modal içindeki formu güncelle
        this.showUpdateModal = true; // Modal'ı aç
        return blacklist.id;
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
