import { Exclude } from 'class-transformer';
import { UpdateDateColumn, CreateDateColumn } from 'typeorm';

export abstract class TimeStampEntity {
  @Exclude()
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
