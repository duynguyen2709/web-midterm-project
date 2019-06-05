class Cart {
    constructor(oldCart) {
        this.array=oldCart.array||[]
        this.add = function (image,name,price) {
            let tmp= new Product(image,name, price,0);
            let flag=0;
            if(this.array){
                let i=0;
            for(i=0;i<this.array.length;i++){
                if(image===this.array[i].image&&name===this.array[i].name){
                    this.array[i].count++;
                    flag=1;
                    break
                }
            }
            if(flag===0){
                this.array.push(tmp);
            }
            }
            else{
                this.array.push(tmp);
            }
            
        };
        this.print=function(){
            console.log('------------------------------');
            let i=0;
            for(i=0;i<this.array.length;i++){
                console.log(this.array[i].image+"   "+this.array[i].count);
            }
            console.log('------------------------------');
        }
    }
}; 
class Product {
    constructor(image,name,price,count){
        this.image=image||"";
        this.name=name||"";
        this.price=price||0;
        this.count=count||0;
    }
}
module.exports.Product = Product;
module.exports.Cart = Cart;