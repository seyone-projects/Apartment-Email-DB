import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const MarketplaceInterestSchema = new Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        marketPlaceId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'MarketPlace',
        },
        interestedId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        createdAt: {
            type: Date,
        },
        
    },
    {
        timestamps: true,
    }
);

MarketplaceInterestSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

const MarketPlaceInterest = model('MarketplaceInterest', MarketplaceInterestSchema);

export default MarketPlaceInterest;
