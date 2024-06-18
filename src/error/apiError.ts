export class ApiError extends Error {
	statusCode: number;

	constructor(statusCode: number, message: string) {
		console.log(message)
		const errorMessage = extractErrorMessageFromZod(message);
		super(errorMessage);
		this.statusCode = statusCode;
		Error.captureStackTrace(this, this.constructor);
	}
}

function extractErrorMessageFromZod(zodErrorMessage: string): string {
	try {
		const errorObj = JSON.parse(zodErrorMessage);
		if (Array.isArray(errorObj) && errorObj.length > 0 && errorObj[0].message) {
			return errorObj[0].message;
		} else {
			return zodErrorMessage;
		}
	} catch (error) {
		return zodErrorMessage;
	}
}
