import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database";

export interface IWatchTime {
  seconds: number;
  userId: number;
  episodeId: number;
}

export interface WatchTimeInstance extends Model<IWatchTime>, IWatchTime {}

export const WatchTime = sequelize.define<WatchTimeInstance, IWatchTime>("WatchTime", {
  seconds: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {
      model: "users",
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },
  episodeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {
      model: "episodes",
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },
});
