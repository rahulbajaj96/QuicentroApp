import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { Title, Button } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";
import Notifications from "../../components/Notification";
export default function Notification() {
    return (
        <View style={styles.container}>
            <View style={styles.resetHeader}>
                <Ionicons name="md-arrow-back" size={28} color="black" />
                <Title style={styles.headerTitle}> Notifications</Title>
            </View>
            <Notifications />
            <Notifications />
            <Notifications />
            <Notifications />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    resetHeader: {
        margin: 20,
        display: "flex",
        flexDirection: "row",
    },
    headerTitle: {
        marginTop: -5,
        textAlign: "center",
        marginLeft: "13%",
        borderBottomWidth: 2,
        paddingBottom: 3,
        borderColor: "#2680EB",
    }

});
