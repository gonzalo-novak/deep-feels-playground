import text from './text.json';
import classNames from 'classnames';
import styles from './styles.module.css';
import globalStyles from '../../global.module.css';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { ROUTES } from '../../utils/routes';
import { Text } from '../../components/Text';
import { useNavigate } from 'react-router-dom';
import { Input } from '../../components/Input';
import { useFetch } from '../../hooks/useFetch';
import { Button } from '../../components/Button';
import { sessionAtom } from '../../states/session';
import { TUser, userAtom } from '../../states/user';
import { validationStack } from '../../utils/formValidators';
import { FormEvent, useCallback, useEffect, useState } from 'react';
import { isFetchError, isLoading } from '../../hooks/useFetch/atoms';

export const Register = () => {
	// Initializers
	const navigate = useNavigate();

	// State
	const [shouldStartRegistering, setShouldStartRegistering] = useState(false);
	const [registerPayload, setRegisterPayload] = useState<TRegisterData>({ name: '', password: '', email: '' });

	// Atoms
	const setUser = useSetAtom(userAtom);
	const [session, setSession] = useAtom(sessionAtom);
	const isFetching = useAtomValue(isLoading);
	const fetchError = useAtomValue(isFetchError);

	// API Calls
	useFetch<TUser & { token: string }>(
		shouldStartRegistering ? 'register' : null,
		({token, ...user}) => {
			setUser({ ...user });
			setSession(token);
		},
	{ method: 'POST', body: registerPayload });

	// Methods
	const validateNameField = useCallback(
		(value: string) => validationStack([[value, 'nonEmptyValue', text.form.password.validationMessages.emptyValue]]),
	[]);

	const validatePasswordField = useCallback(
		(value: string) => validationStack([
			[value, 'nonEmptyValue', text.form.password.validationMessages.emptyValue],
			[value, 'password', text.form.password.validationMessages.badPasswordFormat]
		]),
	[]);

	const validateEmailField = useCallback(
		(value: string) => validationStack([
			[value, 'nonEmptyValue', text.form.email.validationMessages.emptyValue],
			[value, 'email', text.form.email.validationMessages.badEmailFormat]
		]),
	[]);

	const onInputChange = (value: TInputChangeEventValues) => setRegisterPayload({...registerPayload, ...value});
	const handleRegisterSubmit = (e: FormEvent) => {
		e.preventDefault();
		setShouldStartRegistering(true);
	}

	useEffect(() => {
		if(session) {
			navigate(ROUTES.LOGIN, { replace: true });
		}
	}, [session]);

	useEffect(() => {
		if(fetchError?.message) setShouldStartRegistering(false);
	}, [fetchError?.message]);

	return (
		<div className={classNames(globalStyles.centerItemsColumn)}>
			<Text type='h1'className={globalStyles.textCenter}>{text.title}</Text>
			<img style={{ margin: '2rem auto' }} src='/register.svg' alt={text.image_alt}/>
			<form onSubmit={handleRegisterSubmit}>
				<Input
					name='name'
					className={styles.inputMargins}
					label={text.form.name.label}
					placeholder={text.form.name.placeholder}
					onChange={onInputChange}
					onValidationFn={validateNameField}
				/>
				<Input
					name='email'
					className={styles.inputMargins}
					label={text.form.email.label}
					placeholder={text.form.email.placeholder}
					onChange={onInputChange}
					onValidationFn={validateEmailField}
				/>
				<Input
					autoComplete='new-password'
					className={styles.inputMargins}
					type='password'
					name='password'
					label={text.form.password.label}
					placeholder={text.form.password.placeholder}
					onChange={onInputChange}
					onValidationFn={validatePasswordField}
				/>
				<Button
					type='submit'
					style={{ display: 'inherit', margin: 'auto' }}
					disabled={
						Object.values(registerPayload).some(v => !v)
						|| isFetching
					}
				>
					{ (isFetching) ? 'Registrando...' : text.main_cta }
				</Button>
			</form>
		</div>
	)
}

type TRegisterData = {
	name: string;
	email: string;
	password: string;
}
type TInputChangeEventValues = {
	name?: string;
	email?: string;
	password?: string;
}
