class Cart {
    constructor(oldCart) {
        this.array=oldCart.array||[]
        this.add = function (productID,categoryID,image,name,price,size) {
            let tmp;
            if (size)
            {
                tmp= new Product(productID,categoryID,image,name, price,1,size);
            }
            else
            {
                tmp= new Product(productID,categoryID,image,name, price,1,"S");
            }
            
            let flag=0;
            if(this.array){
                let i=0;
            for(i=0;i<this.array.length;i++){
                if(image===this.array[i].image&&name===this.array[i].name){
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
        this.remove=function(image,name,price,size){
            if(this.array){
                for(let i=0;i<this.array.length;i++){
                    if(image===this.array[i].image&&name===this.array[i].name){
                        this.array.splice(i,1);
                    }
                }
            }
            
        }
        this.update=function(image,name,price,count,size){
            if(this.array){
                for(let i=0;i<this.array.length;i++){
                    if(image===this.array[i].image&&name===this.array[i].name){
                        this.array[i].count=count;
                        this.array[i].size=size;
                    }
                }
            }
            
        }
        this.print=function(){
            console.log('------------------------------');
            let i=0;
            for(i=0;i<this.array.length;i++){
                console.log(this.array[i].productID+"   "+this.array[i].categoryID+"   "+this.array[i].image+"   "+this.array[i].count);
            }
            console.log('------------------------------');
        }
    }
}; 
class Product {
    constructor(productID,categoryID,image,name,price,count,size){
        this.productID=productID||0;
        this.categoryID=categoryID||0;
        this.image=image||"";
        this.name=name||"";
        this.price=price||0;
        this.count=count||0;
        this.size=size||"S"
    }
}
module.exports.Product = Product;
module.exports.Cart = Cart;