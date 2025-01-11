import {ColorSchemeName, StyleSheet} from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';

const createHomeStyles = (colorScheme: ColorSchemeName) => StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colorScheme === 'dark' ? "#333" : "#fff9e2",
        width: "100%",
    },
    header: {
        fontSize: 40,
        fontWeight: "bold",
        width: "100%",
        textAlign: "left", // Align text to the left
        paddingHorizontal: 20, // Optional: Add padding
        color: colorScheme === 'dark' ? "#fff" : "#000",
    },
    text: {
        fontSize: 16,
        color: colorScheme === 'dark' ? "#fff" : "#000",
    },
    sharedListMiniBoard: {
        width: "90%",
        alignSelf: "center",
        padding: 20,
        marginTop: 40,
        backgroundColor: colorScheme === 'dark' ? "#444" : "#EDEDED",
        borderRadius: 10,
    },
});

const createLoginStyles = (colorScheme: ColorSchemeName) => StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colorScheme === 'dark' ? "#333" : "#fff9e2",
        width: "100%",
        color: colorScheme === 'dark' ? "#fff" : "#000",
    },
    header: {
        fontSize: 40,
        fontWeight: "bold",
        width: "100%",
        textAlign: "left",
        paddingHorizontal: 20,
        color: colorScheme === 'dark' ? "#fff" : "#000",
    },
    text: {
        fontSize: 16,
        color: colorScheme === 'dark' ? "#fff" : "#000",
    },
    input: { 
        height: 40, 
        borderColor: 'gray', 
        borderWidth: 1, 
        marginBottom: 20, 
        paddingLeft: 10, 
        minWidth: '80%',
        color: colorScheme === 'dark' ? "#fff" : "#000",
    }
});

const createProfileStyles = (colorScheme: ColorSchemeName) => StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colorScheme === 'dark' ? "#333" : "#fff9e2",
        width: "100%",
        color: colorScheme === 'dark' ? "#fff" : "#000",
    },
    header: {
        fontSize: 40,
        fontWeight: "bold",
        width: "100%",
        textAlign: "left",
        paddingHorizontal: 20,
        color: colorScheme === 'dark' ? "#fff" : "#000",
    },
    text: {
        fontSize: 16,
        color: colorScheme === 'dark' ? "#fff" : "#000",
    },
    input: { 
        height: 40, 
        borderColor: 'gray', 
        borderWidth: 1, 
        marginBottom: 20, 
        paddingLeft: 10, 
        minWidth: '80%',
        color: colorScheme === 'dark' ? "#fff" : "#000",
    },
});

const creatListStyles = (colorScheme: ColorSchemeName) => StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colorScheme === 'dark' ? "#333" : "#fff9e2",
        width: "100%",
        color: colorScheme === 'dark' ? "#fff" : "#000",
    },
    header: {
        fontSize: 40,
        fontWeight: "bold",
        width: "100%",
        textAlign: "left",
        paddingHorizontal: 20,
        color: colorScheme === 'dark' ? "#fff" : "#000",
    },
    text: {
        fontSize: 16,
        color: colorScheme === 'dark' ? "#fff" : "#000",
    },
    input: { 
        height: 40, 
        borderColor: 'gray', 
        borderWidth: 1, 
        marginBottom: 20, 
        paddingLeft: 10, 
        minWidth: '80%',
        color: colorScheme === 'dark' ? "#fff" : "#000",
    },
});

export const useHomeStyles = () => {
    const colorScheme = useColorScheme();
    return createHomeStyles(colorScheme);
};

export const useLoginStyles = () => {
    const colorScheme = useColorScheme();
    return createLoginStyles(colorScheme);
};

export const useProfileStyles = () => {
    const colorScheme = useColorScheme();
    return createProfileStyles(colorScheme);
};

export const useListStyles = () => {
    const colorScheme = useColorScheme();
    return creatListStyles(colorScheme);
}