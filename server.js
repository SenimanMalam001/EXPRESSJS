const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const data = require('./models/items.json')
/*console.log(data)*/
const app = express()

//setup view engine/
app.set('views', path.join(__dirname, 'views'))// membuat folder tamplates yang isi nya adalah semua tampilan
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({
	extended : false
}))
app.use(express.static('public'))//membuar folder static public



/*
const middlewareSatu = (req, res, next) => {
	console.log('MiddlewareSatu Pertama')
	next()
}

const middlewareDua = (req, res, next) => {
	console.log('MiddlewareSatu Dua')
	next()
}


app.use(middlewareSatu)
app.use(middlewareDua)
*/

app.get('/', (request, response) => {
	//render ambil data html disni
	response.render('index', {
		items: data
	})
})

app.get('/detail/:id', (req, res) => {
	//console.log(typoef req.params.id) cara cek tipe data
	const item = data.find(d => {
		return d.id === parseInt(req.params.id)
	})
	res.render('detail', {
		item : item
	})
})


app.get('/echo', (req, res) => {
	res.render('post')
})
app.post('/echo', (req, res)=>{
	res.render('post', {
		nama : req.body.nama

	})
})

app.listen(5432, () => console.log('Magic happen at http://localhost:5432/'))

/*
app.get('/echo/:nama', (req, res) => {
	res.render('index', {
		data: req.params.nama
	})
})

app.get('/pindah', (req, res) => {
	res.redirect('/echo/nama')
})

app.get('/download', (req, res) => 	{
	res.sendFile('/media/elfin/Picture/1.png')
})
*/

