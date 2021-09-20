import blogsSlice from './blogs';

export {
    getData,
    createNewBlogArticle,
    deleteBlogArticle,
    getBlogArticle,
    resetBlog,
    changeBlogArticle
} from './blogs';

export default blogsSlice.reducer;
