import { Injectable } from "@angular/core";
import { ApplicantForRegisterRequest } from "../../models/requests/users/applicant-for-register-request";
import { Observable } from "rxjs";
import { UserForRegisterResponse } from "../../models/responses/users/user-for-register-response";
import { EmployeeForRegisterRequest } from "../../models/requests/users/employee-for-register-request";
import { InstructorForRegisterRequest } from "../../models/requests/users/instructor-for-register-request";

@Injectable()
export abstract class AuthBaseService{
    abstract register(userforRegisterRequest:ApplicantForRegisterRequest)
                     :Observable<UserForRegisterResponse>

    abstract RegisterApplicant(userforRegisterRequest:ApplicantForRegisterRequest)
                     :Observable<UserForRegisterResponse>

    abstract RegisterEmployee(userforRegisterRequest:EmployeeForRegisterRequest)
                     :Observable<UserForRegisterResponse>
                     
    abstract RegisterInstructor(userforRegisterRequest:InstructorForRegisterRequest)
                     :Observable<UserForRegisterResponse>
                     
                     
                     
}