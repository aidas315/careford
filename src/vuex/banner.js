import fireApp from '../firebase'
const db = fireApp.database().ref('banners')
const storage = fireApp.storage()

export default {
    state: {
        banners: []
    },
    mutations: {
        add_banner(state, paylaod) {
            state.banners.push(paylaod)
        },
        remove_banner(state, paylaod) {
            state.banners = state.banners.filter(banner => {
                return banner.id != paylaod
            })
        },
        // update_banner(state, payload) {
        //     const idx = state.banners.indexOf(banner => {
        //         return banner.id == payload.id || payload.id == banner.id
        //     })
        //     console.log(idx, payload)
        //     if (idx != -1) {
        //         state.banners[idx] = payload
        //     }
        // }
    },
    actions: {
        load_banners({ commit }) {
            commit('set_loading', true)
            db.once('value')
                .then(data => {
                    const banners = data.val()
                    for (let key in banners) {
                        let obj = {
                            ...banners[key],
                            id: key
                        }
                        commit('add_banner', obj)
                    }
                    commit('set_loading', false)
                }).catch(error => {
                    commit('set_loading', false)
                    console.log('Unexpected error at Load banners: ' + error)
                })
        },
        delete_banner({ commit }, payload) {
            return new Promise((resolve, reject) => {
                commit('set_loading', true)
                db.child(payload).remove()
                    .then(res => {
                        commit('remove_banner', payload)
                        commit('set_loading', true)
                        resolve(res)
                    })
                    .catch(err => {
                        commit('set_loading', true)
                        reject(err)
                    })
            })
        },
        create_banner({ commit }, payload) {
            return new Promise((resolve, reject) => {
                commit('set_loading', true)
                let image = payload.image
                // delete payload.image
                console.log(image);
                

                let fname = payload.title
                let task = storage.ref(fname.replace(',', '') + (Math.random() * Math.random()) + new Date()).put(image)
                task.then(snapshot => snapshot.ref.getDownloadURL())
                    .then(url => {
                        payload = {
                            ...payload,
                            image: url
                        }
                        db.push(payload).then(data => {
                            commit('set_loading', false)
                            commit('add_banner', {
                                ...payload,
                                id: data.key
                            })
                            resolve(data)
                        }).catch(err => {
                            commit('set_loading', false)
                            reject(err)
                        })
                    })
            })
        }
    },
    getters: {
        banners: (state) => {
            return state.banners
        },
        banner: (state) => {
            return (param) => {
                return state.banners.find(banner => {
                    return banner.id == param || banner.title == param
                })
            }
        },
    }
}