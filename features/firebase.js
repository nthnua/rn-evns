// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { onSnapshot, query, addDoc, collection, doc, getFirestore, where, getDocs, updateDoc, arrayUnion, arrayRemove, getDoc } from 'firebase/firestore'
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
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
const auth = getAuth(app)

export function signUp () {
  createUserWithEmailAndPassword(auth, 'test@nullish.tech', 'testpwd')
    .then(data => console.log(data)).catch(err => console.error(err))
}
export function signIn (email, password) {
  const auth = getAuth()
  return signInWithEmailAndPassword(auth, email, password)
}
export function atchSignIn (setFresh, setAdminInfo) {
  onAuthStateChanged(auth, user => {
    if (user) {
      setAdminInfo({
        isAdmin: true,
        userId: user.uid
      })
      setFresh(false)
    } else {
      setAdminInfo({
        isAdmin: false,
        userId: ''
      })
    }
  })
}
export function signOutAdmin () {
  signOut(auth)
}

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
export function getChannels (chnls) {
  const chnlRef = collection(db, 'channels')
  const chnlQuery = query(chnlRef, where('id', 'in', chnls))
  return getDocs(chnlQuery)
}
export function getAdminChannels (userId) {
  const userRef = doc(db, 'admins', `${userId}`)
  return getDoc(userRef).then(userSnap => {
    const chnlRef = collection(db, 'channels')
    const chnlQuery = query(chnlRef, where('id', 'in', userSnap.get('channels')))
    return getDocs(chnlQuery)
  }).catch(err => console.error(err))
}
export function getNotSubscribedChannels (chnls) {
  const chnlRef = collection(db, 'channels')
  const chnlQuery = query(chnlRef, where('id', 'not-in', [...chnls]))
  return getDocs(chnlQuery)
}
export function getAllChnnels () {
  const chnlRef = collection(db, 'channels')
  const chnlQuery = query(chnlRef)
  return getDocs(chnlQuery)
}
export function subscribeToChannel (userId, chnlIds) {
  const userRef = doc(db, 'users', `${userId}`)
  return updateDoc(userRef, {
    subscriptions: arrayUnion(...chnlIds)
  })
}
export function removeSubscriptions (userId, chnlId) {
  const userRef = doc(db, 'users', `${userId}`)
  return updateDoc(userRef, {
    subscriptions: arrayRemove(chnlId)
  })
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

export function subscribe (chnlId, setPosts, setLoading) {
  const q = query(collection(db, 'posts'), where('channelId', '==', `${chnlId}`))
  return onSnapshot(q, (postsSnap) => {
    setPosts(postsSnap.docs)
    setLoading(false)
  })
}
export function sendMessage (channelId, adminId, body, title, contacts, urls, imgUrl) {
  const adminRef = doc(db, 'admins', `${adminId}`)
  return getDoc(adminRef).then(adminSnap => {
    const author = adminSnap.get('name')
    return addDoc(collection(db, 'posts'), {
      channelId,
      author,
      body,
      title,
      contacts,
      id: Math.ceil(Math.random() * 100000000000),
      time: Date.now(),
      imgUrl,
      urls
    })
  }).catch(err => console.error(err))
}
