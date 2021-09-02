import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';
import {OperType} from "../OperType";


@Component({
    selector: 'app-edit-category-dialog',
    templateUrl: './edit-category-dialog.component.html',
    styleUrls: ['./edit-category-dialog.component.css']
})

export class EditCategoryDialogComponent implements OnInit {

    private dialogTitle: string;
    private categoryTitle: string;
    private operType: OperType;

    constructor(
        private dialogRef: MatDialogRef<EditCategoryDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private data: [string, string, OperType],
        private dialog: MatDialog
    ) {
    }

    ngOnInit() {


        this.categoryTitle = this.data[0];
        this.dialogTitle = this.data[1];
        this.operType = this.data[2];

    }


    private onConfirm() {
        this.dialogRef.close(this.categoryTitle);
    }


    private onCancel() {
        this.dialogRef.close(false);
    }


    private delete() {

        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            maxWidth: '500px',
            data: {
                dialogTitle: 'Подтвердите действие',
                message: `Вы действительно хотите удалить категорию: "${this.categoryTitle}"? (сами задачи не удаляются)`
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
        return this.operType === OperType.EDIT;
    }
}
