import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

@Component({
    selector: "app-pull-to-refresh-load",
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: "./pull-to-refresh-load.component.html",
    styleUrl: "./pull-to-refresh-load.component.scss"
})
export class PullToRefreshLoadComponent {
    @Input() pulling: boolean = false;
}