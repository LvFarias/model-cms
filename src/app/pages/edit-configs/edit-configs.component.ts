import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FileInput } from 'ngx-material-file-input';
import { MyNotifications } from 'src/app/helpers/alert';
import { HeaderService } from 'src/app/services/header.service';
import { PagesService } from 'src/app/services/pages.service';
import { SitesService } from 'src/app/services/sites.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-edit-configs',
  templateUrl: './edit-configs.component.html',
  styleUrls: ['./edit-configs.component.scss']
})
export class EditConfigsComponent implements OnInit {

  private siteId = 0;
  public configs: any = {};
  public networks: Array<any> = [
    { value: 'facebook', label: 'Facebook' },
    { value: 'instagram', label: 'Instagram' },
    { value: 'whatsapp', label: 'Whatsapp' },
    { value: 'twitter', label: 'Twitter' },
    { value: 'tiktok', label: 'Tiktok' },
    { value: 'youtube', label: 'Youtube' },
    { value: 'envelope', label: 'Email' },
  ];

  constructor(
    private route: ActivatedRoute,
    private pagesService: PagesService,
    private sitesService: SitesService,
    private myNotifications: MyNotifications,
  ) {
    this.route.params.subscribe((params: any) => {
      this.siteId = params['id'];
    });
  }

  ngOnInit(): void {
    this.getPageDetails();
  }

  public getPageDetails() {
    this.sitesService.getConfig(this.siteId).then(config => {
      console.log(config);
      this.configs = config;
    }).catch(console.log);
  }

  public saveConfigs() {
    const fileInput: FileInput = this.configs['file'];

    this.pagesService.uploadImage(fileInput.files[0]).then(url => {
      this.configs.logo = url;
      delete this.configs.file;
      this.sitesService.saveConfigs(this.siteId, this.configs).then(data => {
        this.myNotifications.toast.fire('configurações salvas com sucesso', '', 'success');
      })
    });
  }

  public async uploadImage(fileImage: any, module: any, key: string) {
    const file: FileInput = fileImage;
    module[key] = await this.toBase64(file.files[0]);
  }

  private toBase64(file: File): Promise<any> {
    return new Promise((res, rej) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => res(reader.result);
      reader.onerror = error => rej(error);
    });
  }
}
