import type React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";

import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import { MaterialIcons } from "@expo/vector-icons";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
	name: React.ComponentProps<typeof FontAwesome>["name"];
	color: string;
}) {
	return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
	const colorScheme = useColorScheme();

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
				// Disable the static render of the header on web
				// to prevent a hydration error in React Navigation v6.
				headerShown: useClientOnlyValue(false, true),
				tabBarStyle: {
					height: 70,
				},
				tabBarLabelStyle: {
					marginBottom: 10,
				},
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: "Top Stories",
					tabBarIcon: ({ color }) => (
						<MaterialIcons name="whatshot" size={28} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="new-stories"
				options={{
					title: "New Stories",
					tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
				}}
			/>
			<Tabs.Screen
				name="best-stories"
				options={{
					title: "New Stories",
					tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
				}}
			/>
		</Tabs>
	);
}
