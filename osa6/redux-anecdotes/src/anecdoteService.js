import axios from "axios";

const apiUrl = "http://localhost:8000/anecdotes";

const getAll = () => {
    return axios.get(apiUrl);
};
const saveNew = (data) => {
    return axios.post(apiUrl,data);
};
const saveVote = async (id) => {
    let currentVotes = await axios.get(`${apiUrl}/${id}`);
    currentVotes = currentVotes.data.votes || 0;
    axios.patch(`${apiUrl}/${id}`,{
        votes: ++currentVotes
    });
};

export default { getAll, saveNew, saveVote };