const AppError = require('../utils/AppError')



const allowedTo = (...roles) => {
    //დავაბრუნე req,res,next რომ არ ჩაჯდეს როლების მასივში
     return(req,res,next) => {    
            if(!roles.includes(req.user.role)){
                return next(new AppError('you dont have permission'))// ვაბრუნებთ ერორს თუ როლი სხვა არი
            }
        next() //ვაბრუნებთ nexts  რომ გაეშვას შემდეგი ფუნქცია
    }
}


const protect = async (req, res, next) => {
    try {
        
        const token = req.cookies?.token;

        if (!token) {
            return next(new AppError("you are not authorized", 401));
        }

       
        const decoded = jwt.verify(token, process.env.JWT_SECRET);


        if (!decoded) {
            return next(new AppError("incorrect token", 401));
        }

        
        const user = await user.findById(decoded.id);

        if (!user) {
            return next(new AppError("user doent exist", 404));
        }
        
        if(!user.isVerified){
            return next(new AppError('Verify your account🥀',401))
        }
        
        req.user = user;

       
        next();
    } catch (error) {
        console.error("Auth Middleware Error:", error.message);

        // Handle token expiration separately
        if (error.name === "TokenExpiredError") {
            return next(new AppError("expired token", 401));
        }

        return next(new AppError("you are not authorized!", 401));
    }
};

module.exports = {protect,allowedTo}