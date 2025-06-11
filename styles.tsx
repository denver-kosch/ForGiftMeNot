import {ColorSchemeName, StyleSheet} from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';

// Define color constants for light themes
const [cornsilk, umber, crayola_blue, off_white]= ['#fff9e2', '#7f675b', '#0075f2', '#ededed'];
// Dark theme colors
const [jet, onyx, dim_gray] = ['#333', '#444', '#666'];

const text = { light: "#000", dark: "#fff" };
const background = { light: cornsilk, dark: jet };
const sectionBackground = { light: off_white, dark: onyx };
const border = { light: crayola_blue, dark: dim_gray };

//Additional colors (I don't know if these will be used yet, but they are here for future use)

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
        textAlign: "center",
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
    profilePic: {
        height: 125,
        width: 125,
        marginBottom: 10
    },
    button: {
        backgroundColor: colorScheme === 'dark' ? sectionBackground.dark : sectionBackground.light,
        padding: 10,
        borderRadius: 5,
        marginBottom: 20,
        fontSize: 16,
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

const createModalStyles = (colorScheme: ColorSchemeName) => StyleSheet.create({
    modalBackdrop: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        width: "80%",
        backgroundColor: colorScheme === 'dark' ? sectionBackground.dark : sectionBackground.light,
        padding: 20,
        borderRadius: 10,
        alignItems: "center",
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        color: colorScheme === 'dark' ? text.dark : text.light,
    },
    previewImage: {
        width: 100,
        height: 100,
        borderRadius: 10,
        marginBottom: 20,
    },
    placeholderShape: {
        width: 100,
        height: 100,
        backgroundColor: colorScheme === 'dark' ? sectionBackground.dark : sectionBackground.light,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    placeholderText: {
        color: colorScheme === 'dark' ? text.dark : text.light,
        fontSize: 16,
    },
    cancelText: {
        color: colorScheme === 'dark' ? text.dark : text.light,
        fontSize: 16,
        marginTop: 20,
        textAlign: "center",
    },
    button: {
        backgroundColor: colorScheme === 'dark' ? sectionBackground.dark : sectionBackground.light,
        padding: 10,
        borderRadius: 5,
        marginBottom: 20,
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
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colorScheme === 'dark' ? background.dark : background.light,
        width: "100%",
        color: colorScheme === 'dark' ? text.dark : text.light,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        color: colorScheme === 'dark' ? text.dark : text.light,
    },
});




export const useHomeStyles = () => createHomeStyles(useColorScheme());

export const useLoginStyles = () => createLoginStyles(useColorScheme());

export const useProfileStyles = () => createProfileStyles(useColorScheme());

export const useListStyles = () => createListStyles(useColorScheme());

export const useCreateListStyles = () => createCreateListStyles(useColorScheme());

export const useListDetailStyles = () => createListDetailStyles(useColorScheme());

export const useModalStyles = () => createModalStyles(useColorScheme());