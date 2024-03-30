import { GetlistBootcampResponse } from "../../../../app/features/models/responses/bootcamp/getlist-bootcamp-response"
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name:'filterPipe'
})
export class FilterModelPipe implements PipeTransform{

    transform(value: GetlistBootcampResponse[],filterText:string):GetlistBootcampResponse[] {
        filterText=filterText?filterText.toLocaleLowerCase():""
        return filterText?value.filter((m:GetlistBootcampResponse)=>m.name.toLocaleLowerCase()
        .indexOf(filterText)!==-1):value;
    }
}