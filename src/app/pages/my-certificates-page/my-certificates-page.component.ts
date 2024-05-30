import { Component, OnInit } from '@angular/core';
import { CertificateListItemDto } from '../../features/models/responses/certificate/certificate-list-item-dto';
import { AuthService } from '../../features/services/concretes/auth.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PageRequest } from '../../core/models/page-request';
import { CertificateService } from '../../features/services/concretes/certificate.service';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { formatDate1 } from '../../core/helpers/format-date';
import { CreateCertificateResponse } from '../../features/models/responses/certificate/create-certificate-response';

@Component({
  selector: 'app-my-certificates-page',
  standalone: true,
  imports: [CommonModule, RouterModule, SharedModule],
  templateUrl: './my-certificates-page.component.html',
  styleUrl: './my-certificates-page.component.css',
})
export class MyCertificatesPageComponent implements OnInit {
  formatDate = formatDate1;
  createdCertificate: CreateCertificateResponse;
  certificateList: CertificateListItemDto = {
    index: 0,
    size: 0,
    count: 0,
    hasNext: false,
    hasPrevious: false,
    pages: 0,
    items: [],
  };
  constructor(
    private authService: AuthService,
    private certificateService: CertificateService,
    private activatedRoute: ActivatedRoute
  ) {}
  readonly PAGE_SIZE = 15;
  ngOnInit(): void {
    this.getByApplicantId({ pageIndex: 0, pageSize: this.PAGE_SIZE });
  }
  getList(pageRequest: PageRequest) {
    this.certificateService.getList(pageRequest).subscribe((response) => {
      this.certificateList = response;
    });
  }

  getByApplicantId(pageRequest: PageRequest) {
    this.certificateService
      .getByApplicantId(pageRequest)
      .subscribe((response) => {
        this.certificateList = response;
      });
  }

  downloadCertificate(applicantId: string, bootcampId: number) {
    this.certificateService
      .create({ applicantId, bootcampId })
      .subscribe((response) => {
        console.log(response);

        // sertifikayı indir
        // burada DOM'da bir <a></a> elementi yaratıp
        // click ettiriyoruz ki dosya insin
        const url = window.URL.createObjectURL(response.content);
        const a = document.createElement('a');
        a.href = url;
        a.download = response.filename;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      });
  }
}
