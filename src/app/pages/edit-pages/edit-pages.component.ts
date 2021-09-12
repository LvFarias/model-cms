import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FileInput } from 'ngx-material-file-input';
import { MyNotifications } from 'src/app/helpers/alert';
import { HeaderService } from 'src/app/services/header.service';
import { PagesService } from 'src/app/services/pages.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-edit-pages',
  templateUrl: './edit-pages.component.html',
  styleUrls: ['./edit-pages.component.scss']
})
export class EditPagesComponent implements OnInit {

  private pageId = 0;
  public listDevices: Array<String> = ['desktop-frame', 'mobile-frame'];
  public inputTypes: Array<any> = [
    { alias: 'text', name: 'Normal' },
    { alias: 'number', name: 'Numero' },
    { alias: 'data', name: 'Data' },
    { alias: 'email', name: 'Email' },
    { alias: 'tel', name: 'Telefone' },
    { alias: 'textarea', name: 'Texto' },
  ];
  public modules: Array<any> = [];

  public imageForm: FormGroup = new FormGroup({
    image: new FormControl(''),
  });

  constructor(
    private route: ActivatedRoute,
    private storage: StorageService,
    private pagesService: PagesService,
    private headerService: HeaderService,
		private myNotifications: MyNotifications,
  ) {
    this.route.params.subscribe((params: any) => {
      this.pageId = params['id'];
    });
    const user = JSON.parse(this.storage.get('user') || '{}');
  }

  ngOnInit(): void {
    this.getPageDetails();
  }

  public getPageDetails() {
    this.pagesService.getById(this.pageId).then(page => {
      console.log(page);
      this.modules = page.modules;
      this.headerService.seHeaderTitle(`Editando ${page.title}`);
    }).catch(console.log);
  }

  public async uploadImage(fileImage: any, module: any, key: string) {
    const file: FileInput = fileImage;
    module[key] = await this.toBase64(file.files[0]);
  }

  public async saveGenericImageModule(module: any, fileFinalKey: string = 'image') {
    const fileInput: FileInput = module['file'];
    if (!!fileInput) {
      const url = await this.pagesService.uploadImage(fileInput.files[0]);
      module[fileFinalKey] = url;
      delete module['file'];
      this.saveGenericModule(module);
    } else {
      this.saveGenericModule(module);
    }
  }

  public saveGenericModule(module: any) {
    this.pagesService.editModule(module.id, module).then(res => {
      this.myNotifications.toast.fire('Modulo salvo com sucesso', '', 'success');
    });
  }

  public async saveListModuleWithImage(module: any, arrayKey: string, fileFinalKey: string = 'image') {
    for (const i in module[arrayKey]) {
      const item = module[arrayKey][i];
      const fileInput: FileInput = item['file'];
      if (!!fileInput) {
        const url = await this.pagesService.uploadImage(fileInput.files[0]);
        module[arrayKey][i][fileFinalKey] = url;
        delete module[arrayKey][i]['file'];
      }
    }

    this.saveGenericModule(module);
  }

  public async savePostsModule(module: any) {
    for (const i in module.posts) {
      const item = module.posts[i];
      const fileLogoInput: FileInput = item['logoFile'];
      if (!!fileLogoInput) {
        const url = await this.pagesService.uploadImage(fileLogoInput.files[0]);
        module.posts[i].logo = url;
        delete module.posts[i]['logoFile'];
      }
      const fileInput: FileInput = item['file'];
      if (!!fileInput) {
        const url = await this.pagesService.uploadImage(fileInput.files[0]);
        module.posts[i].image = url;
        delete module.posts[i]['file'];
      }
    }

    this.saveGenericModule(module);
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
