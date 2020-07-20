import state from "./state";

const mutations={
    CHANGE_POPOVER_STATUS(state,where){
        state.popoverAlive.openOrclose=!state.popoverAlive.openOrclose;
        if(typeof where==="object"){
            state.popoverAlive.title=where[0];
            state.popoverAlive.information=where[1];
        } else state.popoverAlive.title=where
    },
    SET_USERLIST(state,data){
        state.parameterList.userListMM=data;
    },
    GET_USERLIST(state,data){
        state.userList=data;
    },
    SET_USERHISLIST(state,data){
        state.parameterList.userHisListMM=data;
    },
    GET_USERHISLIST(state,data){
        state.userHisList=data;
    },
    GET_SELLERINFO(state,loginInfo){
        state.sellerInfo=loginInfo;
    }
}

export default mutations
