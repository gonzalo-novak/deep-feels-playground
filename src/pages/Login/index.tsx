import { text } from './text';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../utils/routes';
import { Text } from '../../components/Text';
import { Input } from '../../components/Input';
import { useFetch } from '../../hooks/useFetch';
import { Button } from '../../components/Button';
import { useAtomValue, useSetAtom } from 'jotai';
import globalStyles from '../../global.module.css';
import { TUser, userAtom } from '../../states/user';
import { validationStack } from '../../utils/formValidators';
import { sessionAtomWithPersistence } from '../../states/session';
import { FormEvent, useCallback, useEffect, useState } from 'react';
import { isFetchError, isLoading } from '../../hooks/useFetch/atoms';

export const Login = () => {
	// Initializers
	const isFetching = useAtomValue(isLoading);
	const fetchError = useAtomValue(isFetchError);

	// State
	const setUser = useSetAtom(userAtom);
	const setSession = useSetAtom(sessionAtomWithPersistence);
	const [shouldContinue, setShouldContinue] = useState<boolean>(false);
	const [loginPayload, setLoginPayload] = useState<TLoginPayload>({
		email: '',
		password: '',
	});

	// API Calls
	useFetch<{ token: string; user: TUser }>(
		(shouldContinue) ? 'login' : null,
		({ token, user }) => { setUser(user); setSession(token); },
		{ method: 'POST', body: loginPayload }
	);

	// Methods
	const handleInputChanges = (value: Partial<TLoginPayload>) => setLoginPayload((p) => ({...p, ...value}));
	const validatePassword = useCallback((value: string) => validationStack([[value, 'nonEmptyValue']]), []);
	const validateEmail = useCallback((value: string) => validationStack([
		[value, 'nonEmptyValue'],
		[value, 'email'],
	]), []);
	const handleRegisterPage = (e: FormEvent) => {
		e.preventDefault();
		setShouldContinue(true);
	}

	// Effects
	useEffect(() => {
		if(fetchError?.message) setShouldContinue(false);
	}, [fetchError?.message]);

	return (
		<>
			<Text type='h1' className={globalStyles.textCenter}>{text.title}</Text>
			<Text type='paragraph' className={globalStyles.textCenter}>{text.subtitle}</Text>
			<img style={{ margin: '2rem auto' }} src='/login.svg' alt={text.main_img_alt} />
			<form onSubmit={handleRegisterPage}>
				<Input
					name='email'
					label={text.form.email.label}
					placeholder={text.form.email.placeholder}
					onChange={handleInputChanges}
					onValidationFn={validateEmail}
				/>
				<Input
					name='password'
					type='password'
					autoComplete='current-password'
					label={text.form.password.label}
					placeholder={text.form.password.placeholder}
					onChange={handleInputChanges}
					onValidationFn={validatePassword}
				/>
				<Link style={{ marginBottom: '3rem', display: 'inline-block', textAlign: 'right', 'color': 'var(--color-black)' }} to={ROUTES.PASSWORD_RECOVERY}>¿Olvidaste tu contraseña?</Link>

				<Button
					type='submit'
					style={{ display: 'inherit', margin: 'auto' }}
					disabled={Object.values(loginPayload).some(v => !v) || isFetching}
				>
					{(isFetching) ? text.main_cta_loading : text.main_cta}
				</Button>

				<span style={{ margin: '2rem auto', display: 'block', textAlign: 'center', fontSize: '.8rem' }}>
					¿Aún no eres un usuario? <Link to={ROUTES.REGISTER}>Registrate aquí</Link>
				</span>
			</form>
		</>
	)
}

type TLoginPayload = {
	email: string;
	password: string;
}
