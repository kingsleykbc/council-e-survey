export interface QueryParam {
	field: 'where' | 'orderBy';
	value: any;
}

export interface Option {
	option: string;
}

export interface ResponseData {
	totalResponses: number;
	averageResponseTime: Date;
	userVoted: boolean;
	options: { [key: string]: { noResponses: number; selected: boolean } };
}

export interface AuthStateType {
	user: { uid: string; email: string; [key: string]: unknown };
	loading: boolean;
	isAuthenticated: boolean;
	isAdmin: boolean;
	userData: { fullName: string; email: string; id: string };
}
