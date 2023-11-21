import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { MessageService, SharedModule } from 'primeng/api';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MenubarModule } from 'primeng/menubar';
import { SpinnerComponent } from '../shared/components/spinner/spinner.component';

@NgModule({
  declarations: [NavbarComponent],
  imports: [CommonModule, ToastModule, MenubarModule, SharedModule],
  providers: [MessageService],
  exports: [NavbarComponent],
})
export class CoreModule {}
