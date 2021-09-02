import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {DataHandlerService} from "../../service/data-handler.service";
import {Task} from 'src/app/model/Task';
import {MatTableDataSource} from "@angular/material";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {EditTaskDialogComponent} from "../../dialog/edit-task-dialog/edit-task-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../../dialog/confirm-dialog/confirm-dialog.component";
import {Category} from "../../model/Category";
import {Priority} from "../../model/Priority";
import {OperType} from "../../dialog/OperType";

@Component({
    selector: 'app-tasks',
    templateUrl: './tasks.component.html',
    styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

    private dataSource: MatTableDataSource<Task>;



    @ViewChild(MatPaginator, {static: false}) private paginator: MatPaginator;
    @ViewChild(MatSort, {static: false}) private sort: MatSort;


    @Output()
    deleteTask = new EventEmitter<Task>();

    @Output()
    selectCategory = new EventEmitter<Category>();

    @Output()
    updateTask = new EventEmitter<Task>();

    @Output()
    filterByTitle = new EventEmitter<string>();

    @Output()
    filterByStatus = new EventEmitter<boolean>();

    @Output()
    filterByPriority = new EventEmitter<Priority>();

    @Output()
    addTask = new EventEmitter<Task>();

    // поиск
    private searchTaskText: string;
    private selectedStatusFilter: boolean = null;
    private selectedPriorityFilter: Priority = null;




    private displayedColumns: string[] = ['color', 'id', 'title', 'date', 'priority', 'category', 'operations', 'select'];

    private priorities: Priority[];
    private tasks: Task[];


    @Input('tasks')
    private set setTasks(tasks: Task[]) {
        this.tasks = tasks;
        this.fillTable();
    }

    @Input('priorities')
    set setPriorities(priorities: Priority[]) {
        this.priorities = priorities;
    }

    @Input()
    selectedCategory: Category;

    constructor(
        private dataHandler: DataHandlerService,
        private dialog: MatDialog,

    ) {
    }

    ngOnInit() {




        this.dataSource = new MatTableDataSource();
        this.fillTable();
    }




    private getPriorityColor(task: Task): string {


        if (task.completed) {
            return '#F8F9FA'; // TODO вынести цвета в константы (magic strings, magic numbers)
        }

        if (task.priority && task.priority.color) {
            return task.priority.color;
        }

        return '#fff'; // TODO вынести цвета в константы (magic strings, magic numbers)

    }


    private fillTable(): void {

        if (!this.dataSource) {
            return;
        }

        this.dataSource.data = this.tasks; // обновить источник данных (т.к. данные массива tasks обновились)

        this.addTableObjects();



        //@ts-ignore
        this.dataSource.sortingDataAccessor = (task, colName) => {


            switch (colName) {
                case 'priority': {
                    return task.priority ? task.priority.id : null;
                }
                case 'category': {
                    return task.category ? task.category.title : null;
                }
                case 'date': {
                    return task.date ? task.date : null;
                }

                case 'title': {
                    return task.title;
                }
            }
        };


    }

    private addTableObjects(): void {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    }


    private openEditTaskDialog(task: Task): void {


        const dialogRef = this.dialog.open(EditTaskDialogComponent, {
            data: [task, 'Редактирование задачи', OperType.EDIT],
            autoFocus: false
        });

        dialogRef.afterClosed().subscribe(result => {


            if (result === 'complete') {
                task.completed = true;
                this.updateTask.emit(task);
            }


            if (result === 'activate') {
                task.completed = false;
                this.updateTask.emit(task);
                return;
            }

            if (result === 'delete') {
                this.deleteTask.emit(task);
                return;
            }

            if (result as Task) {
                this.updateTask.emit(task);
                return;
            }

        });
    }



    private openDeleteDialog(task: Task) {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            maxWidth: '500px',
            data: {
                dialogTitle: 'Подтвердите действие',
                message: `Вы действительно хотите удалить задачу: "${task.title}"?`
            },
            autoFocus: false
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) { // если нажали ОК
                this.deleteTask.emit(task);
            }
        });
    }

    private onToggleStatus(task: Task) {
        task.completed = !task.completed;
        this.updateTask.emit(task);
    }


    private onSelectCategory(category: Category) {
        this.selectCategory.emit(category);
    }


    private onFilterByTitle() {
        this.filterByTitle.emit(this.searchTaskText);
    }


    private onFilterByStatus(value: boolean) {


        if (value !== this.selectedStatusFilter) {
            this.selectedStatusFilter = value;
            this.filterByStatus.emit(this.selectedStatusFilter);
        }
    }



    private onFilterByPriority(value: Priority) {


        if (value !== this.selectedPriorityFilter) {
            this.selectedPriorityFilter = value;
            this.filterByPriority.emit(this.selectedPriorityFilter);
        }
    }


    private openAddTaskDialog() {


        const task = new Task(null, '', false, null, this.selectedCategory);

        const dialogRef = this.dialog.open(EditTaskDialogComponent, {data: [task, 'Добавление задачи', OperType.ADD]});

        dialogRef.afterClosed().subscribe(result => {
            if (result) { // если нажали ОК и есть результат
                this.addTask.emit(task);
            }
        });

    }


}
