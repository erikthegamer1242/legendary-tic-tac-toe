import app from"../firebaseconf"
import { collection, getDocs, doc, setDoc, getFirestore } from "firebase/firestore";

export const db = getFirestore(app);

export async function addData(squares, inner_idxLoc, outer_idxLoc, localWinners, lastMoveLocation, xIsNext, winner, nasLocalWinner) {
    let squares1d = []
    console.log("addData", squares, inner_idxLoc, outer_idxLoc);
    for (var square in squares) {
        for (var cell in squares[square]) {
            squares1d.push(squares[square][cell])
        }
    }
    //console.log(squares1d);
    //console.log('test');
    squares1d.push(inner_idxLoc);
    squares1d.push(outer_idxLoc);
    squares1d.push(localWinners);
    squares1d.push(lastMoveLocation);
    squares1d.push(xIsNext);
    squares1d.push(winner);
    squares1d.push(nasLocalWinner);
    console.log("add", squares1d);
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
    let squares1d = Array(88).fill(null)
    try {
        const docRef = await setDoc(doc(db, "moves", "moves"), {
            squares: squares1d
        });
        console.log("Document written");
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}