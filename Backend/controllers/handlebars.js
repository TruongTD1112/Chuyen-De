const handlebars = require('handlebars');
const template = handlebars.compile("Name:{{name}}");
console.log(template({name:"truong"}));