import { UserInput } from "./userInput"

export interface UserResponseMock {
    data: {
        count: number,
        users: UserInput[]
    },
    message: string,
    missing_params: []
}