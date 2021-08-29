import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  public page = 1;
  public count = 0;
  public list = [];
  public columns = [
    {
      title: 'Nome',
      attr: 'name',
      type: 'text',
    }, {
      title: 'Email',
      attr: 'email',
      type: 'text',
    }, {
      title: 'Data de Criação',
      attr: 'createdAt',
      type: 'date',
    }, {
      title: 'Tipo',
      attr: 'type',
      type: 'text',
    }, {
      title: 'Editar',
      attr: 'edit',
      function: this.editUser,
      type: 'button',
    }, {
      title: 'Remover',
      attr: 'delete',
      function: this.removeUser,
      type: 'button',
    }
  ];
  public displayedColumns = this.columns.map(column => column.attr);

  constructor(
    private usersService: UsersService,
  ) { }

  ngOnInit(): void {
    this.getList();
  }

  public getList() {
    this.usersService.list(this.page).then(result => {
      this.list = result.rows;
      this.count = result.count;
    })
  }

  public editUser(user: any) {
    console.log(user);
  }

  public removeUser(user: any) {
    console.log(user);
  }

}
