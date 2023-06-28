import { text } from "./text";
import { useCallback } from "react";
import classNames from "classnames";
import styles from './styles.module.css';
import { userAtom } from "../../states/user";
import { Text } from "../../components/Text";
import { useAtom, useAtomValue } from "jotai";
import { useFetch } from "../../hooks/useFetch";
import globalStyles from '../../global.module.css';
import { TSound, soundsAtom } from "../../states/sounds";

export const SoundsList = () => {
	const { name , photo, _id} = useAtomValue(userAtom);
	const [sounds, setSounds] = useAtom(soundsAtom);

	useFetch<{ sounds: TSound[] }>('soundList', ({ sounds }) => setSounds(sounds), { useCredentials: true });

	const handleSelectedSound = useCallback((sound: string) => () => {
		console.log(sound);
	}, [])

	const handleProfileSelection = useCallback(() => {
		console.log(_id);
	}, [])

	return (
		<>
			<div className={
				classNames(
					globalStyles.containerHorizontalStack,
					globalStyles.containerAlignTop,
					globalStyles.containerAlignBetween,
				)
				}
			>
				<div>
					<Text type="h2">{text.title.replace('${name}', name)}</Text>
					<Text>{text.subtitle}</Text>
				</div>
				<img
					role="button"
					src={photo || '/user-icon.svg'}
					className={styles.userIcon} alt={`${name}'s icon`}
					onClick={handleProfileSelection}
				/>
			</div>
			{
				(!!sounds.length) &&
				<ul className={styles.soundList}>
					{
						sounds.map(({_id, name, duration, avgColor, image }) => (
							<li
								key={_id}
								style={{ backgroundColor: avgColor }}
								className={
									classNames(
										styles.soundCard,
										globalStyles.containerHorizontalStack,
										globalStyles.containerAlignVertical,
										globalStyles.containerAlignBetween,
									)
								}
							>
								<div className={styles.soundImage} style={{ backgroundImage: `url(${image})` }}/>
								<div>
									<Text type="h5">{name}</Text>
									<Text>{(duration / 60000)} minutes</Text>
								</div>
								<img
									role="button"
									src='/play-btn.svg'
									className={styles.playIcon} alt={`Start playing ${name}`}
									onClick={handleSelectedSound(_id)}
								/>
							</li>
						))
					}
				</ul>
			}
		</>
	);
}
