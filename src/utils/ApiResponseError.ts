class ApiResponseError{
    status:number
    success:boolean
    message:any
    constructor(status:number,success:boolean,message:any){
        this.status=status
        this.success=success
        this.message=message
    }
}

export {ApiResponseError}