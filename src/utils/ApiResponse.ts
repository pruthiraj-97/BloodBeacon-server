class ApiResponse{
    status:number;
    success:boolean;
    message:string;
    data?:any;
    constructor(status:number,success:boolean,message:string,data:any=null){
        this.status = status;
        this.success = success;
        this.message = message;
        this.data = data;
    }
}

export {ApiResponse}
