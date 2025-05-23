import { Sequelize, DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';

export class Note extends Model {
  public id!: string;
  public title!: string;
  public content!: string;
  public updatedAt!: Date;
  public isSynced!: boolean
}

Note.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    isSynced: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    }
  },
  {
    sequelize,
    modelName: 'Note',
  }
);