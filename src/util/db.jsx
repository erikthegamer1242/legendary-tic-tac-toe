import app from"../firebaseconf"
import {useEffect, useState} from "react";
import { collection, addDoc, getDocs, doc, getDoc, query, QuerySnapshot } from "firebase/firestore";
import {getFirestore} from "firebase/firestore";

const db = getFirestore(app);

export const fetchBoard = (setData) => {
    console.log('fetchBoard()');

    try {
        const unsubscribe = db.collection('users').onSnapshot((querySnapshot) => {
            const data = querySnapshot.docs.map((doc) => doc.data());
            console.log('board', data);

            setData(data);
        });
        return unsubscribe;
    }
    catch (error) {
        console.error('Error fetching: ', error);
    }
}