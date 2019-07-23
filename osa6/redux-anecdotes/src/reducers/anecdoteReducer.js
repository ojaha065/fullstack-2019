const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.', // True!
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  };
};

const orderAnecdotes = (anecdotes) => {
  return anecdotes.sort((a,b) => {
    return b.votes > a.votes;
  });
};

let initialState = anecdotesAtStart.map(asObject);
initialState = orderAnecdotes(initialState);

const anecdoteReducer = (state = initialState, action) => {
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
    default:
      return state;
  }
};

export const addNew = (content) => {
  return {
    type: "ADD_NEW",
    data: asObject(content)
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

export default anecdoteReducer;