import { useEffect, useState } from 'react';
import { db } from '../firebase/clientApp';
import { collection, onSnapshot, doc, query } from 'firebase/firestore';

export const useGetCollection = (collectionName, id = null, queryParams = {}) => {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		try {
			const collectionRef = collection(db, collectionName);
			const q = query(collectionRef);
			setLoading(true);
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
		}
	}, []);

	return [data, loading, error];
};
