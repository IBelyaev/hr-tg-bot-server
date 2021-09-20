import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// import { Blog } from '../../../../server/blogs/models/blog.model';

type Blog = any;

export type BlogInfo = {
    title: string;
    description: string;
    author: string;
    date: number;
    _id: string;
};

type BlogSlice = {
    blogsList: BlogInfo[] | null;
    currentBlog: BlogInfo | null;
};

const initialState: BlogSlice = {
    blogsList: null,
    currentBlog: null,
};

export const getData = createAsyncThunk<BlogInfo[]>(
    'blogSlice/getData',
    async () => {
        const response = await axios.get('http://localhost:8000/blogs');

        return response.data;
    }
);

export const createNewBlogArticle = createAsyncThunk<BlogInfo[], Blog>(
    'blogSlice/createBlogArticle',
    async (articleData) => {
        await axios.post('http://localhost:8000/blog', articleData);
        
        const response = await axios.get('http://localhost:8000/blogs');

        return response.data;
    }
);

export const deleteBlogArticle = createAsyncThunk<BlogInfo[], string>(
    'blogSlice/deleteBlogArticle',
    async (id) => {
        await axios.delete(`http://localhost:8000/blog/${id}`);
        
        const response = await axios.get('http://localhost:8000/blogs');

        return response.data;
    }
);

export const getBlogArticle = createAsyncThunk<BlogInfo, string>(
    'blogSlice/getBlogArticle',
    async (id) => {
        const response = await axios.get(`http://localhost:8000/blog/?blog_id=${id}`);
    
        return response.data[0];
    }
);

export type ChangeBlogArticleArgs = {
    id: string,
    data: BlogInfo
};

export const changeBlogArticle = createAsyncThunk<BlogInfo[], ChangeBlogArticleArgs>(
    'blogSlice/changeBlogArticle',
    async ({id, data}) => {
        await axios.put(`http://localhost:8000/blog/${id}`, {...data, _id: id});

        const response = await axios.get('http://localhost:8000/blogs');

        return response.data;
    }
);

const blogsSlice = createSlice({
    name: 'blogSlice',
    initialState,
    reducers: {
        resetBlog(state) {
            state.currentBlog = null;
        } 
    },
    extraReducers: builder => {
        builder
            .addCase(getData.fulfilled, (state, { payload }) => {
                state.blogsList = payload
            })
            .addCase(createNewBlogArticle.fulfilled, (state, { payload }) => {
                state.blogsList = payload
            })
            .addCase(deleteBlogArticle.fulfilled, (state, { payload }) => {
                state.blogsList = payload
            })
            .addCase(getBlogArticle.fulfilled, (state, { payload }) => {
                state.currentBlog = payload
            })
            .addCase(changeBlogArticle.fulfilled, (state, { payload })=> {
                state.blogsList = payload,
                state.currentBlog = null
            })
    }
});

export const { resetBlog } = blogsSlice.actions;

export default blogsSlice;
