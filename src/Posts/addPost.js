import { collection, addDoc } from "firebase/firestore";  // Import the necessary Firestore functions
import { db } from "../firebase/firebase";


// Function to add a new post
const addPost = async (post) => {
    try {
        // Add a new document to the "posts" collection
        const docRef = await addDoc(collection(db, "posts"), {
            title: post.title,
            ShortDescription: post.ShortDescription,
            BriefDescription: post.BriefDescription,
            price: post.price,
        });

    } catch (e) {
        console.error("Error adding document: ", e);
    }
};


export default addPost;  // Export the addPost function for use in other files
