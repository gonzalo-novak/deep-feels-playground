import { useAtomValue } from "jotai";
import { Text } from "../../components/Text";
import { selectedSound } from "../../states/sounds";

export const Player = () => {
	const soundId = useAtomValue(selectedSound);
	return (
		<>
			<Text>Selected sound id: { soundId }</Text>
		</>
	)
};
