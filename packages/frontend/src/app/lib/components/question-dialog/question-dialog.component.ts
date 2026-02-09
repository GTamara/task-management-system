import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

export interface DialogData {
    header?: string;
    text: string;
    confirm?: string;
    hideCancelButton?: boolean;
}

@Component({
    templateUrl: './question-dialog.component.html',
    imports: [
      MatDialogModule,
      MatButtonModule,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionDialogComponent {

  readonly dialog = inject(MatDialog);
  dialogRef = inject( MatDialogRef<QuestionDialogComponent>);
  data = inject<DialogData>(MAT_DIALOG_DATA);

  confirm(): void {
    this.dialogRef.close(true);
  }

  cancel(): void {
    this.dialogRef.close(false);
  }
}
