import axios from "axios";

export default axios.create({
    baseURL: "http://localhost:7023",
    responseType: "json"
});