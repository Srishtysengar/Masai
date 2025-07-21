import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,
         GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } 
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore, doc, setDoc, addDoc, collection, getDoc, onSnapshot } 
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } 
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js";
import { query, orderBy } 
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "AIzaSyCGknG2-NkfYhRhT3BOC9MkO-78oMBdMyw",
  authDomain: "artcollab-f9d2e.firebaseapp.com",
  projectId: "artcollab-f9d2e",
  storageBucket: "artcollab-f9d2e.appspot.com",
  messagingSenderId: "353646450653",
  appId: "1:353646450653:web:2cc3de1757a83364d88834",
  databaseURL:"https://artcollab-f9d2e-default-rtdb.asia-southeast1.firebasedatabase.app/"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

async function loadProfile(userId) {
  const profileDoc = await getDoc(doc(db, "profiles", userId));
  if (profileDoc.exists()) {
    const data = profileDoc.data();
    document.getElementById("displayName").value = data.name || "";
    document.getElementById("bio").value = data.bio || "";

    
    let profileDisplay = document.getElementById("profileDisplay");
    if (!profileDisplay) {
      profileDisplay = document.createElement("div");
      profileDisplay.id = "profileDisplay";
      document.getElementById("profileSection").prepend(profileDisplay);
    }
    profileDisplay.innerHTML = `
      <h2>${data.name}</h2>
      <p>${data.bio}</p>
    `;
  }
}



const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const signupBtn = document.getElementById("signupBtn");
const loginEmailBtn = document.getElementById("loginEmailBtn");
const googleLoginBtn = document.getElementById("googleLoginBtn");

const editProfileBtn = document.getElementById("editProfileBtn");
const profileNameEl = document.getElementById("profileName");
const profileEmailEl = document.getElementById("profileEmail");
const profileBioEl = document.getElementById("profileBio");
const profileEditDiv = document.querySelector(".profile-edit");


document.getElementById("editProfileForm").style.display = "none";


signupBtn.onclick = async () => {
  const email = document.getElementById("email").value;
  const pass = document.getElementById("password").value;
  try {
    await createUserWithEmailAndPassword(auth, email, pass);
    alert("Signed up successfully!");
  } catch (err) {
    alert(err.message);
  }
};

loginEmailBtn.onclick = async () => {
  const email = document.getElementById("email").value;
  const pass = document.getElementById("password").value;
  try {
    await signInWithEmailAndPassword(auth, email, pass);
    alert("Logged in successfully!");

    authSection.style.display = "none";
    profileSection.style.display = "block";
    artSection.style.display = "block";
    projectSection.style.display = "block";
    logoutBtn.style.display = "inline-block";
    loginBtn.style.display = "none";
  } catch (err) {
    alert(err.message);
  }
};

googleLoginBtn.onclick = async () => {
  const provider = new GoogleAuthProvider();
  try {
    await signInWithPopup(auth, provider);
    alert("Logged in with Google!");

    authSection.style.display = "none";
    profileSection.style.display = "block";
    artSection.style.display = "block";
    projectSection.style.display = "block";
    logoutBtn.style.display = "inline-block";
    loginBtn.style.display = "none";
  } catch (err) {
    alert(err.message);
  }
};


onAuthStateChanged(auth, async (user) => {
  if (user) {
    // Show profile data
    const docRef = doc(db, "profiles", user.uid);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      const data = snap.data();
      profileNameEl.textContent = data.name || "Your Name";
      profileEmailEl.textContent = data.email || user.email;
      profileBioEl.textContent = data.bio || "No bio yet.";
      document.getElementById("displayName").value = data.name || "";
      document.getElementById("bio").value = data.bio || "";
    } else {
      profileNameEl.textContent = "Your Name";
      profileEmailEl.textContent = user.email;
      profileBioEl.textContent = "No bio yet.";
    }
  }
});

editProfileBtn.onclick = () => {
  document.getElementById("editProfileForm").style.display = "block";  // Show form
};




document.getElementById("saveProfileBtn").onclick = async () => {
  const name = document.getElementById("displayName").value.trim();
  const bio = document.getElementById("bio").value.trim();
  const user = auth.currentUser;

  if (!user) {
    alert("Not logged in");
    return;
  }
  if (!name || !bio) {
    alert("Please enter both name and bio!");
    return;
  }

  try {
    await setDoc(doc(db, "profiles", user.uid), {
      name,
      bio,
      email: user.email || "",
      updatedAt: Date.now()
    });

    alert("Profile saved successfully!");


    document.getElementById("editProfileForm").style.display = "none";

document.getElementById("profileName").textContent = name;
document.getElementById("profileEmail").textContent = user.email;
document.getElementById("profileBio").textContent = bio;


document.getElementById("editProfileForm").style.display = "none";


const newEditBtn = profileDisplay.querySelector("#editProfileBtn");
newEditBtn.onclick = () => {
  profileDisplay.remove();
  document.getElementById("editProfileForm").style.display = "block";
};


  } catch (err) {
    console.error("Error saving profile:", err);
   
  }
};



document.getElementById("portfolioUpload").addEventListener("change", async (e) => {
  const files = e.target.files;
  const user = auth.currentUser;
  if (!user) return alert("Not logged in");
  const gallery = document.getElementById("portfolioGallery");

  for (let file of files) {
    const storageRef = ref(storage, `portfolio/${user.uid}/${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    const img = document.createElement("img");
    img.src = url;
    gallery.appendChild(img);
  }
});


document.getElementById("uploadArtBtn").onclick = async () => {
  const file = document.getElementById("artUpload").files[0];
  const category = document.getElementById("categorySelect").value;
  const user = auth.currentUser;
  if (!file || !user) return alert("Select a file and login first");

  const storageRef = ref(storage, `artworks/${user.uid}/${file.name}`);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);

  await addDoc(collection(db, "artworks"), {
    userId: user.uid,
    url,
    category,
    timestamp: Date.now()
  });
  alert("Artwork uploaded!");
};


document.getElementById("createProjectBtn").onclick = async () => {
  const title = document.getElementById("projectTitle").value;
  const desc = document.getElementById("projectDesc").value;
  const user = auth.currentUser;
  if (!title || !desc || !user) return alert("Fill all fields and login");

  await addDoc(collection(db, "projects"), {
    owner: user.uid,
    title,
    desc,
    timestamp: Date.now()
  });
  alert("Project created!");
};

const chatBox = document.createElement("div");
chatBox.innerHTML = `
  <h3>Project Chat</h3>
  <div id="chatMessages" style="max-height:200px;overflow:auto;background:#f1f1f1;padding:10px;border-radius:8px;"></div>
  <input id="chatInput" placeholder="Type a message...">
  <button id="sendChatBtn">Send</button>
`;
document.getElementById("projectSection").appendChild(chatBox);

const messagesDiv = document.getElementById("chatMessages");
const chatInput = document.getElementById("chatInput");
const sendChatBtn = document.getElementById("sendChatBtn");


let activeProjectId = null;


function loadChat(projectId) {
  activeProjectId = projectId;
  const chatRef = collection(db, "projects", projectId, "chats");
  const q = query(chatRef, orderBy("timestamp"));

  onSnapshot(q, (snapshot) => {
    messagesDiv.innerHTML = "";
    snapshot.forEach((doc) => {
      const msg = doc.data();
      const p = document.createElement("p");
      p.textContent = `${msg.senderName || "User"}: ${msg.text}`;
      messagesDiv.appendChild(p);
    });
  });
}


sendChatBtn.onclick = async () => {
  const user = auth.currentUser;
  if (!user || !activeProjectId || !chatInput.value.trim()) return;

  await addDoc(collection(db, "projects", activeProjectId, "chats"), {
    senderId: user.uid,
    senderName: user.email,
    text: chatInput.value,
    timestamp: Date.now()
  });

  chatInput.value = "";
};