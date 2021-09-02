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
    private categories: Category[];
    private priorities: Priority[];

    private totalTasksCountInCategory : number;
    private completedCountInCategory : number;
    private uncompletedCountInCategory : number;
    private uncompletedTotalTasksCount : number;


    private selectedCategory: Category = null;

    // поиск
    private searchTaskText = '';

    // фильтрация
    private priorityFilter: Priority;
    private statusFilter: boolean;


    constructor(
        private dataHandler: DataHandlerService,
    ) {
    }

    ngOnInit(): void {
        this.dataHandler.getAllPriorities().subscribe(priorities => this.priorities = priorities);
        this.dataHandler.getAllCategories().subscribe(categories => this.categories = categories);

        this.onSelectCategory(null);

    }



    private onSelectCategory(category: Category) {

        this.selectedCategory = category;

        this.updateTasksAndStat();

    }


    private onDeleteCategory(category: Category) {
        this.dataHandler.deleteCategory(category.id).subscribe(cat => {
            this.selectedCategory = null; // открываем категорию "Все"
            this.onSelectCategory(this.selectedCategory);
        });
    }


    private onUpdateCategory(category: Category) {
        this.dataHandler.updateCategory(category).subscribe(() => {
            this.onSelectCategory(this.selectedCategory);
        });
    }


    private onUpdateTask(task: Task) {

        this.dataHandler.updateTask(task).subscribe(cat => {
            this.updateTasksAndStat()
        });

    }


    private onDeleteTask(task: Task) {

        this.dataHandler.deleteTask(task.id).subscribe(cat => {
            this.updateTasksAndStat()
        });
    }



    private onSearchTasks(searchString: string) {
        this.searchTaskText = searchString;
        this.updateTasks();
    }


    private onFilterTasksByStatus(status: boolean) {
        this.statusFilter = status;
        this.updateTasks();
    }


    private onFilterTasksByPriority(priority: Priority) {
        this.priorityFilter = priority;
        this.updateTasks();
    }

    private updateTasks() {
        this.dataHandler.searchTasks(
            this.selectedCategory,
            this.searchTaskText,
            this.statusFilter,
            this.priorityFilter
        ).subscribe((tasks: Task[]) => {
            this.tasks = tasks;
        });
    }



    private onAddTask(task: Task) {

        this.dataHandler.addTask(task).subscribe(result => {

            this.updateTasksAndStat()

        });

    }


    private onAddCategory(title: string) {
        this.dataHandler.addCategory(title).subscribe(() => this.updateCategories());
    }

    private updateCategories() {
        this.dataHandler.getAllCategories().subscribe(categories => this.categories = categories);
    }

    private updateTasksAndStat(){
        this.updateTasks();
        this.updateStat();
    }

    private updateStat() {
        zip(
            this.dataHandler.getTotalCountInCategory(this.selectedCategory),
            this.dataHandler.getCompletedCountInCategory(this.selectedCategory),
            this.dataHandler.getUncompletedCountInCategory(this.selectedCategory),
            this.dataHandler.getUncompletedTotalCount()
        ).subscribe(array=>{
            this.totalTasksCountInCategory = array[0];
            this.completedCountInCategory = array[1];
            this.uncompletedCountInCategory = array[2];
            this.uncompletedTotalTasksCount = array[3]
        });
    }
}
