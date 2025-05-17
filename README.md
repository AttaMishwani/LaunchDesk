Issue:
The profile form was initializing its state (formData) before the fresh user data arrived, and we were fetching the user too early (using auth.currentUser on mount). As a result, the form showed empty or stale values, and edits “disappeared” after a refresh because we weren’t consistently pulling from Firestore.

Root Causes:

Fetching Firestore data before Firebase Auth had initialized (auth.currentUser was null).

Initializing formData directly from props on first render, so updates to user didn’t update the form state.

Multiple sources of truth (localStorage + Redux + Firestore) causing inconsistencies.

Key Fixes:

Use onAuthStateChanged to wait for the authenticated user before fetching Firestore.

Initialize formData inside a useEffect that runs when the user prop changes.

Remove localStorage persistence and rely solely on Firestore → Redux for user data.
