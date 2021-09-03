import {Component, OnInit} from '@angular/core';
import {DataHandlerService} from "./service/data-handler.service";
import {Task} from './model/Task';
import {Category} from "./model/Category";
import {Priority} from "./model/Priority";
import {zip} from "rxjs";

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styles: []
})
export class AppComponent implements OnInit {

    private title = 'Todo';
    private tasks: Task[];
    private categories: Category[]; // все категории
    private priorities: Priority[]; // все приоритеты


    private totalTasksCountInCategory: number;
    private completedCountInCategory: number;
    private uncompletedCountInCategory: number;
    private uncompletedTotalTasksCount: number;


    private showStat = true;


    private selectedCategory: Category = null;


    private searchTaskText = '';
    private searchCategoryText = '';



    private priorityFilter: Priority;
    private statusFilter: boolean;

    private menuOpened : boolean = true;
    private menuMode:string;
    private menuPosition:string;
    private showBackDrop:boolean;


    constructor(
        private dataHandler: DataHandlerService,
    ) {

        this.setMenuValues();
    }

    ngOnInit() {
        this.dataHandler.getAllPriorities().subscribe(priorities => this.priorities = priorities);
        this.dataHandler.getAllCategories().subscribe(categories => this.categories = categories);

        this.onSelectCategory(null);

    }



    private onSelectCategory(category: Category): void {

        this.selectedCategory = category;

        this.updateTasksAndStat();

    }


    private onDeleteCategory(category: Category): void {
        this.dataHandler.deleteCategory(category.id).subscribe(cat => {
            this.selectedCategory = null; // открываем категорию "Все"
            this.onSelectCategory(null);
        });
    }


    private onUpdateCategory(category: Category): void {
        this.dataHandler.updateCategory(category).subscribe(() => {
            this.onSearchCategory(this.searchCategoryText);
        });
    }


    private onUpdateTask(task: Task): void {

        this.dataHandler.updateTask(task).subscribe(cat => {
            this.updateTasksAndStat();
        });

    }


    private onDeleteTask(task: Task): void {

        this.dataHandler.deleteTask(task.id).subscribe(cat => {
            this.updateTasksAndStat();
        });
    }



    private onSearchTasks(searchString: string): void {
        this.searchTaskText = searchString;
        this.updateTasks();
    }


    private onFilterTasksByStatus(status: boolean): void {
        this.statusFilter = status;
        this.updateTasks();
    }


    private onFilterTasksByPriority(priority: Priority): void {
        this.priorityFilter = priority;
        this.updateTasks();
    }

    private updateTasks(): void {
        this.dataHandler.searchTasks(
            this.selectedCategory,
            this.searchTaskText,
            this.statusFilter,
            this.priorityFilter
        ).subscribe((tasks: Task[]) => {
            this.tasks = tasks;
        });
    }



    private onAddTask(task: Task): void {

        this.dataHandler.addTask(task).subscribe(result => {

            this.updateTasksAndStat();

        });

    }


    private onAddCategory(title: string): void {
        this.dataHandler.addCategory(title).subscribe(() => this.updateCategories());
    }

    private updateCategories(): void {
        this.dataHandler.getAllCategories().subscribe(categories => this.categories = categories);
    }


    private onSearchCategory(title: string): void {

        this.searchCategoryText = title;

        this.dataHandler.searchCategories(title).subscribe(categories => {
            this.categories = categories;
        });
    }


    private updateTasksAndStat(): void {

        this.updateTasks();


        this.updateStat();

    }


    private updateStat(): void {
        zip(
            this.dataHandler.getTotalCountInCategory(this.selectedCategory),
            this.dataHandler.getCompletedCountInCategory(this.selectedCategory),
            this.dataHandler.getUncompletedCountInCategory(this.selectedCategory),
            this.dataHandler.getUncompletedTotalCount())

            .subscribe(array => {
                this.totalTasksCountInCategory = array[0];
                this.completedCountInCategory = array[1];
                this.uncompletedCountInCategory = array[2];
                this.uncompletedTotalTasksCount = array[3];
            });
    }


    private toggleStat(showStat: boolean): void {
        this.showStat = showStat;
    }

    private toggleMenu() {
        this.menuOpened = !this.menuOpened;
    }

    private onClosedMenu(){
        this.menuOpened = false;
    }

    private setMenuValues(){
        this.menuPosition = 'left';
        this.menuOpened = true;
        this.menuMode = 'push';
        this.showBackDrop = false;
    }
}
