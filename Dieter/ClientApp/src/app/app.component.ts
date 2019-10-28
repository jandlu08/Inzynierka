import {Component} from '@angular/core';
import {Observable} from "rxjs";
import {User, UsersGQL, UsersQuery, UsersQueryVariables} from "../generated/graphql";
import {map} from "rxjs/operators";
import {QueryRef} from "apollo-angular";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  users: User[];
  queryRef: QueryRef<UsersQuery,UsersQueryVariables>;



  constructor(usersGQL: UsersGQL) {
    this.queryRef = usersGQL.watch();
    this.queryRef.valueChanges.subscribe(result => {
      this.users = result.data.getUsers;
    })
  }


}
