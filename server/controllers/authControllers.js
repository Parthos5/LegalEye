const asyncHandler = require('express-async-handler')

//@desc Login
//@route POST /auth
//@access Public
const login = asyncHandler(async(req, res) => {

    const { username, password } = req.body

    if(!username || !password) {
        return res.status(400).json({ message: "All fields are required!" })
    }

    
})