// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { addDoc, collection, getDoc, doc, getFirestore, query, where, getDocs } from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAlOjk030KMmlLTwDUWTVD1vB-T_3o_Ij8',
  authDomain: 'rn-evns.firebaseapp.com',
  projectId: 'rn-evns',
  storageBucket: 'rn-evns.appspot.com',
  messagingSenderId: '696181640992',
  appId: '1:696181640992:web:f87d921e78aaf7168f1145'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export async function addUser (userId, name, type, subscriptions) {
  try {
    await addDoc(collection(getFirestore(), 'users', '1'), {
      name,
      type,
      subscriptions,
      timestamp: Date.now()
    })
  } catch (e) {
    console.error(e)
  }
}
export function getChannels (userId) {
  const usersRef = collection(db, 'users')
  const q = query(usersRef, where('id', '==', `${userId}`))
  return getDocs(q).then(qs => {
    const chnlRef = collection(db, 'channels')
    const chnlQuery = query(chnlRef, where('id', 'in', qs.docs[0].get('subscriptions')))
    return getDocs(chnlQuery)
  }).catch(err => console.error(err))
}
export function getPosts (chnlId) {
  const chnlRef = collection(db, 'channels')
  const chnlQuery = query(chnlRef, where('id', '==', `${chnlId}`))
  return getDocs(chnlQuery).then(qs => {
    const postsRef = collection(db, 'posts')
    const chnlQuery = query(postsRef, where('id', 'in', qs.docs[0].get('posts')))
    return getDocs(chnlQuery)
  }).catch(err => console.error(err))
}
