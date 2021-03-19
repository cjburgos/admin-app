module.exports = mongoose => {
    const User = mongoose.model(
        'User',
        mongoose.Schema({
            firstName: String,
            lastName: String,
            email: String,
            role: String,
            orgId: String,
            username: String,
            password: String
        },
        {
            timestamps: true
        })
    );

    return User
    
}