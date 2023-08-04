// import { Component, AfterViewInit } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FileUploadService } from 'src/app/service/file-upload.service';
import { FileUpload } from 'src/app/interface/file-upload';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';


@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.css']
})
export class NotificacionesComponent implements OnInit {
  selectedFiles?: FileList;
  currentFileUpload?: FileUpload;
  percentage = 0;

  constructor(private uploadService: FileUploadService) { }

  ngOnInit(): void {
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  upload(): void {
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      this.selectedFiles = undefined;

      if (file) {
        this.currentFileUpload = new FileUpload(file);
        this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(
          percentage => {
            this.percentage = Math.round(percentage ? percentage : 0);
          },
          error => {
            console.log(error);
          }
        );
      }
    }
  }

  downloadAttachment() {
    // name: string, url: string
    const link = document.createElement('a');
    link.download = 'HORA32 21-07-2023.pdf';
    link.href = 'https://firebasestorage.googleapis.com/v0/b/reporting-6633e.appspot.com/o/pdfs%2FHORA32%2021-07-2023.pdf?alt=media&token=49a2e2f3-5f8b-4c85-83ef-9578ab2b71a1';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  selectFile_upload(event: any){
    this.selectedFiles = event.target.files;
    this.upload();
  }
}
