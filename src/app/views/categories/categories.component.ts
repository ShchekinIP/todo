import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DataHandlerService} from "../../service/data-handler.service";
import {Category} from "../../model/Category";
import {EditCategoryDialogComponent} from "../../dialog/edit-category-dialog/edit-category-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {OperType} from "../../dialog/OperType";

@Component({
    selector: 'app-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

    @Input()
    categories: Category[];

    @Input()
    selectedCategory: Category;



    @Output()
    selectCategory = new EventEmitter<Category>();


    @Output()
    deleteCategory = new EventEmitter<Category>();


    @Output()
    updateCategory = new EventEmitter<Category>();


    @Output()
    addCategory = new EventEmitter<string>(); // передаем только название новой категории


    @Output()
    searchCategory = new EventEmitter<string>(); // передаем строку для поиска



    private indexMouseMove: number;
    private searchCategoryTitle: string;


    constructor(
        private dataHandler: DataHandlerService,
        private dialog: MatDialog,


    ) {
    }


    ngOnInit() {

    }


    private showTasksByCategory(category: Category): void {


        if (this.selectedCategory === category) {
            return;
        }

        this.selectedCategory = category;


        this.selectCategory.emit(this.selectedCategory);
    }


    private showEditIcon(index: number): void {
        this.indexMouseMove = index;

    }


    private openEditDialog(category: Category): void {
        const dialogRef = this.dialog.open(EditCategoryDialogComponent, {
            data: [category.title, 'Редактирование категории', OperType.EDIT],
            width: '400px'
        });

        dialogRef.afterClosed().subscribe(result => {

            if (result === 'delete') { // нажали удалить

                this.deleteCategory.emit(category); // вызываем внешний обработчик

                return;
            }

            if (result as string) { // нажали сохранить
                category.title = result as string;

                this.updateCategory.emit(category); // вызываем внешний обработчик
                return;
            }
        });
    }


    private openAddDialog(): void {

        const dialogRef = this.dialog.open(EditCategoryDialogComponent, {
            data: ['', 'Добавление категории', OperType.ADD],
            width: '400px'
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.addCategory.emit(result as string); // вызываем внешний обработчик
            }
        });
    }


    private search(): void {


        if (this.searchCategoryTitle == null) {
            return;
        }

        this.searchCategory.emit(this.searchCategoryTitle);

    }


}
