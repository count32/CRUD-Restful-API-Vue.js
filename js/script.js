var users = [
	{id: 1, name: 'Jane', surname: 'Doe', email: 'Jane@gmail.com', country: 'USA', phone: 9875345555 },
	{id: 2, name: 'Joe', surname: 'Doe', email: 'Joe@gmail.com', country: 'China', phone: 9875345545 },
	{id: 3, name: 'Jasmine', surname: 'Doe', email: 'Jasmine@gmail.com', country:'Mexico', phone: 9823647325 },
];

function findUser (userId) {
	return users[findUserKey(userId)];
};

function validatePassword() {
		alert('The passwords do not match!');
		return;
};
function findUserKey (userId) {
	for (var key = 0; key < users.length; key++) {
		if (users[key].id == userId) {
			return key;
		}
	}
};

var List = Vue.extend({
	template: '#user-list',
	data: function () {
		return {users: users, searchKey: ''};
	}
});

var User = Vue.extend({
	template: '#user',
	data: function () {
		return {user: findUser(this.$route.params.user_id)};
	}
});

var UserEdit = Vue.extend({
	template: '#user-edit',
	data: function () {
		return {user: findUser(this.$route.params.user_id)};
	},
	methods: {
		updateUser: function () {
			var user = this.$get('user');
			users[findUserKey(user.id)] = {
				id: user.id,
				name: user.name,
				surname: user.surname,
				email: user.email,
				country: user.country,
				phone: user.phone,
			};
			router.go('/');
		}
	}
});

var UserDelete = Vue.extend({
	template: '#user-delete',
	data: function () {
		return {user: findUser(this.$route.params.user_id)};
	},
	methods: {
		deleteUser: function () {
			users.splice(findUserKey(this.$route.params.user_id), 1);
			router.go('/');
		}
	}
});

var AddUser = Vue.extend({
	template: '#register',
	data: function () {
		return {user: {name: '', surname: '', email: '', country: '', phone: ''}
		}
	},
	methods: {
		createUser: function() {
			var user = this.$get('user');
	if (user.password != user.confirmpassword) {validatePassword();}
			else{
			users.push({
				id: Math.random().toString().split('.')[1],
				name: user.name,
				surname: user.surname,
				email: user.email,
				country: user.country,
				phone: user.phone,
				password: user.password,
			});
			router.go('/');
		}
		}
	}
});


var router = new VueRouter();
router.map({
	'/': {component: List},
	'/user/:user_id': {component: User, name: 'user'},
	'/register': {component: AddUser},
	'/user/:user_id/edit': {component: UserEdit, name: 'user-edit'},
	'/user/:user_id/delete': {component: UserDelete, name: 'user-delete'}
})
	.start(Vue.extend({}), '#app');


