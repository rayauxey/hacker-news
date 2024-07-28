import type { Story } from "@/resolvers/hackernews";
import { Pressable, StyleSheet } from "react-native";
import { FontText } from "../StyledText";
import { Link } from "expo-router";

export default function StoryItem({
	story,
}: {
	story: Story;
}) {
	return (
		<Link href={`/${story.id}`} asChild>
			<Pressable style={styles.container}>
				<FontText
					font="SpaceMono"
					style={{ fontSize: 14, color: "gray", marginBottom: 4 }}
				>
					@{story.by}
				</FontText>
				<FontText font="Inter" style={styles.title}>
					{story.title}
				</FontText>
				<FontText font="SpaceMono" style={{ fontSize: 14, color: "gray" }}>
					{plurify(story.score, "point", "points")} ·{" "}
					{plurify(story.descendants, "comment", "comments")}
				</FontText>
			</Pressable>
		</Link>
	);
}

function plurify(count: number, singular: string, plural: string) {
	return count === 1 ? `${count} ${singular}` : `${count} ${plural}`;
}

const styles = StyleSheet.create({
	container: {
		display: "flex",
		flexDirection: "column",
		paddingHorizontal: 16,
		paddingVertical: 20,
	},
	title: {
		fontSize: 20,
		fontWeight: "600",
	},
});
