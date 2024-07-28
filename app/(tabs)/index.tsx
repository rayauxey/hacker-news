import {
	ActivityIndicator,
	ScrollView,
	StyleSheet,
	useColorScheme,
} from "react-native";

import { View } from "@/components/Themed";
import { useQuery } from "@tanstack/react-query";
import { getStories } from "@/resolvers/hackernews";
import StoryItem from "@/components/Stories/StoryItem";
import Colors from "@/constants/Colors";

export default function TopStoriesScreen() {
	const { data, isLoading } = useQuery({
		queryKey: ["topStories"],
		queryFn: async () => getStories(20, "top"),
	});

	const colorScheme = useColorScheme();

	return (
		<View style={styles.container}>
			{isLoading ? (
				<LoadingSpinner />
			) : (
				<ScrollView>
					{data?.map((story, i) => (
						<View key={story.id}>
							<StoryItem story={story} />
							{i < data.length - 1 && (
								<View
									style={{
										...styles.separator,
										backgroundColor: colorScheme
											? Colors[colorScheme].separator
											: Colors.light.separator,
									}}
								/>
							)}
						</View>
					))}
				</ScrollView>
			)}
		</View>
	);
}

function LoadingSpinner() {
	return (
		<View
			style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<ActivityIndicator size="large" />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
	},
	separator: {
		// marginVertical: 16,
		height: 1,
		width: "100%",
		marginHorizontal: "auto",
	},
});
