import React, { useState } from "react";
import { View, StyleSheet, Button, Alert } from "react-native";

export function Toast (message) {
    
        Alert.alert(
            `${message}`,
            ``,
            [
                {
                    text: "OK",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
            ],
            { cancelable: false }
        );
    
}