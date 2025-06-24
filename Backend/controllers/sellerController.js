import sellerModel from "../models/sellerModel.js";

class sellerController {


  async getSellerReq(req, res) {
    const { page, searchValue, parPage } = req.query;

    const pageNumber = parseInt(page) || 1;
    const itemsPerPage = parseInt(parPage) || 10;

    try {
      let skipPage = "";
      if (parPage && page) {
        skipPage = itemsPerPage * (pageNumber - 1);
      }
      let query = {};

      if (searchValue) {
        query = {
          $or: [
            { name: { $regex: searchValue, $options: "i" } },
            { slug: { $regex: searchValue, $options: "i" } },
          ],
        };
      }

      const sellers = await sellerModel
        .find({ status: "pending", ...query })
        .skip(skipPage)
        .limit(itemsPerPage)
        .sort({ createdAt: -1 });

      const totalSeller = await sellerModel
        .find({ status: "pending", ...query })
        .countDocuments();

      return res.status(200).json({ sellers, totalSeller });
    } catch (error) {
      console.error("Error fetching categories:", error);
      return res.status(500).send("Internal Server Error");
    }
  }


  async getSeller(req, res) {
    const { sellerId } = req.params;

    try {
      const seller = await sellerModel.findById(sellerId);

      return res.status(200).json({ seller });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async sellerStatusUpdate(req, res) {
    const { sellerId , status } = req.body;

    // console.log(req.body)

    try {
      await sellerModel.findByIdAndUpdate(sellerId ,{
        status
      })
      const seller = await sellerModel.findById(sellerId);
      return res.status(200).json({ seller , message: 'Seller status update' });
      
    } catch (error) {
      return res.status(500).json({ error: error.message });
      
    }

    
  }

  async getActiveSeller(req, res){
    
    let {page , searchValue , parPage } = req.query
    page = parseInt(page)
    parPage = parseInt(parPage)

    const skipPage = parPage * (page - 1)

    try {
      if(searchValue) {
        const sellers = await sellerModel.find({
          $text: { $search : searchValue },
          status: 'active'

        }).skip(skipPage).limit(parPage).sort({createdAt: -1})

        const totalSeller = await sellerModel.find({
          $text: { $search : searchValue },
          status: 'active'
        }).countDocuments()

         return res.status(200).json({ sellers , totalSeller });

      } else {

         const sellers = await sellerModel.find({ status: 'active' }).skip(skipPage).limit(parPage).sort({createdAt: -1})
         const totalSeller = await sellerModel.find({
           status: 'active'
         }).countDocuments()
   
   
         console.log(sellers)
         return res.status(200).json({ sellers , totalSeller });



      }


      
    } catch (error) {
       return res.status(500).json({ error: error.message });
      
    }

  }


   async getDeactiveSeller(req, res){
    
    let {page , searchValue , parPage } = req.query
    page = parseInt(page)
    parPage = parseInt(parPage)

    const skipPage = parPage * (page - 1)

    try {
      if(searchValue) {
        const sellers = await sellerModel.find({
          $text: { $search : searchValue },
          status: 'deactive'

        }).skip(skipPage).limit(parPage).sort({createdAt: -1})

        const totalSeller = await sellerModel.find({
          $text: { $search : searchValue },
          status: 'deactive'
        }).countDocuments()

         return res.status(200).json({ sellers , totalSeller });

      } else {

         const sellers = await sellerModel.find({ status: 'deactive' }).skip(skipPage).limit(parPage).sort({createdAt: -1})
         const totalSeller = await sellerModel.find({
           status: 'deactive'
         }).countDocuments()
   
   
         console.log(sellers)
         return res.status(200).json({ sellers , totalSeller });



      }


      
    } catch (error) {
       return res.status(500).json({ error: error.message });
      
    }

  }



}

export default new sellerController();
