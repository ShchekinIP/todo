import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SettingsDialogComponent} from "../../dialog/settings-dialog/settings-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})


export class HeaderComponent implements OnInit {

    @Input()
    categoryName: string;
    @Output()
    toggleStat = new EventEmitter<boolean>(); // показать/скрыть статистику
    @Input()
    private showStat: boolean;

    constructor(private dialog: MatDialog
    ) {
    }

    ngOnInit() {
    }

    private onToggleStat(): void {
        this.toggleStat.emit(!this.showStat); // вкл/выкл статистику
    }


    private showSettings(): void {
        const dialogRef = this.dialog.open(SettingsDialogComponent,
            {
                autoFocus: false,
                width: '500px'
            });



    }


}
