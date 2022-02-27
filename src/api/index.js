// eslint-disable-next-line import/no-cycle
import axios from './request';

// const baseUrl = 'https://ai.yun36.com/api.php?s=App.Aidata_';
const baseUrl = '/api.php?s=App.Aidata_';

export const getArticle = (parameter) => axios('post', `${baseUrl}Article.GetList`, parameter)
export const getCategory = (parameter) => axios('post', `${baseUrl}Category.GetList`, parameter)
export const getKeyword = (parameter) => axios('post', `${baseUrl}Keyword.GetList`, parameter)
export const getSummary = (parameter) => axios('post', `${baseUrl}Summary.Detail`, parameter)
