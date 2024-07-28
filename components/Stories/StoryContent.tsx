import type { Story } from "@/resolvers/hackernews";
import { View, Text } from "../Themed";
import { FontText } from "../StyledText";
import { StyleSheet } from "react-native";
import { Link } from "expo-router";

export default function StoryContent({
	story,
}: {
	story: Story;
}) {
	return (
		<View style={styles.container}>
			<FontText style={styles.title} font="Inter">
				{story.title}
			</FontText>
			<FontText style={styles.extraInfo} font="SpaceMono">
				@{story.by} · {story.score} points · {story.descendants} comments
			</FontText>
			{story.text && <Text>{story.text}</Text>}
			{story.url && (
				<Link
					href={story.url}
					style={{
						color: "blue",
					}}
				>
					{story.url}
				</Link>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 16,
		flexDirection: "column",
		gap: 10,
	},
	title: {
		fontSize: 24,
		fontWeight: "normal",
	},

	extraInfo: {
		fontSize: 16,
		color: "gray",
	},
});
