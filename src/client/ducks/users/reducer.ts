import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { UserDocument } from '../../../server/users/models/users.model';
import { getUsers } from '../../main-page/async-fns';

type BlogSlice = {
    users: UserDocument[] | null;
};

const initialState: BlogSlice = {
    users: null,
};

export const getData = createAsyncThunk<UserDocument[]>(
    'userSlice/getData',
    async () => {
        const response = await getUsers();

        return response.data;
    }
);

const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getData.fulfilled, (state, { payload }) => {
                state.users = payload
            })
    }
});

export default userSlice;
