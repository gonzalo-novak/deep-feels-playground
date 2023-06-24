const validationRegex = {
	email: /.+@.+\..+/i,
	password: /^(?=.*[A-Z]).{10,}$/,
	nonEmptyValue: /\S/,
};

const isInputFieldValid = (
	(str: string, inputField: keyof typeof validationRegex) => validationRegex[inputField].test(str)
);

export const validationMessages = {
	email: "El email no tiene un formato correcto",
	nonEmptyValue: "El campo no debe permanecer vacío",
	password: "La contraseña debe ser mayor a 10 caracteres y al menos tener una letra mayúscula",
}

export const validationStack = (validationList: [string, keyof typeof validationRegex][]): string | null => {
	for(let [value, validationType] of validationList) {
		const result = isInputFieldValid(value, validationType as keyof typeof validationRegex);
		if(!result) return validationMessages[validationType];
	}
	return null;
}

