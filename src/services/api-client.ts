import axios from "axios";

export default axios.create({
  baseURL: 'https://calm-woodland-21789-b98acf1fada1.herokuapp.com/api',
  timeout: 5000
})

