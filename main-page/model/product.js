var promoProduct=[];
exports.getPromoProduct=async()=>{
    let result=[];
    const res= await fetch('https://api-scttshop.herokuapp.com/api/promotions/products');
    let  data=await res.json();
    data.forEach(element => {
        result.push(element);
    });
    this.promoProduct=result;
    //console.log(promoProduct)
}
exports.getProductDetail= async(ID)=>{
    var url='https://api-scttshop.herokuapp.com/api/products/'+ID
    const res= await fetch(url);
    let  data=await res.json();

    return data

}

