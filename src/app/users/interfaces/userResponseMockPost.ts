import { UserInput } from "./userInput"

export interface UserResponseMockPost {
    data: {
        user: UserInput
    },
    message: string
}