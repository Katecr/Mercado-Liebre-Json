const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

function writeFileJson() {
	fs.writeFileSync(productsFilePath,JSON.stringify(products),'utf-8');
} 

const controller = {
	// Root - Show all products
	index: (req, res) => {
		res.render('products',{
			products
		});
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		let idProduct = req.params.id;
		product = products.find(item => item.id == idProduct);
		res.render('detail',{product});
	},

	// Create - Form to create
	create: (req, res) => {
		res.render('product-create-form');
	},
	
	// Create -  Method to store
	store: (req, res) => {
		const {name, description, price, discount,image, category} = req.body;

		let idPrev = products.length;
		const dataNew = {
			id: idPrev + 1,
			name, 
			description,
			price, 
			discount,
			image: null, 
			category
		}
		products.push(dataNew);
		writeFileJson();
		res.render('products',{
			products
		});
	},

	// Update - Form to edit
	edit: (req, res) => {
		let idProduct = req.params.id;
		productToEdit = products.find(item => item.id == idProduct);
		res.render('product-edit-form',{productToEdit});
	},
	// Update - Method to update
	update: (req, res) => {
		const {name, description, price, discount,image, category} = req.body;
		idProduct = req.params.id;
		products.map(item =>{
			if(item.id == idProduct){
				item.name = name, 
				item.description = description,
				item.price = price, 
				item.discount = discount,
				item.name = null, 
				item.category = category
			}
			products.push(item);
		});		
		writeFileJson();
		res.redirect("/");		
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		idProduct = req.params.id;
		const productsNews = [];
		products.map(item =>{
			if(item.id != idProduct){
				productsNews.push(item);
			}			
		});		
		fs.writeFileSync(productsFilePath,JSON.stringify(productsNews),'utf-8');
		res.render('index',{
			products:productsNews
		});	
	}
};

module.exports = controller;