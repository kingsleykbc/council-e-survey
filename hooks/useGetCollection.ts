import { useEffect, useState } from 'react';
import { db } from '../firebase/clientApp';
import { collection, onSnapshot, doc, query, where, orderBy, getDoc } from 'firebase/firestore';
import { getQueryConstraints } from '../firebase/clientUtils';
import { QueryParam } from '../utils/types';

// HOOK TO RETRIEVE DATA FROM FIRESTORE
export const useGetCollection = (collectionName, id = null, queryParams: Array<QueryParam> = []) => {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	// On component load, subscribe to the snapshot (for realtime client update)
	useEffect(() => {
		try {
			setLoading(true);
			const collectionRef = collection(db, collectionName);
			const q = query(collectionRef, ...getQueryConstraints(queryParams));
			const unsub = id
				? onSnapshot(doc(db, collectionName, id || ''), doc => {
						setData(doc.data());
						setLoading(false);
				  })
				: onSnapshot(q, snapshot => {
						setData(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
						setLoading(false);
				  });
			return unsub;
		} catch (e) {
			setError(e.message);
			setLoading(false);
		}
	}, []);

	return [data, loading, error];
};

