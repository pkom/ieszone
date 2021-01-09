import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'refresh_tokens' })
export class RefreshToken {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  isRevoked: boolean;

  @Column({ type: 'timestamptz' })
  expires: Date;
}
