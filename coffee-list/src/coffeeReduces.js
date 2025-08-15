const initialState={
    loading:false,
    data:[],
    error:null
};

export const coffeeReducer = (state=initialState,action)=>{
    switch (action.type) {
        case "FETCH_COFFEE_REQUEST":
            return {...state,loading:true};
        case "FETCH_COFFEE_SUCCESS":
            return {...state,loading:false,data:action.payload};
        case "FETCH_COFFEE_FAILURE":
            return {...state,loading:false,data:action.payload};
    default:
        return state;
    }
}
