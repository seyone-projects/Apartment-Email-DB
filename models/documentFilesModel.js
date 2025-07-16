import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const DocumentFileSchema = new Schema(
  {
    documentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Document',
    },
    field: {
      type: String,
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
  },
  {
    timestamps: true,
  }
);

DocumentFileSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

const DocumentFile = model('DocumentFile', DocumentFileSchema);

export default DocumentFile;
