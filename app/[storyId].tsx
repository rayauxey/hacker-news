import StoryContent from "@/components/Stories/StoryContent";
import { View } from "@/components/Themed";
import { getStory } from "@/resolvers/hackernews";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator } from "react-native";

export default function StoryPage() {
	const { storyId } = useLocalSearchParams();
	const navigation = useNavigation();

	useEffect(() => {
		navigation.setOptions({
			title: "",
		});
	}, [navigation]);

	const { data, isLoading } = useQuery({
		queryKey: ["story", storyId],
		queryFn: async () => getStory(Number(storyId)),
	});

	// useEffect(() => {
	// 	if (data) {
	// 		navigation.setOptions({
	// 			title: data.story.title,
	// 		});
	// 	}
	// }, [data, navigation]);

	return (
		<View
			style={{
				flex: 1,
				flexDirection: "column",
			}}
		>
			{isLoading ? (
				<View
					style={{
						flex: 1,
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<ActivityIndicator size="large" />
				</View>
			) : (
				data?.story && <StoryContent story={data.story} />
			)}
		</View>
	);
}
