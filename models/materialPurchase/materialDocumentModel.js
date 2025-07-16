import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const MaterialDocumentSchema = new Schema(
  {
    materialHistoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'MaterialHistory',
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

MaterialDocumentSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

const MaterialDocument = model('MaterialDocument', MaterialDocumentSchema);

export default MaterialDocument;
