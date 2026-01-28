import mongoose, { Schema, Document } from "mongoose";

const serviceSchema = new Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    slug: { type: String, required: true, unique: true },
    type: { type: Schema.Types.ObjectId, ref: "ProductType" },
    identifier: { type: String, required: true, unique: true },
    
    description: [
      {
        type: { type: String, enum: ["paragraph", "list"], default: "paragraph" },
        content: { type: String, required: true },
      },
    ],

    status: { type: String, default: "PUBLISH", enum: ["PUBLISH", "DRAFT", "ARCHIVE"] },
    locationUrl: { type: String, required: true },
    foodIncluded: { type: Boolean, required: true },
    transportation: { type: Boolean, required: true },
    transportChoice: { type: Boolean, required: true },
    needPickupAddress: { type: Boolean, default: false },
    minParticipants: { type: Number, default: 2, min: 1 },
    maxParticipants: { type: Number, default: 99 },
    freeCancellationHours: { type: Number, default: 24 },
    duration: { type: String, required: true },

    includes: {
      city: {
        country: {
          name: { type: String },
          description: { type: String },
          coordinates: { type: [Number] },
        },
        timeZone: { type: String },
        name: { type: String },
        description: { type: String },
      },
      transportType: { type: Schema.Types.ObjectId, ref: "TransportType" },
      keywords: [{ type: Schema.Types.ObjectId, ref: "Keyword" }],
      availability: {
        timeSlotType: { type: String, enum: ["DAILY_FIXED", "DAILY_FLEXIBLE"], default: "DAILY_FIXED" },
        startTime: { type: String }, // HH:mm:ss
        displayStartTime: { type: String }, // 14:00-14:30
        endTime: { type: String },
        blockedDates: [{ type: Date }],
        blockedWeekdays: [{ type: String, enum: ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"] }],
        availableFromDate: { type: Date },
        availableToDate: { type: Date },
      },
      itinerary: [
        {
          pointType: {
            name: { type: String },
            description: { type: String }
          },
          sequenceOrder: { type: Number, required: true },
          geolocation: { type: String, required: true },
          description: { type: String }
        }
      ],
    },

    basePrices: [
      {
        // Reference the Tier ID directly for cleaner lookups
        serviceTier: { type: Schema.Types.ObjectId, ref: "ServiceTier", required: true },
        rateType: { type: String, enum: ["per person", "per group", "per vehicle"], default: "per person" },
        adultPrice: { type: Number, required: true },
        childPrice: { type: Number, default: 0 },
        infantPrice: { type: Number, default: 0 },
        groupPrice: { type: Number, default: null },
        transferPrice: { type: Number, default: null },
        isActive: { type: Boolean, default: true },
        validFrom: { type: Date, required: true },
        validTo: { type: Date, required: true }
      },
    ],

    assignmentPrices: [
      {
        serviceTier: { type: Schema.Types.ObjectId, ref: "ServiceTier", required: true },
        rateType: { type: String, enum: ["per person", "per group", "per vehicle"], default: "per person" },
        adultPrice: { type: Number, required: true },
        childPrice: { type: Number, default: 0 },
        infantPrice: { type: Number, default: 0 },
        groupPrice: { type: Number, default: null },
        transferPrice: { type: Number, default: null },
        isActive: { type: Boolean, default: true },
        validFrom: { type: Date, required: true },
        validTo: { type: Date, required: true }
      },
    ],

    infoIncludes: {
      includeRef: { type: Schema.Types.ObjectId, ref: "Includes", required: true },
      except: { type: String },
    },

    infoComparative: { type: Schema.Types.ObjectId, ref: "Comparative" },
    infoImportant: { type: Schema.Types.ObjectId, ref: "Important" },
    infoTransfers: { type: Schema.Types.ObjectId, ref: "Transfer" },
    infoFAQ: { type: Schema.Types.ObjectId, ref: "FAQ" },
    tourInfoBlocks: { type: Schema.Types.ObjectId, ref: "InfoBlocks" }
  },
  { timestamps: true }
);

export const Service = mongoose.model("Service", serviceSchema);