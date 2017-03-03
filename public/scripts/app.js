var db = firebase.database();

// db.ref('views/dashboard').once('value').then((snapshot) => console.log(snapshot.val()))

// var app = new Vue({
//   el: '#app',
//   data: {
//     message: 'Hello Vue!'
//   }
// })

var vm = new Vue({
  el: '#demo',
  firebase: {
    // simple syntax, bind as an array by default
    anArray: db.ref('views/dashboard'),
    // can also bind to a query
    // anArray: db.ref('url/to/my/collection').limitToLast(25)
    // full syntax
    // anObject: {
    //   source: db.ref('url/to/my/object'),
    //   // optionally bind as an object
    //   asObject: true,
    //   // optionally provide the cancelCallback
    //   cancelCallback: function () {}
    // }
  }
})

// var example1 = new Vue({
//   el: '#example-1',
//   data: {
//     items: [
//       { message: 'Foo' },
//       { message: 'Bar' }
//     ]
//   }
// })
