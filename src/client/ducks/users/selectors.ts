import { RootState } from '../../store';

export const usersSelector = ({ userSlice }: RootState) => userSlice.users;
