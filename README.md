#Add info to firebase
const ref=collection(firestore,'users');
setDoc(doc(ref),
{
name: "Yaniv",
Email: "yanivank@gmail.com"
});
