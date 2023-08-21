import { DataTypes, Model, Optional } from "sequelize";
import { CourseInstance } from "./Course";
import { UserInstance } from "./User";
import { sequelize } from "../database";

export interface Favorite {
  userId: number;
  courseId: number;
}

export interface FavoriteInstance extends Model<Favorite>, Favorite {
  Course?: CourseInstance;
  User?: UserInstance;
}

export const Favorite = sequelize.define<FavoriteInstance, Favorite>("Favorite", {
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
  courseId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {
      model: "courses",
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },
});
