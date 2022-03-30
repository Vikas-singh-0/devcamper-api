
const filterMiddleware = (model,populate)=>async (req,res,next)=>{
        

        let queryStr = {...req.query};
        let removeFields = ['select','sort','page','limit']

        removeFields.forEach(i=>delete queryStr[i])

        queryStr = JSON.stringify(queryStr);
        queryStr = queryStr.replace(/\b(gt|lte|gte|lt|in)\b/g,match=>`$${match}`)

        let query = model.find(JSON.parse(queryStr))

        if(populate){
            query = query.populate(populate)
        }

        if(req.query.select){
            const fields = req.query.select.split(',').join(' ')
            query = query.select(fields) 
        }

        if(req.query.sort){
            const sortBy = req.query.sort.split(',').join(' ')
            query=query.sort(sortBy)
        }else{
            query=query.sort('-createdAt')
        }

        //pagination
        const page = parseInt(req.query.page,10)||1;
        const limit = parseInt(req.query.limit,10)||10;
        const staartIndex = (page-1)*limit;
        const endIndex = page*limit;
        const total = await model.countDocuments();
        const pagination ={}

        // console.log(page,limit,staartIndex,endIndex,total);

        if(endIndex<total){
            pagination.next={
            page:page+1,
            limit
            }
        }
        if(staartIndex>0){
            pagination.prev={
            page:page-1,
            limit
            }
        }

        query = query.skip(staartIndex).limit(limit)

        // console.log(query);
        
        const results = await query;
        
        res.filterResults={
                status: "success",
                pagination,
                count: results.length,
                data: results 
            };

        next()

    }


module.exports = filterMiddleware;

