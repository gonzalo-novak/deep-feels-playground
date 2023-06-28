import styles from './styles.module.css';
import { useCallback, useEffect, useState } from "react";
import { Text } from "../../components/Text"
import { TMood, moodsAtom } from "../../states/moods";
import { Button } from "../../components/Button";
import { text } from "./text";
import classNames from 'classnames';
import { useAtom, useAtomValue } from 'jotai';
import { useFetch } from '../../hooks/useFetch';
import globalStyles from '../../global.module.css';
import { TUser, userAtom } from '../../states/user';
import { isFetchError } from '../../hooks/useFetch/atoms';

export const Moods = () => {
	// State
	const [user, setUser] = useAtom(userAtom)
	const [moods, setMoods] = useAtom(moodsAtom);
	const fetchError = useAtomValue(isFetchError);
	const [shouldRegisterMoods, setShouldRegisterMoods] = useState<boolean>(false);
	const [selectedMoods, setSelectedMoods] = useState<{[k: TMood['_id']]: boolean}>({});
	const selectedMoodsArr = Object.keys(selectedMoods);

	// API Calls
	useFetch<{ moods: TMood[] }>('moods', ({ moods }) => setMoods(moods));
	useFetch<{ user: TUser }>(
		(shouldRegisterMoods) ? 'registerMoods' : null,
		({ user }) => setUser(user),
		{ method: 'PUT', body: { moods: selectedMoodsArr }, useCredentials: true, params: { id: user._id } }
	);

	// Methods
	const onMoodSelection = useCallback((_id: TMood['_id']) =>
		() => {
			setSelectedMoods((sm) => {
				let tmp = {...sm};
				if(sm[_id])
					delete tmp[_id];
				else
					tmp = {...tmp, [_id]: true}
				return { ...tmp };
			});
		},
		[]
	);

	const handleFinalSelection = () => setShouldRegisterMoods(true);

	// Effects
	useEffect(() => {
		if(fetchError?.message) setShouldRegisterMoods(false);
	}, [fetchError?.message])

	return (
		<div className={globalStyles.container}>
			<div className={globalStyles.containerStack}>
				<div>
					<Text type='h1'>{text.title}</Text>
					<Text>{text.subtitle}</Text>
				</div>

				<div className={styles.moodsGrid}>
					{
						moods.map(({ _id, name, icon  }) => (
							<div key={_id} className={styles.moodsCard} onClick={onMoodSelection(_id)}>
									{(selectedMoods[_id]) && <img className={styles.moodCheckIcon} src='/check.svg' alt={'Se seleccionó la emoción ' + name} /> }
									<img className={styles.moodIcon} src={icon} alt={name} />
									<Text type='h4' className={globalStyles.textCenter}>{name}</Text>
							</div>
						))
					}
				</div>

				<Button
					type='button'
					className={classNames((!selectedMoodsArr.length) && styles.noMoodSelectedButton)}
					onClick={handleFinalSelection}
				>
					{
						(selectedMoodsArr.length)
							? text.main_cta.if_mood_selected
							: text.main_cta.if_no_mood_selected
					}
				</Button>
			</div>
		</div>
	);
}
