import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyBHLmDdo6abfrM8XIzu-2IZWyY3mu6HxCM",
  authDomain: "netflix-team-alpha.firebaseapp.com",
  projectId: "netflix-team-alpha",
  storageBucket: "netflix-team-alpha.firebasestorage.app",
  messagingSenderId: "80336405470",
  appId: "1:80336405470:web:5a77e1256931b0961c534f"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db =getFirestore(app);

const signup = async(name,email,password)=>{
    try{
        const res = await createUserWithEmailAndPassword(auth,email,password);
        const user = res.user;
        await addDoc(collection(db,"users"),{
            uid:user.uid,
            name,
            authProvider:"local",
            email,
        })

    }catch(error){
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));

    }
    

}
const login =async (email,password)=>{
    try{
        await signInWithEmailAndPassword(auth,email,password);


    } catch(error){
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));

    }

}
const logout = ()=>{
    signOut(auth);
}
export{auth, db ,login,signup,logout};