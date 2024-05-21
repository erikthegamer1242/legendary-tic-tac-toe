import app from"../firebaseconf"
import {useEffect, useState} from "react";
import { collection, addDoc, getDocs, doc, getDoc, query, QuerySnapshot, setDoc } from "firebase/firestore";

const db = app;

export const fetchPost = async () => {
    await getDocs(collection(db, "moves"))
        .then((querySnapshot)=>{               
            const newData = querySnapshot.docs
                .map((doc) => ({...doc.data(), id:doc.id }));
            let squares = []
            let newSquares = newData[0]['squares']
            while(newSquares.length) squares.push(newSquares.splice(0,9));
            console.log(squares);
            return squares;
        })
}

export async function addData(squares) {
    let squares1d = []
    for (var square in squares) {
        for (var cell in squares[square]) {
            squares1d.push(squares[square][cell])
        }
    }
    //console.log(squares1d);
    //console.log('test');
    try {
        const docRef = await setDoc(doc(db, "moves", "moves"), {
            squares: squares1d
        });
        console.log("Document written");
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}