import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FileInput } from 'ngx-material-file-input';
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
  public modules: Array<any> = [];

  public imageForm: FormGroup = new FormGroup({
    image: new FormControl(''),
  });

  constructor(
    private route: ActivatedRoute,
    private storage: StorageService,
    private pagesService: PagesService,
    private headerService: HeaderService,
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

  public saveBannerModule(module: any) {
    const fileInput: FileInput = module['file'];
    this.pagesService.uploadImage(fileInput.files[0]).then(url => {
      module.backgroundImage = url;
      delete module['file'];
      this.pagesService.editModule(module.id, module).then(res => {
        console.log(res);
      });
    });
  }

  public saveTextModule(module: any) {
    const fileInput: FileInput = module['file'];
    if (!!fileInput) {
      this.pagesService.uploadImage(fileInput.files[0]).then(url => {
        module.image = url;
        delete module['file'];
        this.pagesService.editModule(module.id, module).then(res => {
          console.log(res);
        });
      });
    } else {
      this.pagesService.editModule(module.id, module).then(res => {
        console.log(res);
      });
    }
  }

  public async saveProdutsModule(module: any) {
    for (const i in module.list) {
      const item = module.list[i];
      const fileInput: FileInput = item['file'];
      if (!!fileInput) {
        const url = await this.pagesService.uploadImage(fileInput.files[0]);
        module.list[i].image = url;
        delete module.list[i]['file'];
      }
    }

    this.pagesService.editModule(module.id, module).then(res => {
      console.log(res);
    });
  }

  public async saveImageModule(module: any) {
    for (const i in module.images) {
      const item = module.images[i];
      const fileInput: FileInput = item['file'];
      if (!!fileInput) {
        const url = await this.pagesService.uploadImage(fileInput.files[0]);
        module.images[i].src = url;
        delete module.images[i]['file'];
      }
    }

    this.pagesService.editModule(module.id, module).then(res => {
      console.log(res);
    });
  }

  public async savePostModule(module: any) {
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

    this.pagesService.editModule(module.id, module).then(res => {
      console.log(res);
    });
  }

  public async saveFeedbackModule(module: any) {
    this.pagesService.editModule(module.id, module).then(res => {
      console.log(res);
    });
  }

  private toBase64(file: File): Promise<any> {
    return new Promise((res, rej) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => res(reader.result);
      reader.onerror = error => rej(error);
    });
  }

  public editSite(user: any) {
    console.log(user);
  }

  public removeSite(user: any) {
    console.log(user);
  }

}
