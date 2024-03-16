export interface UserResponseDTO {
    uuid: string;
    username: string;
    region: string;
}

export interface UserRegisterDTO {
    username: string;
    password: string;
    region: string;
}