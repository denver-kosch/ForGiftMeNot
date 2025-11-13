import { Modal, View, Text, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";
import apiCall from "@/services/apiCall";
import { useModalStyles } from "@/styles";

interface EditProfileModalProps {
    visible: boolean;
    onClose: () => void;
    token: string;
    profile?: {
        firstName: string;
        lastName: string;
        phoneNum: string;
        username: string;
    };
    fetchProfile: () => void;
}


const EditProfileModal: React.FC<EditProfileModalProps> = ({ visible, onClose, token, profile, fetchProfile }) => {
    const [firstName, setFirstName] = useState(profile?.firstName || '');
    const [lastName, setLastName] = useState(profile?.lastName || '');
    const [phoneNum, setPhoneNum] = useState(profile?.phoneNum || '');
    const [username, setUsername] = useState(profile?.username || '');
    
    const styles = useModalStyles();

    const handleSave = async () => {
        // Call API to save changes
        console.log("Saving profile changes:", { firstName, lastName, phoneNum, username });
        // Here you would typically make an API call to save the changes
        const response = await apiCall('updateUser', { firstName, lastName, phoneNum, username }, { "Authorization": `Bearer ${token}` });
        
        if (response?.success) console.log("Profile updated successfully");
        else console.error("Failed to update profile:", response?.message);
        
        fetchProfile();
        onClose();
    };

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="slide"
            onRequestClose={onClose}
        >
            <View style={styles.container}>
                <Text style={styles.title}>Edit Profile</Text>
                <TextInput placeholder="First Name" value={firstName} onChangeText={setFirstName} style={styles.input} />
                <TextInput placeholder="Last Name" value={lastName} onChangeText={setLastName} style={styles.input} />
                <TextInput placeholder="Phone Number" value={phoneNum} onChangeText={setPhoneNum} style={styles.input} />
                <TextInput placeholder="Username" value={username} onChangeText={setUsername} style={styles.input} />
                <TouchableOpacity onPress={handleSave} style={styles.button}>
                    <Text style={styles.text} >Save</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onClose} style={styles.button}>
                    <Text style={styles.text} >Cancel</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
}

export default EditProfileModal;