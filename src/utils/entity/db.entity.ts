import {
  Table,
  Column,
  Model,
  BelongsTo,
  AutoIncrement,
  ForeignKey,
} from 'sequelize-typescript';

@Table({ timestamps: false })
export class users extends Model {
  @Column
  user_name: string;

  @Column
  password: string;

  @Column({ type: 'uuid' })
  userid: string;
}

@Table({ timestamps: false })
export class courses extends Model {
  @Column
  courses_name: string;

  @Column
  required_course: string;
}

@Table({ timestamps: false })
export class user_courses extends Model {
  @Column
  is_complete: boolean;

  @Column
  is_active: boolean;

  @Column
  @ForeignKey(() => users)
  fk_id_user: number;

  @BelongsTo(() => users)
  users: users;

  @Column
  @ForeignKey(() => courses)
  fk_id_course: number;

  @BelongsTo(() => courses)
  courses: courses;
}
