import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {Task} from '../../model/Task';
import {Priority} from '../../model/Priority';
import {Category} from '../../model/Category';
import {DataHandlerService} from '../../service/data-handler.service';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';
import {OperType} from "../OperType";

@Component({
  selector: 'app-edit-task-dialog',
  templateUrl: './edit-task-dialog.component.html',
  styleUrls: ['./edit-task-dialog.component.css']
})


export class EditTaskDialogComponent implements OnInit {

  private tmpCategory: Category;

  private categories: Category[];
  private priorities: Priority[];

  private dialogTitle: string;
  private task: Task;
  private operType: OperType;



  private tmpTitle: string;
  private tmpPriority: Priority;
  private tmpDate: Date;

  constructor(
      private dialogRef: MatDialogRef<EditTaskDialogComponent>,
      @Inject(MAT_DIALOG_DATA) private data: [Task, string, OperType],
      private dataHandler: DataHandlerService,
      private dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.task = this.data[0];
    this.dialogTitle = this.data[1];
    this.operType = this.data[2];



    this.tmpTitle = this.task.title;
    this.tmpPriority = this.task.priority;
    this.tmpCategory = this.task.category;
    this.tmpDate = this.task.date;


    this.dataHandler.getAllCategories().subscribe(items => this.categories = items);
    this.dataHandler.getAllPriorities().subscribe(items => this.priorities = items);

  }

  private onConfirm(): void {


    this.task.title = this.tmpTitle;
    this.task.priority = this.tmpPriority;
    this.task.category = this.tmpCategory;
    this.task.date = this.tmpDate;




    this.dialogRef.close(this.task);

  }


  private onCancel(): void {
    this.dialogRef.close(null);
  }


  private delete(): void {

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      data: {
        dialogTitle: 'Подтвердите действие',
        message: `Вы действительно хотите удалить задачу: "${this.task.title}"?`
      },
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dialogRef.close('delete'); // нажали удалить
      }
    });
  }


  private complete(): void {
    this.dialogRef.close('complete');

  }


  private activate(): void {
    this.dialogRef.close('activate');
  }

  private canDelete(): boolean {
    return this.operType === OperType.EDIT;
  }

  private canActivateDesactivate(): boolean {
    return this.operType === OperType.EDIT;
  }
}
