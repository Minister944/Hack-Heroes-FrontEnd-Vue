import axios from "axios";
import VueCookies from 'vue-cookies'

const state = () => ({
    loginApiStatus: '',
    userProfile: {
        login: '',
        email: '',
        lvl: 0,
    },
    logOut: false,
});

const getters = {
    getLoginApiStatus(state) {
        return state.loginApiStatus
    },
    getuserProfile(state) {
        return state.userProfile
    },
    getLogout(state){
        return state.logOut;
    }
};

const actions = {
    async loginApi({ commit }, payload) {
        const response = await axios.post("http://46.41.136.62:5000/api/v1/users/login", payload, { 'Access-Control-Allow-Credentials': true/*, credentials: 'include'*/ },).catch((err) => {
            console.log(err)
        })
        if (response && response.data.status == "loged in") {
            commit('setLoginApiStatus', 'success')
            VueCookies.set("token", response.data.token, '180d')
            localStorage.setItem('isAuthenticated', "true")
        } else {
            commit('setLoginApiStatus', 'failed')
        }
    },
    async userProfile({ commit }) {
        const response = await axios.post("http://46.41.136.62:5000/api/v1/users/checkUserToken", '', {
            headers: {
                'Access-Control-Allow-Credentials': true,
                'Authorization': 'Bearer ' + VueCookies.get('token')
            }
        })
            .catch((err) => {
                console.log(err)
            })
        
        if (response && response.data) {
            console.log(response.data)
            commit('setuserProfile', response.data)
        }

    },
    async userLogout({commit}){
        localStorage.removeItem('isAuthenticated')
        VueCookies.remove('token')
        commit("setLogout", true)
        
    }
};

const mutations = {
    setLoginApiStatus(state, data) {
        state.loginApiStatus = data
    },
    setuserProfile(state, data) {
        state.userProfile = {
            login: data.login,
            email: data.email,
            lvl: data.poziom,
        }
    },
    setLogout(state, data){
        state.logOut = data;
       }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};