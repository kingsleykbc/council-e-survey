import { db } from './clientApp';
import { collection, getDocs, doc, onSnapshot, query, where, orderBy, getDoc } from 'firebase/firestore';
import { QueryParam } from '../utils/types';

/**
 * GET THE COLLECTION NAME
 * @param collectionName The collection
 * @returns {Array<Object>} Documents
 */
export const getDocuments = async (collectionName: string, queryParams: Array<QueryParam> = []) => {
	const collectionRef = collection(db, collectionName);
	const q = query(collectionRef, ...getQueryConstraints(queryParams));
	const data = await getDocs(q);
	return data.docs.map(doc => ({ ...doc.data(), id: doc.id }));
};

/**
 *
 * @param queryParams List of Query parameters
 * @returns {Array<any>} returns TS query parameters in firebase format
 */
export const getQueryConstraints = (queryParams: Array<QueryParam>): Array<any> => {
	const constraints = [];

	queryParams.forEach(({ field, value }) => {
		if (field === 'orderBy') constraints.push(orderBy(value));
		else if (field === 'where') constraints.push(where(value[0], value[1], value[2]));
	});

	return constraints;
};
