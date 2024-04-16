import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MenubarModule } from "primeng/menubar";
import { FilterBootcampPipe } from "./components/pipes/filter-bootcamp-pipe.pipe";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { FilterInstructorPipe } from "./components/pipes/filter-instructor-pipe.pipe";


@NgModule({
    declarations:[FilterBootcampPipe,FilterInstructorPipe],
    exports:[NavbarComponent,FilterBootcampPipe,FilterInstructorPipe],
    imports:[MenubarModule,CommonModule,NavbarComponent]

})
export class SharedModule{}