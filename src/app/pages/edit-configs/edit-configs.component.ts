import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FileInput } from 'ngx-material-file-input';
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
  public configs: Array<any> = [];
  public networks: Array<string> = ['facebook','instagram','whatsapp','twitter','tiktok','youtube'];

  constructor(
    private route: ActivatedRoute,
    private sitesService: SitesService,
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
    this.sitesService.saveConfigs(this.siteId, this.configs).then(data => {
      console.log(data);
    })
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
