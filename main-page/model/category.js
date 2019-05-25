

exports.getName=function()
{
    return categoryName+categorySubType;
}
exports.getLinkProduct=function()
{
    return "/products/type?id="+categoryID;
}
exports.getListCategory= async ()=>
{
    let result=[];
    const res= await fetch('https://api-scttshop-v2.herokuapp.com/api/categories');
    let  data=await res.json();
    data.forEach(element => {
            result.push({name: element.categoryName, Id: element.categoryID});
    });
    return result;
}