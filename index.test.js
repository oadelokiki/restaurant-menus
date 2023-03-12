const {sequelize} = require('./db')
const {Restaurant, Menu, Item} = require('./models/index')


const {
    seedRestaurant,
    seedMenu,
  } = require('./seedData');

describe('Restaurant and Menu Models', () => {
    /**
     * Runs the code prior to all tests
     */
    beforeAll(async () => {
        // the 'sync' method will create tables based on the model class
        // by setting 'force:true' the tables are recreated each time the 
        // test suite is run
        await sequelize.sync({ force: true });
    });

    test('can create a Restaurant', async () => {
        // TODO - write test
        let rest1 = await Restaurant.create({
		name: "a",
		location: "b",
		cuisine: "c",
	})
	expect(rest1.name).toEqual('a')
	expect(rest1.location).toEqual('b')
	    expect(rest1.cuisine).toEqual('c')

    });

    test('can create a Menu', async () => {
        // TODO - write test
	let menu1 = await Menu.create({
		title: "a"
	})
        expect(menu1.title).toEqual('a')
    });

    test('can find Restaurants', async () => {
        // TODO - write test
        let rest2 = await Restaurant.create({
                name: "unique",
                location: "b",
                cuisine: "c",
        })

	let result = await Restaurant.findAll({
                        name:'unique'
            })

	    expect(result.length).toBe(2);
	    rest2.destroy();
    });

    test('can find Menus', async () => {
        // TODO - write test
	
	let result = await Menu.findAll({
		title:"a"
	})
        expect(result.length).toEqual(1)
    });

    test('can delete Restaurants', async () => {
        // TODO - write test
	let rest1 = await Restaurant.create({
                name: "a",
                location: "b",
                cuisine: "c",
        })

	    let end = await rest1.destroy();
	let result = await Restaurant.findAll();
	    console.log(result)
        expect(result.length).toEqual(1)
    });
	
	test(('association bewteen menu and item'), async () => {
		let before = await Menu.findAll({include: Item});
		console.log("before: " +before.length);
		const testMenu = await Menu.create({
			title: "a la carte",
			Items: [{
				name: "crepe",
				image: "crepe.jpeg",
				price: 3.50,
				vegetarian: true

			}]
		})

		let after = await Menu.findAll({include: Item});

		console.log("after: " + after.length);
		
		expect(before.length < after.length).toBe(true);
	})	
})
