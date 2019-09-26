import { Component, OnInit } from '@angular/core';
import { AccountService } from 'app/core';
import { CommandService } from 'app/entities/command';
import { ICommand } from 'app/shared/model/command.model';

@Component({
  selector: 'jhi-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  orders: ICommand[];

  constructor(private accountService: AccountService, private commandService: CommandService) {
    //
  }

  ngOnInit() {
    this.commandService
      .history(this.accountService.userIdentityId)
      .then(history => {
        console.log(history);
        this.orders = history;
      })
      .catch(error => console.log(error));
  }
}
