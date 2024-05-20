import { Pipe, PipeTransform } from "@angular/core";
import { GetlistInstructorResponse } from "../../../features/models/responses/instructor/getlist-instructor-response";


@Pipe({
    name: 'filterInstructorPipe'
})
export class FilterInstructorPipe implements PipeTransform {
    transform(value: GetlistInstructorResponse[], filterText: string): GetlistInstructorResponse[] {
        if (!value || !filterText) {
            return value;
        }
        const searchText = filterText.toLowerCase();
        return value.filter(instructor => {
            const fullName = `${instructor.firstName} ${instructor.lastName}`.toLowerCase();
            return fullName.includes(searchText);
        });
    }
}