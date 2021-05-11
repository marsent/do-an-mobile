const React = require("react-native");

const { StyleSheet } = React;

export default StyleSheet.create({
    fontInter: {
        fontFamily: 'Inter'
    },
    container: {
        flex: 1,
        alignItems: 'center',

    },
    image: {
        width: 24,
        height: 24,
    },
    headerText: {
        position: "relative",
        fontSize: 20,
        fontFamily: 'Inter'

    },
    headerView: {
        position: 'relative',
        top: 10,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputView: {
        position: 'relative',
        width: "90%",
        marginBottom: 30
    },
    input: {
        position: 'relative',
        padding: 10,
        backgroundColor: "#F8FAFD",
        borderWidth: 1,
        borderRadius: 20,
        borderColor: '#E9EEF4',
        fontFamily: 'Inter',
        marginTop: 15
    },
    inputArea: {
        height: 150
    },
    button: {
        position: 'relative',
        fontFamily: 'Inter',
    },
    textErr: {
        color: "#ED557A", paddingLeft: 10,
        fontFamily: 'Inter'

    },
    borderErr: {
        borderColor: '#ED557A'
    },
    viewPicker: {

    },
    inputDateTime: {
        width: '85%',
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        marginRight: 0
    },
    btnDateTime: {
        display: 'flex',
        height: '100%',
        width: '15%',
        alignItems: 'center',
        paddingTop: 10,
        backgroundColor: '#F8FAFD',
        borderBottomRightRadius: 20,
        borderTopRightRadius: 20
    },
    viewRadioGroup: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15
    },
    viewRadio: {
        width: '50%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: 20

    },
    textIRI: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 15,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#E9EEF4',
    }
})