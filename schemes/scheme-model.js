const db = require('../data/db-config.js');

module.exports = {
    find,
    findById,
    findSteps,
    add,
    addStep,
    update,
    remove
};

function find() {
    return db('schemes');
}

function findById(id) {
    return db('schemes').where({ id }).first(); //first means its grabbing the first item in the array 
}

function findSteps(scheme_id) {
    return db('schemes as s')
    .join('steps as st','s.id', 'st.scheme_id')
    .select('s.id', 's.scheme_name', 'st.step_number', 'st.instructions')
    .orderBy('st.step_number')
    .where({ scheme_id })
}

function add(scheme) {
    return db('schemes').insert(scheme)
    .then(ids => {
        return findById(ids[0]);
    });
    //no catch because the catch will happen in the router
}

function addStep(step) {
    return db('schemes').insert(step)
    .then(ids => {
        return findById(ids[0]);
    });
    //no catch because the catch will happen in the router
}

// //resolves to updated user
function update(id, changes) {
    return db('schemes').where({ id }).update(changes)
    .then( count => {
        return findById(id)
    })
}

// //resolves to a count

function remove(id) {
    return db('schemes').where({ id }).del()
}