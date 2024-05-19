export function dataValidationError(error:any){
    let errorMessage:Array<string>=[]
    error.forEach((err:any) => {
        errorMessage.push(err.message)
    });
    return errorMessage
}