import { useAtomValue } from "jotai";
import { Text } from "../../components/Text";
import { selectedSound } from "../../states/sounds";
import { BackButton } from "../../components/BackButton";
import { useFetch } from "../../hooks/useFetch";
import { useCallback, useEffect, useRef, useState } from "react";
import classNames from "classnames";
import globalStyles from '../../global.module.css';
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../utils/routes";
import { ENDPOINTS } from "../../utils/endpoints";
import { FETCH_API_CONTEXT } from "../../utils/constants";

export const Player = () => {
	const audio = useRef<HTMLAudioElement>(document.createElement('audio'));
	const navigate = useNavigate();
	const sound = useAtomValue(selectedSound);
	const [quote, setQuote] = useState<TQuote | null>(null);
	const [isPlaying, setIsPlaying] = useState(false);

	// API Calls
	useFetch<{ quote: TQuote }>('inspirationalQuotes', ({ quote }) => setQuote(quote), { useCredentials: true });

	// Methods
	const startPlayingAudio = useCallback(() => {
		if(isPlaying) {
			audio.current.pause();
			setIsPlaying(false);
		} else {
			audio.current.play();
			setIsPlaying(true);
		}
	}, [isPlaying])

	// Effects
	useEffect(() => {
		if(!sound)
			navigate(ROUTES.PROFILE);
		else {
			audio.current.src = FETCH_API_CONTEXT + ENDPOINTS.playSound.replace('id', sound._id);
			audio.current.onloadeddata = () => {
				audio.current.play();
				setIsPlaying(true);
			}
		}
		return () => {
			audio.current.pause();
		}
	}, [sound]);

	return (
		<>
		<div className={classNames(globalStyles.container)} style={{ color: 'white' }}>
			<div style={{ height: '100%', display: 'flex', flexFlow: 'column', justifyContent: 'space-between', padding: '3rem 0' }}>
				<BackButton style={{ width: '2rem', filter: 'invert(1)' }} />
				<div>
					<Text type='h5'>Frase inspiracional:</Text>
					<div style={{ margin: '2rem auto' }}>
						<Text type='h1'>{ quote?.text }</Text>
					</div>
					<Text>- { quote?.author || 'Anonymous' }</Text>
				</div>
				<div>
					<img
						style={{ width: '40%', margin: 'auto', display: 'block', cursor: 'pointer' }}
						onClick={startPlayingAudio}
						role="button"
						aria-label="Play audio"
						src={
							(!isPlaying)
							? '/play-btn.svg'
							: '/pause-btn.svg'
						}
						alt="Play"
					/>
				</div>
			</div>
		</div>
		<div style={{
			backgroundImage: `url(${sound?.image})`,
			position: 'absolute',
			width: '100%',
			height: '100%',
			top: 0,
			bottom: 0,
			left: 0,
			right: 0,
			zIndex: -1,
			backgroundRepeat: 'no-repeat',
			backgroundSize: 'cover',
			backgroundPosition: 'center',
			}}
		/>
		<div style={{
			backgroundColor: `rgba(0,0, 0, 0.6)`,
			position: 'absolute',
			width: '100%',
			height: '100%',
			top: 0,
			bottom: 0,
			left: 0,
			right: 0,
			zIndex: -1,
			}}
		/>
		</>
	)
};

type TQuote = {
	text: string;
	author: string;
}
