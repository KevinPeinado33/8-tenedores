import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Input, Icon, Button } from 'react-native-elements';
import { isEmpty } from 'lodash';
import{ useNavigation } from '@react-navigation/native';

import { validateEmail } from '../../utils/validation';
import Loading from '../Loading';

import * as firebase from 'firebase';

export default function LoginForm({ toastRef }) {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState(defaultFormValue());
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();

    const onSumbit = () => {
        if(isEmpty(formData.email) || isEmpty(formData.password)) {
            toastRef.current.show("Formulario Vacio");
        } else if(!validateEmail(formData.email)) {
            toastRef.current.show("El email no es correcto");
        } else {
            setLoading(true);
            firebase
                .auth()
                .signInWithEmailAndPassword(formData.email, formData.password)
                .then(() => {
                    setLoading(false);
                    navigation.navigate("account");
                }).catch(() => {
                    setLoading(false);
                    toastRef.current.show("Email o Contraseña Incorrecto")
                });
        }
    }

    const onChange = (e, type) => {
        setFormData({...formData, [type]:e.nativeEvent.text})
    }

    return(
        <View style={styles.formContainer}>
            <Input 
                placeholder="Correo electronico"
                containerStyle={styles.inputForm}
                onChange={e => onChange(e, "email")}
                rightIcon={
                    <Icon 
                        type="material-community"
                        name="at"
                        iconStyle={styles.iconRigth}
                    />
                }
            />
            <Input 
                placeholder="Contraseña"
                containerStyle={styles.inputForm}
                password={true}
                onChange={e => onChange(e, "password")}
                secureTextEntry={showPassword ? false : true}
                rightIcon={
                    <Icon 
                        type="material-community"
                        name={showPassword ? "eye-off-outline" : "eye-outline"}
                        iconStyle={styles.iconRigth}
                        onPress={() => setShowPassword(!showPassword)}
                    />
                }
            />
            <Button 
                title="Iniciar Sesión"
                containerStyle={styles.btnContainerLogin}
                buttonStyle={styles.btnLogin}
                onPress={onSumbit}
            />
            <Loading isVisible={loading} text="Iniciando Sesión" />
        </View>
    );
}

const defaultFormValue = () =>{
    return { email:"", password: "" }
}

const styles = StyleSheet.create({
    formContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30
    },
    inputForm: {
        width: "100%",
        marginTop: 10
    },
    btnContainerLogin: {
        marginTop: 20,
        width:"95%"
    },
    btnLogin: {
        backgroundColor: "#00a680"
    },
    iconRigth: {
        color: "#c1c1c1"
    }
});