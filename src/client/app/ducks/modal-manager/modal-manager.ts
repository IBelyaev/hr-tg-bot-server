import { createSlice, createAction } from '@reduxjs/toolkit';

export enum ModalTypes {
    createBlogModal = 'createBlogModal',
};

type ModalSlice = {
    openModalType: keyof typeof ModalTypes | null;
};

const initialState: ModalSlice = {
    openModalType: null,
};

const modalManager = createSlice({
    name: 'modalManager',
    initialState,
    reducers: {
        openModal: (state, {payload}) => {
            state.openModalType = payload;
        },
        closeModal: (state) => {
            state.openModalType = null;
        },
    },
});

export const { openModal, closeModal } = modalManager.actions;

export default modalManager;
