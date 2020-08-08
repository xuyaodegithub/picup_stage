/**
 * Created by Yan on 19/12/14.
 */
import { userList,userHisList,setUserTag,userOrderList,giveUserPoints} from '@/apis/user'

const actions={
    popoverAlert(context,data){
        context.commit('CHANGE_POPOVER_STATUS',data)
    },
    userListAction(context,data){
        if(data) context.commit('SET_USERLIST',data);
        userList(context.state.parameterList.userListMM).then(res=>context.commit('GET_USERLIST',res.data))
    },
    userHisListAction(context,data){
        if(data) context.commit('SET_USERHISLIST',data);
        userHisList(context.state.parameterList.userHisListMM).then(res=>context.commit('GET_USERHISLIST',res.data))
    },
    setUserTagAction(context,data){
        setUserTag(data).then(res=>context.dispatch('userListAction'))
    },
    userOrderListAction(context,data){
        if(data) context.commit('SET_USERORDERLIST',data);
        userOrderList(context.state.parameterList.userOrderListMM).then(res=>context.commit('GET_USERORDERLIST',res.data))
    },
    giveUserPointsAction(context,data){
        giveUserPoints(data).then(res=>{
            if(!res.code){
                context.dispatch('userListAction')
                context.dispatch('popoverAlert')
            }
        })
    }
}


export default actions
