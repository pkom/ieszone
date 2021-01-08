import { Exclude } from 'class-transformer';
import { UpdateDateColumn, CreateDateColumn } from 'typeorm';

export abstract class TimeStampEntity {
  @Exclude()
  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
