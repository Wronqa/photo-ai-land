import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MenubarModule } from 'primeng/menubar';
import { SpinnerComponent } from '../shared/components/spinner/spinner.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  declarations: [NavbarComponent, SearchBarComponent],
  imports: [
    CommonModule,
    ToastModule,
    MenubarModule,
    SharedModule,
    FormsModule,
    InputTextModule,
    ReactiveFormsModule,
  ],
  providers: [MessageService],
  exports: [NavbarComponent],
})
export class CoreModule {}
