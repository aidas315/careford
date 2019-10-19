import fireApp from '../firebase'
const auth = fireApp.auth()

export default {
    state: {
        user: null,
    },
    mutations: {
        set_user(state, payload) {
            state.user = payload
        }
    },
    actions: {
        check_authentication({ commit }) {
            auth.onAuthStateChanged(user => {
                if (user) {
                    commit('set_user', user)
                }
            })
        },
        login({ commit }, payload) { 
            return new Promise((resolve, reject) => {
                commit('set_loading', true)
                auth.signInWithEmailAndPassword(payload.email, payload.password)
                .then(data => {
                        commit('set_user', data.user)
                        commit('set_loading', false)
                        resolve(data.user)
                    
                }).catch(error => {
                    console.log('Unexpected error in login: ' + error)
                    commit('set_loading', false)
                    reject(error)
                })
            })
        },
        logout({ commit }) {
            commit('set_loading', true)
            auth.signOut()
            .then(_ => {
                commit('set_user', null)
                commit('set_loading', false)
            }).catch(error => {
                console.log('Unexpected error in logout: ' + error)
                commit('set_loading', false)
            })
        }
    },
    getters: {
        authenticated: (state) => {
            return state.user != null
        },
        current_user: (state) => {
            return state.user
        }
    }
}