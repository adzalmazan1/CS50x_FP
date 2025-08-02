import { Alert } from "react-native";

// Delete alert message
export const handleDelete = (id, itemType, deleteItem) => {
    const capitalized = itemType.charAt(0).toUpperCase() + itemType.slice(1);
    const cascadingTypes = ["customer", "product"];

    if(cascadingTypes.includes(itemType)) {
        Alert.alert(`Delete ${capitalized}`, `This will also remove related order history. Proceed with caution.`, [
            { text: "Cancel", style: "cancel"},
            { text: "Delete", style: "destructive", onPress: () => deleteItem(id)},
        ]);
    } else {
        Alert.alert(`Delete ${capitalized}`, `Are you sure you want to delete this ${itemType}?`, [
            { text: "Cancel", style: "cancel"},
            { text: "Delete", style: "destructive", onPress: () => deleteItem(id)},
        ]);
    }
};