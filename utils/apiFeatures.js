class APIfeatures {
  constructor(query, queryStrng) {
    this.query = query
    this.queryStrng = queryStrng

    
  }

  filter() {
     const queryObj = { ...this.queryStrng };// make a copy of req.query so we can modify query parameterd
  const excludedFields = ['page','sort', 'limit', 'fields']


  excludedFields.forEach(element => {
    delete queryObj[element]
    
  });
    // 2) ADVANCED FILTERING
   let queryStrng = JSON.stringify(queryObj)
   queryStrng = queryStrng.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`)
    

   this.query = this.query.find(JSON.parse(queryStrng))

   return this // here this means returning this entire whole object
   
  



  }

  sort() {

    if (this.queryStrng.sort) {
      const sortBy = this.queryStrng.sort.split(',').join(' ')
      // split() method ns js divides a string into an ordered list of substrings, places these substrings into a new array, and returns that array. This method does not modify the original string
      // join() is a Array method where it returns a new string that is the concatenation of all elements in this array, separated by commas or a specified separator string. 
      this.query = this.query.sort(sortBy)

    } else {
      this.query = this.query.sort('-createdAt')
    
      
    }
    return this
  }
   
  limitFields () {
     if (this.queryStrng.fields) {
      const fields = this.queryStrng.fields.split(',').join(' ')
      this.query = this.query.select(fields)
      
    } else {
      this.query = this.query.select('-__v')
      //.select() is a Mongoose Query method used to control which fields MongoDB returns in the documents.
      
    }
     return this

  }

  pagination () {
    const page = this.queryStrng.page * 1 || 1
    const limit = this.queryStrng.limit * 1 || 100
    // * 1 because the number will be a string in query and have to convert to number
    const skip = (page - 1) * limit

    this.query = this.query.skip(skip).limit(limit)
     
    return this
   
  }
  
}

export {APIfeatures}