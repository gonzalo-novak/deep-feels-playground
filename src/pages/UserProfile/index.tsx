import { useAtom, useAtomValue } from "jotai";
import { TUser, userAtom } from "../../states/user";
import { text } from "./text";
import { Text } from "../../components/Text";
import { BackButton } from "../../components/BackButton";
import styles from './styles.module.css';
import { Input } from "../../components/Input";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "../../components/Button";
import globalStyles from '../../global.module.css';
import { useFetch } from "../../hooks/useFetch";
import { isFetchError } from "../../hooks/useFetch/atoms";
import classNames from "classnames";

export const UserProfile = () => {
	// Initializers
	const formData = useRef(new FormData());
	const fetchError = useAtomValue(isFetchError);
	const userPhotoRef = useRef<HTMLInputElement | null>(null);
	const [user, setUser] = useAtom(userAtom);
	const { _id, name, email, photo } = user;
	const initialState = { name, email, photo: photo || '' };

	// States
	const [newUserPhotoPreview, setNewUserPhotoPreview] = useState('');
	const [newUserData, setNewUserData] = useState<TPartialUserData>(initialState);
	const [shouldStartUpdatingUser, setShouldStartUpdatingUser] = useState<boolean>(false);

	// API Calls
	useFetch<{ user: TUser }>(
		(shouldStartUpdatingUser) ? 'updateProfile' : null,
		({ user }) => {
			setUser(user);
			setNewUserData({ name: user.name, photo: user.photo, email: user.email });
			setShouldStartUpdatingUser(false);
		},
		{
			useCredentials: true,
			params: { id: _id },
			body: formData.current,
			method: 'PUT',
			notUseJSONPayload: true,
		}
	);

	// Methods
	const handleFormSubmit = useCallback(() => {
		Object.entries(newUserData).forEach(([k , v]) => formData.current.set(k , (v instanceof FileList) ? v[0] : v));
		setShouldStartUpdatingUser(true)
	}, [newUserData]);

	const onChangePhotoClick = useCallback(() => userPhotoRef.current?.click(), []);

	const onFormReset = useCallback(() => {
		setNewUserPhotoPreview('');
		setNewUserData(initialState);
	}, [initialState]);

	// Effects
	useEffect(() => {
		if(newUserData?.photo instanceof FileList){
			const reader = new FileReader();
			reader.readAsDataURL(newUserData.photo[0]);
			reader.onload = () => setNewUserPhotoPreview(reader.result as string);
		}
	}, [newUserData])

	useEffect(() => {
		if(fetchError?.message)
			setShouldStartUpdatingUser(false);
	}, [fetchError?.message])

	return (
		<>
			<BackButton />
			<div style={{ margin: '1rem auto' }}/>
			<Text type="h1">{text.title}</Text>
			<Text>{text.subtitle}</Text>
			<div
				role="img"
				aria-label={`Current ${name}'s photo`}
				className={styles.userPhoto}
				style={{ backgroundImage: `url(${newUserPhotoPreview || photo || '/user-icon.svg'})`, margin: '2rem auto' }}
			>
				<div
					role="button"
					aria-label={`Change ${name}'s photo`}
					className={styles.changeUserPhoto}
					onClick={onChangePhotoClick}
				/>
			</div>
			<Input
				label=""
				name="photo"
				type="file"
				style={{ display: 'none' }}
				ref={userPhotoRef}
				setValues={setNewUserData}
			/>
			<Input
				name="name"
				label="Nombre"
				defaultValue={name}
				setValues={setNewUserData}
				value={newUserData?.name}
			/>
			<Input
				name="email"
				label="Correo Electrónico"
				defaultValue={email}
				setValues={setNewUserData}
				value={newUserData?.email}
			/>
			{
				(Object.keys(newUserData).some((k) => newUserData[k as keyof TPartialUserData] !== user[k as keyof TUser])) &&
				<div className={globalStyles.containerStack}>
					<Button onClick={handleFormSubmit}>Guardar cambios</Button>
					<Button
						className={styles.cancelButton}
						onClick={onFormReset}
					>
						Cancelar
					</Button>
				</div>
			}
		</>
	);
};

type TPartialUserData = Partial<Pick<TUser, 'name' | 'email' >> & { photo?: FileList | string };
