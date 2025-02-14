import {ColorSchemeName, StyleSheet} from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';

const text = { light: "#000", dark: "#fff" };
const background = { light: "#fff9e2", dark: "#333" };
const sectionBackground = { light: "#EDEDED", dark: "#444" };
const border = { light: "#ddd", dark: "#666" };


const createHomeStyles = (colorScheme: ColorSchemeName) => StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colorScheme === 'dark' ? background.dark : background.light,
        width: "100%",
    },
    header: {
        fontSize: 40,
        fontWeight: "bold",
        width: "100%",
        textAlign: "left", // Align text to the left
        paddingHorizontal: 20, // Optional: Add padding
        color: colorScheme === 'dark' ? text.dark : text.light,
    },
    text: {
        fontSize: 16,
        color: colorScheme === 'dark' ? text.dark : text.light,
    },
    sharedListMiniBoard: {
        width: "90%",
        alignSelf: "center",
        padding: 20,
        marginTop: 40,
        backgroundColor: colorScheme === 'dark' ? sectionBackground.dark : sectionBackground.light,
        borderRadius: 10,
    },
});

const createLoginStyles = (colorScheme: ColorSchemeName) => StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colorScheme === 'dark' ? background.dark : background.light,
        width: "100%",
        color: colorScheme === 'dark' ? text.dark : text.light,
    },
    header: {
        fontSize: 40,
        fontWeight: "bold",
        width: "100%",
        textAlign: "left",
        paddingHorizontal: 20,
        color: colorScheme === 'dark' ? text.dark : text.light,
    },
    text: {
        fontSize: 16,
        color: colorScheme === 'dark' ? text.dark : text.light,
    },
    input: { 
        height: 40, 
        borderColor: 'gray', 
        borderWidth: 1, 
        marginBottom: 20, 
        paddingLeft: 10, 
        minWidth: '80%',
        color: colorScheme === 'dark' ? text.dark : text.light,
    }
});

const createProfileStyles = (colorScheme: ColorSchemeName) => StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colorScheme === 'dark' ? background.dark : background.light,
        width: "100%",
        color: colorScheme === 'dark' ? text.dark : text.light,
    },
    header: {
        fontSize: 40,
        fontWeight: "bold",
        width: "100%",
        textAlign: "left",
        paddingHorizontal: 20,
        color: colorScheme === 'dark' ? text.dark : text.light,
    },
    text: {
        fontSize: 16,
        color: colorScheme === 'dark' ? text.dark : text.light,
    },
    input: { 
        height: 40, 
        borderColor: 'gray', 
        borderWidth: 1, 
        marginBottom: 20, 
        paddingLeft: 10, 
        minWidth: '80%',
        color: colorScheme === 'dark' ? text.dark : text.light,
    },
});

const createListStyles = (colorScheme: ColorSchemeName) => StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colorScheme === 'dark' ? background.dark : background.light,
        width: "100%",
        color: colorScheme === 'dark' ? text.dark : text.light,
    },
    header: {
        fontSize: 40,
        fontWeight: "bold",
        width: "100%",
        textAlign: "left",
        paddingHorizontal: 20,
        color: colorScheme === 'dark' ? text.dark : text.light,
    },
    text: {
        fontSize: 16,
        color: colorScheme === 'dark' ? text.dark : text.light,
    },
    listPreview: {
        backgroundColor: colorScheme === 'dark' ? sectionBackground.dark : sectionBackground.light,
        padding: 20,
        margin: 10,
        borderRadius: 10,
        borderColor: colorScheme === 'dark' ? border.dark : border.light,
        borderWidth: 1,
    },
    listName: {
        fontSize: 20,
        fontWeight: "bold",
        color: colorScheme === 'dark' ? text.dark : text.light,
    },
    listDescription: {
        fontSize: 16,
        color: colorScheme === 'dark' ? text.dark : text.light,
    },
    listOwner: {
        fontSize: 16,
        color: colorScheme === 'dark' ? text.dark : text.light,
    },
    listLastUpdated: {
        fontSize: 16,
        color: colorScheme === 'dark' ? text.dark : text.light,
    },
    listBlock: {
        width: "95%",
        paddingTop: 20,
        paddingBottom: 20,
        backgroundColor: colorScheme === 'dark' ? sectionBackground.dark : sectionBackground.light,
        borderRadius: 10,
        minHeight: 200,
        maxHeight: 400,
    },
    topBar: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
    },
    button: {
        backgroundColor: colorScheme === 'dark' ? sectionBackground.dark : sectionBackground.light,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 5,
        textAlign: "center",
        color: colorScheme === 'dark' ? text.dark : text.light,

    },
});

const createCreateListStyles = (colorScheme: ColorSchemeName) => StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colorScheme === 'dark' ? background.dark : background.light,
        width: "100%",
        color: colorScheme === 'dark' ? text.dark : text.light,
    },
    header: {
        fontSize: 40,
        fontWeight: "bold",
        width: "100%",
        textAlign: "left",
        paddingHorizontal: 20,
        color: colorScheme === 'dark' ? text.dark : text.light,
    },
    text: {
        fontSize: 16,
        color: colorScheme === 'dark' ? text.dark : text.light,
    },
    input: { 
        height: 40, 
        borderColor: 'gray', 
        borderWidth: 1, 
        marginBottom: 20, 
        paddingLeft: 10, 
        minWidth: '80%',
        color: colorScheme === 'dark' ? text.dark : text.light,
    },
    button: {
        backgroundColor: colorScheme === 'dark' ? sectionBackground.dark : sectionBackground.light,
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: colorScheme === 'dark' ? text.dark : text.light,
        textAlign: "center",
    },
    form: {
        width: "90%",
        padding: 20,
        backgroundColor: colorScheme === 'dark' ? sectionBackground.dark : sectionBackground.light,
        borderRadius: 10,
    }
});

const createListDetailStyles = (colorScheme: ColorSchemeName) => StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colorScheme === 'dark' ? background.dark : background.light,
        width: "100%",
        color: colorScheme === 'dark' ? text.dark : text.light,
    },
    header: {
        fontSize: 40,
        fontWeight: "bold",
        width: "100%",
        textAlign: "left",
        paddingHorizontal: 20,
        color: colorScheme === 'dark' ? text.dark : text.light,
    },
    text: {
        fontSize: 16,
        color: colorScheme === 'dark' ? text.dark : text.light,
    },

});





export const useHomeStyles = () => createHomeStyles(useColorScheme());

export const useLoginStyles = () => createLoginStyles(useColorScheme());

export const useProfileStyles = () => createProfileStyles(useColorScheme());

export const useListStyles = () => createListStyles(useColorScheme());

export const useCreateListStyles = () => createCreateListStyles(useColorScheme());

export const useListDetailStyles = () => createListDetailStyles(useColorScheme());

