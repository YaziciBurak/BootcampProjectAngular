import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MenubarModule } from "primeng/menubar";
import { FilterBootcampPipe } from "./components/pipes/filter-model-pipe.pipe";
import { NavbarComponent } from "./components/navbar/navbar.component";


@NgModule({
    declarations:[FilterBootcampPipe],
    exports:[NavbarComponent,FilterBootcampPipe,],
    imports:[MenubarModule,CommonModule,NavbarComponent]

})
export class SharedModule{}