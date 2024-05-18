export interface GetlistResultResponse {
    id: number;
    quizId: number;
    applicantId: string;
    applicantFirstName: string;
    applicantLastName: string;
    wrongAnswers: number;
    correctAnswers: number;
    isPassed: boolean;
}
