import fireApp from '../firebase'
const db = fireApp.database().ref('products')
const storage = fireApp.storage()

export default {
    state: {
        products: [],
    },
    mutations: {
        set_products(state, payload) {
            state.products = payload
        },
        add_product(state, payload) {
            state.products.push(payload)
        },
        remove_product(state, payload) {
            state.products = state.products.filter(product => {
                return product.id != payload
            })
        },
        update_product(state, payload) {
            const idx = state.products.indexOf(product => product.id == payload.id)
            if (idx != -1) {
                state.products[idx] = payload
            }
        }
    },
    actions: {
        load_products({ commit }) {
            commit('set_loading', true)
            db.once('value')
            .then(data => {
                const products = data.val()
                for (let key in products) {
                    let obj = {
                        ...products[key],
                        id: key
                    }   
                    commit('add_product', obj)
                }
                commit('set_loading', false)
            }).catch(error => {
                console.log(error)
                commit('set_loading', false)
            })
        },
        create_product({ commit }, payload) {
            return new Promise((resolve, reject) => {
                commit('set_loading', true) 
                let images = payload.images
                delete payload.images
                let refs = []

                images.forEach((image, key) => {
                    let fname = payload.title
                    let task = storage.ref(fname.replace(',', '') + (key + Math.random() * Math.random()) + new Date()).put(image)
                    task.then(snapshot => snapshot.ref.getDownloadURL())
                    .then(url => {
                        refs.push(url)
                    })
                    .then(_ => {
                        if (key == images.length - 1) {
                            db.push({
                                ...payload,
                                images: refs.toString()
                            })
                                .then(data => {
                                    commit('set_loading', false)
                                    commit('add_product', {
                                        ...payload,
                                        id: data.key
                                    })
                                    resolve(data)
                                }).catch(error => {
                                    commit('set_loading', false)
                                    console.log('Unexpected error in create_product: ' + error)
                                    reject(error)
                                })
                        }
                    })
                })
            })   
        },
        delete_product({ commit }, payload) {
            return new Promise((resolve, reject) => {
                commit('set_loading', true)
                db.child(payload).remove()
                    .then(_ => {
                        commit('remove_product', payload)
                        commit('set_loading', false)
                        resolve(true)
                    }).catch(error => {
                        commit('set_loading', false)
                        console.log('Unexpected error in delete_product: ' + error)
                        reject(error)
                    })
            })
        },
        update_product({ commit }, payload) {
            return new Promise((resolve, reject) => {
                commit('set_loading', true)
                let pid = payload.id
                delete payload.id
                let images = payload.images
                delete payload.images
                let refs = []
                if (images && images.length > 0) {
                    images.forEach((image, key) => {
                        let fname = payload.title
                        let task = storage.ref(fname.replace(',', '') + (key + Math.random() * Math.random()) + new Date()).put(image)
                        task.then(snapshot => snapshot.ref.getDownloadURL())
                            .then(url => {
                                refs.push(url)
                            })
                            .then(_ => {
                                if (images.length - 1 == key) {
                                    db.child(pid).once('value')
                                    .then(sn => {
                                        let product = sn.val()
                                        if (product) {
                                            let old_images = product.images
                                            if (old_images && old_images.includes(',')) {
                                                old_images = old_images.split(',')
                                                old_images.concat(refs)
                                            } else {
                                                if (old_images) {
                                                    refs.push(old_images)
                                                } 
                                                    old_images = refs
                                                
                                            }
                                            payload.images = old_images.toString()
                                            db.child(pid).set(payload)
                                                .then(_ => {
                                                    // commit('update_product', { ...product, id: pid })
                                                    commit('remove_product', pid)
                                                    commit('add_product', { ...payload , id: pid})
                                                    commit('set_loading', false)
                                                    resolve(true)
                                                }).catch(error => {
                                                    console.log('Unexpected error in update product: ' + error)
                                                    commit('set_loading', false)
                                                    reject(error)
                                                })
                                        }
                                    })
                                    
                                }
                            })
                    })
                } else {
                
                db.child(pid).set(payload)
                    .then(_ => {
                        // commit('update_product', { ...payload, id: pid })
                        commit('remove_product', pid)
                        commit('add_product', { ...payload, id: pid })
                        commit('set_loading', false)
                        resolve(true)
                    }).catch(error => {
                        console.log('Unexpected error in update product: ' + error)
                        commit('set_loading', false)
                        reject(error)
                    })
                }
            })
        },
        remove_image({ commit }, payload) {
            return new Promise((resolve, reject) => {
                commit('set_loading', true)
                db.child(payload.id).once('value')
                    .then(snapshot => {
                        let product = snapshot.val()
                        if (product) {
                            let images = product.images.split(',')
                            images = images.filter(image => {
                                return image != payload.imageURI || image.trim() != ''
                            })
                            // product.images = product.images.replace(payload.imageURI, '')
                            product.images = images.toString()
                            db.child(payload.id).set(product)
                                .then(_ => {
                                    commit('update_product', { ...product, id: payload.id })
                                    commit('set_loading', false)
                                    resolve(true)
                                }).catch(error => {
                                    console.log('Unexpected error in update product: ' + error)
                                    commit('set_loading', false)
                                    reject(error)
                                })
                        }
                        // reject(false)
                    })
            })
        }
    }, 
    getters: {
        products: (state) => {
            return state.products
        },
        product: (state) => {
            return (param) => {
                return state.products.find(product => {
                    return product.id == param || product.title == param
                })
            }
        },
        featured_products: (state) => {
            return state.products.filter(product => {
                return product.featured == true
            })
        },
        products_in_category: (state) => {
            return (category) => {
                return state.products.filter(product => {
                    return product.category == category
                })
            }
        },
        search_products: (state) => {
            return (query) => {
                const reversed = query.split('').reverse().join('').toLowerCase()
                return state.products.filter(product => {
                    return product.title.toLowerCase() == query || product.title.includes(query) || query.includes(product.title) ||
                        product.title.toLowerCase() == reversed || product.title.includes(reversed) || reversed.includes(product.title)
                })
            }
        },
    }
}