import { text } from './text';
import classNames from 'classnames';
import { Text } from '../../components/Text';
import { Input } from '../../components/Input';
import { useFetch } from '../../hooks/useFetch';
import { useAtomValue, useSetAtom } from 'jotai';
import { Button } from '../../components/Button';
import globalStyles from '../../global.module.css';
import { TUser, userAtom } from '../../states/user';
import { validationStack } from '../../utils/formValidators';
import { sessionAtomWithPersistence } from '../../states/session';
import { FormEvent, useCallback, useEffect, useState } from 'react';
import { isFetchError } from '../../hooks/useFetch/atoms';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../utils/routes';

export const Register = () => {
	// State
	const [shouldStartRegistering, setShouldStartRegistering] = useState(false);
	const [registerPayload, setRegisterPayload] = useState<TRegisterData>({ name: '', password: '', email: '' });

	// Atoms
	const setUser = useSetAtom(userAtom);
	const setSession = useSetAtom(sessionAtomWithPersistence);
	const fetchError = useAtomValue(isFetchError);

	// API Calls
	useFetch<{ token: string; user: TUser }>(
		shouldStartRegistering ? 'register' : null,
		({token, user}) => {
			setUser(user);
			setSession(token);
		},
	{ method: 'POST', body: registerPayload });

	// Methods
	const validateNameField = useCallback(
		(value: string) => validationStack([[value, 'nonEmptyValue']]),
	[]);

	const validatePasswordField = useCallback(
		(value: string) => validationStack([
			[value, 'nonEmptyValue'],
			[value, 'password']
		]),
	[]);

	const validateEmailField = useCallback(
		(value: string) => validationStack([
			[value, 'nonEmptyValue'],
			[value, 'email']
		]),
	[]);

	const onInputChange = (value: TInputChangeEventValues) => setRegisterPayload({...registerPayload, ...value});
	const handleRegisterSubmit = (e: FormEvent) => {
		e.preventDefault();
		setShouldStartRegistering(true);
	}

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
					label={text.form.name.label}
					placeholder={text.form.name.placeholder}
					onChange={onInputChange}
					onValidationFn={validateNameField}
				/>
				<Input
					name='email'
					label={text.form.email.label}
					placeholder={text.form.email.placeholder}
					onChange={onInputChange}
					onValidationFn={validateEmailField}
				/>
				<Input
					autoComplete='new-password'
					type='password'
					name='password'
					label={text.form.password.label}
					placeholder={text.form.password.placeholder}
					onChange={onInputChange}
					onValidationFn={validatePasswordField}
				/>
				<Button
					type='submit'
					style={{ display: 'inherit', margin: 'auto', marginTop: '2rem' }}
					disabled={Object.values(registerPayload).some(v => !v)}
				>
					{text.main_cta}
				</Button>
				<span style={{ margin: '2rem auto', display: 'block', textAlign: 'center', fontSize: '.8rem' }}>
					¿Estás registrado? <Link to={ROUTES.LOGIN}>Inicia sesión</Link>
				</span>
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
