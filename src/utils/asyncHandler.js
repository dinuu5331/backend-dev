const asyncHandler = async(fn)=> (req,res,next)=>{
    try {
         await fn(req,res,next);
    } catch (error) {
        console.error(error);
    }
}

export default {asyncHandler};


// method 2:

// const asyncHandler = (requestHandler)=>{
//     (req,res,next)=>{
//         Promise.resolve(requestHandler(req,res,next))
//         .catch((err)=>{next(err)})
//     }
// }

// export {asyncHandler}