export interface UserInput {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    username: string;
    created_date: Date;
    id_status: number;
    // ---------- added
    fullName: string;
    status: string;
    statusClass: string;
}
