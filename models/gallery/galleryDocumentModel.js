import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const GalleryDocumentSchema = new Schema(
    {
        galleryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'galleries',
        },
        documentName: {
            type: String,
        },
        documentPath: {
            type: String,
        },
        documentType: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

GalleryDocumentSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

const GalleryDocument = model('GalleryDocument', GalleryDocumentSchema);

export default GalleryDocument;
