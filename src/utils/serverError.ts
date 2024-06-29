class ServerSiteError extends Error {
    status: number
    success: boolean
    message: string;
    constructor(status: number,success: boolean,message:any) {
        super();
        this.message = message;
        this.status=status
        this.success=success
    }
}
export {ServerSiteError}