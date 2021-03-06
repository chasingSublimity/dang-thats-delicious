const mongoose = require('mongoose');
const Store = mongoose.model('Store');

exports.homePage = (req, res) => {
	console.log(req.name);
	res.render('index');
};


exports.addStore = (req, res) => {
	res.render('editStore', {title: 'Add Store'});
};

exports.createStore = async (req, res) => {
	const store = await (new Store(req.body)).save();
	req.flash('success', `Successfully Created ${store.name}. Care to leave a review?`)
	res.redirect(`/stores/${store.slug}`);
};

exports.getStores = async (req, res) => {
	// 1. query the database for a list of all stores
	const stores = await Store.find();
	res.render('stores', {title: 'Stores', stores});
}

exports.editStore = async (req, res) => {
	// find the store by id
	const store = await Store.findOne({_id: req.params.id});
	// confirm they are the owner of the store
	// TODO
	// render out edit form
	res.render('editStore', {title: `Edit ${store.name}`, store})
}

exports.updateStore = async (req, res) => {
	// find and update store
	const store = await Store.findOneAndUpdate({_id: req.params.id}, req.body, {
		new: true, // return new store, instead of old one
		runValidators: true
	}).exec();
	// redirect to store and confirm
	req.flash('success', `Successfully updated <strong>${store.name}</strong> <a href="/stores/${store.slug}">View Store</a>`);
	res.redirect(`/stores/${store._id}/edit`);
}