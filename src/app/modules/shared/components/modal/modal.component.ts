import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  @Input() visibility = false;
  @Output() closeFn = new EventEmitter<any>();
  @Input() title!: string;

  close() {
    if (this.closeFn) {
      this.closeFn.emit();
    }
  }
}
