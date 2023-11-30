import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { UserService } from '../../services/user.service';
import { IUser } from 'src/app/modules/shared/interfaces/user.interface';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {
  protected value!: FormControl;
  protected users: IUser[] = [];

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {
    this.value = this.fb.control('');

    this.value.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((val) => {
        this.searchUser(val);
      });
  }

  searchUser(username: string) {
    this.userService.searchUser(username).subscribe({
      next: (res) => {
        this.users = res;
      },
      error: () => (this.users = []),
    });
  }

  clearTable() {
    this.users = [];
  }
}
