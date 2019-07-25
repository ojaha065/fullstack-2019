import anecdoteService from "../anecdoteService";

const orderAnecdotes = (anecdotes) => {
  return anecdotes.sort((a,b) => {
    return b.votes > a.votes;
  });
};

const anecdoteReducer = (state = [], action) => {
  let newState = [...state];

  switch(action.type){
    case "ADD_VOTE":
      const selected_index = newState.findIndex((anecdote) => {
        return anecdote.id === action.data.id;
      });
      if(selected_index !== -1){
        newState[selected_index].votes++;
        newState = orderAnecdotes(newState);
        return newState
      }
      else{
        return state;
      }
    case "ADD_NEW":
      if(action.data.content){
        newState.push(action.data);
        return newState;
      }
      else{
        return state;
      }
    case "INIT":
      return action.data;
    default:
      return state;
  }
};

export const addNew = (content) => {
  return dispatch => {
    anecdoteService.saveNew({
      content: content,
      votes: 0
    }).then((response) => {
      dispatch({
        type: "ADD_NEW",
        data: response.data
      });
    }).catch((error) => {
      // Tässä voisi näyttää vaikka virhenotificaation
      console.error(error);
    });
  };
};
export const addVote = (id) => {
  return {
    type: "ADD_VOTE",
    data: {
      id: id
    }
  };
};
export const initAnecdotes = () => {
  return dispatch => {
     anecdoteService.getAll().then((response) => {
      dispatch({
        type: "INIT",
        data: response.data
      });
     }).catch((error) => {
      // Tässä voisi näyttää vaikka virhenotificaation
      console.error(error);
     });
  };
};

export default anecdoteReducer;