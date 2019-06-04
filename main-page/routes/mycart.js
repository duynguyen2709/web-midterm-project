var express = require('express');
var router = express.Router();
var cart_controller = require('../controllers/mycart.js');

router.get('/',cart_controller.get_page);

router.get('/applycoupon', cart_controller.apply_coupon);

router.get('/update', cart_controller.update);

router.post('/addproduct',cart_controller.addProduct);

// router.get('/addproduct',cart_controller.addCart);


module.exports = router;
// <!-- <%for (var i=0;i< list.length;i++){ %>
//     <tr>
//         <td><a class="remove" href="#"><fa class="fa fa-close"></fa></a></td>
//         <td><a href="#"><img src=<%= list[i].image %>alt="img"></a></td>
//         <td><a class="aa-cart-title" href="#"><%= list[i].name %></a></td>
//         <td><%= list[i].price %></td>
//         <td><input class="aa-cart-quantity" type="number" value="1"></td>
//         <td><%= list[i].price*list[i].count %></td>
//       </tr>
// <%}%> -->
