import {
    IonAvatar, IonButton,
    IonContent,
    IonHeader, IonInput,
    IonItem,
    IonLabel,
    IonList,
    IonPage,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {Router, useHistory} from "react-router";
import {useEffect, useState} from "react";
import { collection, addDoc, getDocs, doc, getDoc } from "firebase/firestore";
import {getFirestore} from "firebase/firestore";
//import '../firebaseconf';

const Home: React.FC = () => {
    const db = getFirestore();

    useEffect(()=>{
        getData();
    }, []);

    async function getData() {
        const querySnapshot = await getDocs(collection(db, "users"));
        console.log(querySnapshot);
        let nigg = [] ;
        var idx = 0;
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data()}`);
            console.log('doc', doc);
            nigg[idx] = doc;
            idx++;
            
        });
        return nigg;
    }

    

    async function addData() {
        console.log('test');
        try {
            const docRef = await addDoc(collection(db, "users"), {
                first: "Ada",
                last: "Lovelace",
                born: 1815
            });
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    let a = getData()

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Blank</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonButton onClick={addData}>Add Data</IonButton>
            </IonContent>
        </IonPage>
    );
};
export default Home;