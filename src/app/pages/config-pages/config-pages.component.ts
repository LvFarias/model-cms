import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PagesService } from 'src/app/services/pages.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-config-pages',
  templateUrl: './config-pages.component.html',
  styleUrls: ['./config-pages.component.scss']
})
export class ConfigPagesComponent implements OnInit {

  public page = 1;
  public count = 0;
  public list = [];
  public columns = [
    {
      title: 'Site',
      attr: 'siteName',
      type: 'text',
    }, {
      title: 'Nome',
      attr: 'name',
      type: 'text',
    }, {
      title: 'Link',
      attr: 'route',
      type: 'link',
    }, {
      title: 'Data de Criação',
      attr: 'createdAt',
      type: 'date',
    }, {
      title: 'Editar',
      attr: 'edit',
      function: (page: any) => this.editSite(page),
      type: 'button',
    }
  ];
  public displayedColumns = this.columns.map(column => column.attr);

  constructor(
    private router: Router,
    private pagesService: PagesService,
  ) { }

  ngOnInit(): void {
    this.getList();
  }

  public getList() {
    this.pagesService.list(this.page).then(result => {
      this.list = result.rows.map((row: any) => {
        row.siteName = row.Site.name;
        return row;
      });
      this.count = result.count;
      if (this.count < 2) {
        this.columns = this.columns.filter(column => column.attr !== 'delete');
        this.displayedColumns = this.columns.map(column => column.attr);
      }
    })
  }

  public editSite(page: any) {
    this.router.navigateByUrl(`/pages/${page.id}`);
  }

  public removeSite(page: any) {
    console.log(page);
  }

}
