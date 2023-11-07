import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MenubarModule } from 'primeng/menubar';

@NgModule({
  declarations: [NavbarComponent],
  imports: [CommonModule, ToastModule, MenubarModule],
  providers: [MessageService],
  exports: [NavbarComponent],
})
export class CoreModule {}
