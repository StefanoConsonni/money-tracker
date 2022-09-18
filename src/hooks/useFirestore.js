import { useReducer, useEffect, useState } from "react";
import { projectFirestore, timestamp } from "../firebase/config";

let initialState = {
	document: null,
	isPending: false,
	error: null,
	success: null,
};

const firestoreReducer = (state, action) => {
	switch (action.type) {
		case "IS_PENDING":
			return { isPending: true, success: false, error: null, document: null };
		case "ADDED_DOCUMENT":
			return { isPending: false, success: true, error: null, document: action.payload };
		case "DELETED_DOCUMENT":
			return { isPending: false, document: null, success: true, error: null };
		case "ERROR":
			return { isPending: false, success: false, error: action.payload, document: null };
		default:
			return state;
	}
};

export const useFirestore = (collection) => {
	const [response, dispatch] = useReducer(firestoreReducer, initialState);
	const [isCancelled, setIsCancelled] = useState(false);

	// collection ref
	const ref = projectFirestore.collection(collection);

	// only dispatch if not cancelled
	const dispatchIfNotCancelled = (action) => {
		if (!isCancelled) {
			dispatch(action);
		}
	};

	// add a document
	const addDocument = async (doc) => {
		dispatch({ type: "IS_PENDING" });

		try {
			const createdAt = timestamp.fromDate(new Date());
			const addedDocument = await ref.add({ ...doc, createdAt });
			dispatchIfNotCancelled({ type: "ADDED_DOCUMENT", payload: addedDocument });
		} catch (err) {
			dispatchIfNotCancelled({ type: "ERROR", payload: err.message });
		}
	};

	// delete a document
	const deleteDocument = async (id) => {
		dispatch({ type: "IS_PENDING" });

		try {
			await ref.doc(id).delete();
			dispatchIfNotCancelled({ type: "DELETE_DOCUMENT" });
		} catch (err) {
			dispatchIfNotCancelled({ type: "ERROR", payload: "could not delete" });
		}
	};

	useEffect(() => {
		return () => setIsCancelled(true);
	}, []);

	return { addDocument, deleteDocument, response };
};
