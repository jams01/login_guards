import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, UserCredential } from '@angular/fire/auth';
import { doc, docData, Firestore, setDoc } from '@angular/fire/firestore';
import { getStorage, ref, uploadBytes } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthFirebaseService {

  constructor(private auth: Auth, private firestore: Firestore) { }

  login(data: any){
    return new Promise((resolve, reject)=>{
      signInWithEmailAndPassword(this.auth, data.email, data.password).then((user: UserCredential)=>{
        const docref = doc(this.firestore, 'usuarios/'+user.user.uid);
        const infouser = docData(docref, {idField: 'id'});
        infouser.subscribe((data)=>{
          console.log(data);
        });
        resolve(user);
      });
    });
    
  }

  register(data: any, foto: Blob){
    return new Promise((resolve, reject)=>{
      createUserWithEmailAndPassword(this.auth,  data.email, data.password).then((user: UserCredential)=>{
        const storage = getStorage();
        const fileref = ref(storage,  user.user.uid + ".jpg"); 
        uploadBytes(fileref, foto).then((dataf)=>{
          console.log(dataf.ref.fullPath);
          const docref = doc(this.firestore, 'usuarios/'+user.user.uid);
        try{
          const res=setDoc(docref, {name: data.name, lastname:data.lastname, tipouser: 1, image: dataf.ref.fullPath});
          resolve(user.user.uid);
        }catch{
          reject(false);
        }
        })
        
      });
    })
    
  }

  logout(){
    return new Promise((resolve, reject)=>{
      signOut(this.auth).then(()=>{
        resolve(true);
      });
    });
    
  }
}
