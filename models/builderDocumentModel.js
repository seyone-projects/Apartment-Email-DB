import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const BuilderDocumentSchema = new Schema(
  {
    builderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Builders',
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
    createdAt: {
      type: Date,
    },
    updatedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

BuilderDocumentSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

const BuilderDocument = model('BuilderDocument', BuilderDocumentSchema);

export default BuilderDocument;
