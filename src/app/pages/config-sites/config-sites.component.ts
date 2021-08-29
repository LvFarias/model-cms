import { Component, OnInit } from '@angular/core';
import { SitesService } from 'src/app/services/sites.service';

@Component({
  selector: 'app-config-sites',
  templateUrl: './config-sites.component.html',
  styleUrls: ['./config-sites.component.scss']
})
export class ConfigSitesComponent implements OnInit {

  public page = 1;
  public count = 0;
  public list = [];
  public columns = [
    {
      title: 'Usuario',
      attr: 'userName',
      type: 'text',
    }, {
      title: 'Nome',
      attr: 'name',
      type: 'text',
    }, {
      title: 'Domínio',
      attr: 'route',
      type: 'link',
    }, {
      title: 'Data de Criação',
      attr: 'createdAt',
      type: 'date',
    }, {
      title: 'Editar',
      attr: 'edit',
      function: this.editSite,
      type: 'button',
    }, {
      title: 'Remover',
      attr: 'delete',
      function: this.removeSite,
      type: 'button',
    }
  ];
  public displayedColumns = this.columns.map(column => column.attr);

  constructor(
    private sitesService: SitesService,
  ) { }

  ngOnInit(): void {
    this.getList();
  }

  public getList() {
    this.sitesService.list(this.page).then(result => {
      this.list = result.rows;
      this.count = result.count;
    })
  }

  public editSite(user: any) {
    console.log(user);
  }

  public removeSite(user: any) {
    console.log(user);
  }

}