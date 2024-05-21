import app from"../firebaseconf"
import { collection, getDocs, doc, setDoc, getFirestore } from "firebase/firestore";

export const db = getFirestore(app);

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

export async function clearBoard() {
    let squares1d = Array(81).fill(null)
    try {
        const docRef = await setDoc(doc(db, "moves", "moves"), {
            squares: squares1d
        });
        console.log("Document written");
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}