import fireApp from '../firebase'
const db = fireApp.database().ref('categories')

export default {
    state: {
        categories: []
    },
    mutations: {
        add_category(state, paylaod) {
            state.categories.push(paylaod)
        },
        remove_category(state, paylaod) {
            state.categories = state.categories.filter(category => {
                return category.id != paylaod
            })
        },
        update_category(state, payload) {
            const idx = state.categories.indexOf(category => {
                return category.id == payload.id || payload.id == category.id
            })
            console.log(idx, payload)
            if (idx != -1) {
                state.categories[idx] = payload
            }
        }
    },
    actions: {
        load_categories({ commit }) {
            commit('set_loading', true)
            db.once('value')
            .then(data => {
                const categories = data.val()
                for (let key in categories) {
                    let obj = {
                        ...categories[key],
                        id: key
                    }
                    commit('add_category', obj)
                }
                commit('set_loading', false)
            }).catch(error => {
                commit('set_loading', false)
                console.log('Unexpected error at Load Categories: ' + error)
            })
        },
        create_category({ commit }, paylaod) {
            return new Promise((resolve, reject) => {
                commit('set_loading', true)
                db.push(paylaod)
                .then(data => {

                    if (paylaod.parent) {
                        db.child(paylaod.parent).once('value')
                            .then(snapshot => {
                                let category = snapshot.val()
                                if (category) {
                                    if (category.children) {
                                        category.children += `, ${data.key}`
                                    } else {
                                        category = {
                                            ...category,
                                            children: data.key
                                        }
                                    }
                                    db.child(paylaod.parent).set(category)
                                    .then(_ => {
                                        commit('remove_category', paylaod.parent)
                                        commit('add_category', {
                                            ...category,
                                            id: paylaod.parent
                                        })
                                    })
                                }
                            })
                    }

                    commit('add_category', {
                        ...paylaod,
                        id: data.key
                    })
                    commit('set_loading', false)
                    resolve(data)
                }).catch(error => {
                    commit('set_loading', false)
                    console.log('Error occured in Create Category: '  + error)
                    reject(error)
                })
            })
        },
        delete_category({ commit }, paylaod) {
            return new Promise((resolve, reject) => {
                commit('set_loading', true)
                db.child(paylaod).once('value')
                .then(snapshot => {
                    const category = snapshot.val()
                    if (category && category.parent) {
                        db.child(category.parent).once('value')
                        .then(snap => {
                            let parent = snap.val()
                            if (parent && parent.children) {
                                let childs = parent.children
                                if (childs.includes(',')) {
                                    childs = childs.split(',')
                                    parent.children = childs.filter(function(child) {
                                        // console.log(child.trim(), paylaod, child.trim() == paylaod, child.trim() != paylaod || child.trim() != '')
                                        return child.trim() != paylaod || child.trim() != ''
                                    }).toString()
                                } else if (childs == paylaod) {
                                    parent.children = ''
                                }
                                db.child(category.parent).set(parent)
                                .then(_ => {
                                    commit('remove_category', category.parent)
                                    commit('add_category', {
                                        ...parent,
                                        id: category.parent
                                    })
                                })
                            }
                        })
                    }
                        db.child(paylaod).remove()
                            .then(_ => {
                                commit('remove_category', paylaod)
                                commit('set_loading', false)
                                resolve(true)
                            }).catch(error => {
                                console.log('Unexpected error in delete category ' + error)
                                commit('set_loading', false)
                                reject(false)
                            })
                })
                        
            })
        }, 
        update_category({ commit }, paylaod) {
            return new Promise((resolve, reject) => {
                commit('set_loading', true)
                let pid = paylaod.id
                delete paylaod.id

                
                db.child(pid).once('value')
                .then(value => {
                    let current = value.val()
                    if (current) {
                        if (current.parent != paylaod.parent) {
                            db.child(current.parent).once('value')
                            .then(old_parent => {
                                if (old_parent) {
                                    let childs = old_parent.children.split(',')
                                    childs = childs.filter(c => {
                                        return c.trim() != pid || c.trim() != ''
                                    })
                                    old_parent.children = childs.toString()
                                    db.child(current.parent).set(old_parent).then(_ => {
                                        commit('remove_category', current.parent)
                                        commit('add_category', {
                                            ...old_parent,
                                            id: current.parent
                                        })
                                    })
                                }
                            })
                        }
                    }
                    if (paylaod.parent) {
                        db.child(paylaod.parent).once('value')
                            .then(snapshot => {
                                let category = snapshot.val()
                                if (category) {
                                    if (category.children) {
                                        category.children += ', ' + pid
                                    } else {
                                        category = {
                                            ...category,
                                            children: pid
                                        }
                                    }
                                    db.child(paylaod.parent).set(category)
                                        .then(_ => {
                                            commit('remove_category', paylaod.parent)
                                            commit('add_category', {
                                                ...category,
                                                id: paylaod.parent
                                            })
                                        })
                                }
                            })
                        }
                    })
                    
                

                db.child(pid).set(paylaod)
                .then(() => {
                    commit('remove_category', pid)
                    commit('add_category', { ...paylaod, id: pid })
                    // commit('update_product', {...paylaod, id: pid})
                    commit('set_loading', false)
                    resolve(true)
                }).catch(error => {
                    console.log('Unexpected error at update category ' + error)
                    commit('set_loading', false)
                    reject(false)
                })
            })
        }
    },
    getters: {
        categories(state) {
            return state.categories
        },
        category(state) {
            return (param) => {
                return state.categories.find(category => {
                    return category.id == param
                })
            }
        },
        categories_with_child(state) {
            return state.categories.filter(category => {
                return category.children
            })
        },

        categories_without_child(state) {
            return state.categories.filter(category => {
                return !category.children && !category.parent
            })
        },
        search_in_categories(state) {
            return (param) => {
                const reversed = param.split('').reverse().join('').toLowerCase()
                return state.categories.filter(cat => {
                    return cat.id.toLowerCase() == param.toLowerCase() || cat.title.toLowerCase() == param.toLowerCase() || param.includes(cat.title) || cat.title.includes(param) || cat.id.toLowerCase() == reversed || cat.title.toLowerCase() == reversed || cat.title.includes(reversed) || reversed.includes(cat.title)
                })
            }
        }
    }
}