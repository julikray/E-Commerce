// class queryProducts {
//     products =[]
//     query= {}
//     constructor(products , query){
//         this.products = products
//         this.query = query
//     }
//     categoryQuery = () =>{
//         this.products = this.query.category ? this.products.filter( c => c.category === this.query.category ) : this.products
//         return this
//     }

//      ratingQuery = () =>{
//         this.products = this.query.rating ? this.products.filter( c => parseInt(this.query.rating) <= c.rating && c.rating < parseInt(this.query.rating) +1 ) :  []
//         return this
//     }

//       priceQuery = () =>{
//         this.products =  this.products.filter( p => p.price >=  this.query.lowPrice && c.price <= this.query.highPrice )
//         return this
//     }

//     sortByPrice = () => {
//         if(this.query.sortByPrice){
//             if(this.query.sortByPrice === "low-to-high"){
//                 this.products = this.products.sort(function(a,b){return a.price - b.price })
//             }
//             else{
//                 this.products = this.products.sort(function(a,b) {return b.price - a.price })
//             }
//         }
//     }

//     skip = () => {
//         let {pageNumber} = this.query
//         const skipPage = (parseInt(pageNumber) - 1) * this.query.parPage

//         let skipProduct = []

//         for(let i = skipPage ; i < this.products.length ; i++ ){
//             skipProduct.push(this.products[i])
//         }
//         this.products = skipProduct
//         return this
//     }

//     limit = () => {

//         let temp = []
//         if(this.products.length > this.query.parPage ){
//             for(let i =0 ; i<this.query.parPage; i++ ){
//                 temp.push(this.products[i])
//             }
//         }
//         else{
//             temp = this.products
//         }
//         this.products = temp

//         return this
//     }

//     getProducts = () => {
//         return this.products
//     }
// }

// export default queryProducts








class queryProducts {
  products = [];
  query = {};

  constructor(products, query) {
    this.products = products;
    this.query = query;
  }

  categoryQuery = () => {
    if (this.query.category) {
      this.products = this.products.filter(p => p.category === this.query.category);
    }
    return this;
  };

  ratingQuery = () => {
    if (this.query.rating) {
      const rating = parseInt(this.query.rating);
      this.products = this.products.filter(
        p => rating <= p.rating && p.rating < rating + 1
      );
    }
    return this;
  };

  priceQuery = () => {
    if (this.query.lowPrice !== undefined && this.query.highPrice !== undefined) {
      const low = parseFloat(this.query.lowPrice);
      const high = parseFloat(this.query.highPrice);
      this.products = this.products.filter(p => p.price >= low && p.price <= high);
    }
    return this;
  };

  searchQuery = () => {
    this.products = this.query.searchValue ?  this.products.filter(p => p.name.toUpperCase().indexOf(this.query.searchValue.toUpperCase()) > -1 ) : this.products
    return this
  }

  sortByPrice = () => {
    if (this.query.sortByPrice) {
      if (this.query.sortByPrice === "low-to-high") {
        this.products.sort((a, b) => a.price - b.price);
      } else if (this.query.sortByPrice === "high-to-low") {
        this.products.sort((a, b) => b.price - a.price);
      }
    }
    return this;
  };

  skip = () => {
    const pageNumber = parseInt(this.query.pageNumber) || 1;
    const parPage = parseInt(this.query.parPage) || 12;
    const skipPage = (pageNumber - 1) * parPage;

    this.products = this.products.slice(skipPage);
    return this;
  };

  limit = () => {
    const parPage = parseInt(this.query.parPage) || 12;
    this.products = this.products.slice(0, parPage);
    return this;
  };

  getProducts = () => {
    return this.products;
  };
}

export default queryProducts;
