import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "editoriales", synchronize: true })
export class Editorial extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  caption: string;

  @Column()
  publish_date_text: string;

  @Column()
  publish_date_utc: Date;

  @Column()
  paragraph_qty: number;

  @Column({
    type: "longtext",
  })
  body: string;
}
