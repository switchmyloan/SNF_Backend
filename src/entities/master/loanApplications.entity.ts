import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from '../common/base.entity';
import { UtmHeaders } from './UtmHeader.entity';

@Entity('loan_applications')
export class LoanApplication extends BaseEntity {
    @Column({ nullable: true })
    lookingFor!: string;

    @Column({ nullable: true })
    profile!: string;

    @Column({ nullable: true })
    monthlyIncome!: string;

    @Column({ nullable: true })
    loanAmount!: string;

    @Column()
    firstName!: string;

    @Column()
    lastName!: string;

    @Column({ length: 15 })
    mobileNumber!: string;

    @Column({ default: false })
    isMobileVerified!: boolean;

    @Column()
    email!: string;

    @Column({ default: false })
    isEmailVerified!: boolean;

    @Column()
    gender!: string;

    @Column({ type: 'date', nullable: true })
    dateOfBirth!: Date;

    @Column({ length: 11, nullable: true })
    panCard!: string;

    @Column({ length: 10 })
    cityPincode!: string;

    @Column({ type: 'text', nullable: true })
    consentCreditAccess!: string;

    @Column({ type: 'text', nullable: true })
    consentCommunication!: string;

    @Column({ nullable: true })
    ipAddress?: string;

    //Associtation
    @OneToMany(() => UtmHeaders, (utmHeader) => utmHeader.loanApplication)
    utmHeader!: UtmHeaders;

    // @OneToMany(() => UtmHeaders, (utmHeader) => utmHeader.loanApplication)
    // utmHeaders!: UtmHeaders[];
}
