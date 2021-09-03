import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';
import {OperType} from "../OperType";

@Component({
    selector: 'app-edit-priority-dialog',
    templateUrl: './edit-priority-dialog.component.html',
    styleUrls: ['./edit-priority-dialog.component.css']
})


export class EditPriorityDialogComponent implements OnInit {

    private dialogTitle: string;
    private priorityTitle: string;
    private operType: OperType;

    constructor(
        private dialogRef: MatDialogRef<EditPriorityDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private data: [string, string, OperType],
        private dialog: MatDialog
    ) {
    }

    ngOnInit() {
        this.priorityTitle = this.data[0];
        this.dialogTitle = this.data[1];
        this.operType = this.data[2];

    }


    private onConfirm(): void {
        this.dialogRef.close(this.priorityTitle);
    }


    private onCancel(): void {
        this.dialogRef.close(false);
    }


    private delete(): void {

        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            maxWidth: '500px',
            data: {
                dialogTitle: 'Подтвердите действие',
                message: `Вы действительно хотите удалить приоритет: "${this.priorityTitle}"? (в задачи проставится '')`
            },
            autoFocus: false
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.dialogRef.close('delete'); // нажали удалить
            }
        });


    }


    private canDelete(): boolean {
        return this.operType == OperType.EDIT;
    }
}
