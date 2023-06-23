const validationRegex = {
	email: /.+@.+\..+/i,
	password: /^(?=.*[A-Z]).{10,}$/,
	nonEmptyValue: /\S/,
};

const isInputFieldValid = (
	(str: string, inputField: keyof typeof validationRegex) => validationRegex[inputField].test(str)
);

export const validationStack = (validationList: [string, string, string][]): string | null => {
	for(let [value, validationType, errorMessage] of validationList) {
		const result = isInputFieldValid(value, validationType as keyof typeof validationRegex);
		if(!result) return errorMessage;
	}
	return null;
}
