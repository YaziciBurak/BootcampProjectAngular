export interface FinishQuizRequest {
    quizId: number;
    answers: { [key: number]: string };
}
