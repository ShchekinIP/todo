import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Component, Inject, OnInit} from '@angular/core';

@Component({
    selector: 'app-confirm-dialog',
    templateUrl: './confirm-dialog.component.html',
    styleUrls: ['./confirm-dialog.component.css']
})

export class ConfirmDialogComponent implements OnInit {
    private dialogTitle: string;
    private message: string;

    constructor(
        private dialogRef: MatDialogRef<ConfirmDialogComponent>, // для работы с текущим диалог. окном
        @Inject(MAT_DIALOG_DATA) private data: { dialogTitle: string, message: string } // данные, которые передали в диалоговое окно
    ) {
        this.dialogTitle = data.dialogTitle;
        this.message = data.message;
    }

    ngOnInit() {
    }


    private onConfirm(): void {
        this.dialogRef.close(true);
    }


    private onCancel(): void {
        this.dialogRef.close(false);
    }
}

