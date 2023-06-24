import { useAtomValue } from "jotai"
import { userAtom } from "../../states/user"
import { Text } from "../../components/Text";

export const SoundsList = () => {
	const user = useAtomValue(userAtom);
	return <Text type="h1">Hello {user.name}</Text>
}
