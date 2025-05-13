export type Note = {
    id?: string;
    title: string;
    content:string;
    updatedAt?: string | number;
    createdAt?:string | number;
    isSynced?:boolean

}