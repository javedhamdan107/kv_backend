import { MigrationInterface, QueryRunner } from "typeorm";

export class EmployeeAddressUpdated1691251909728 implements MigrationInterface {
    name = 'EmployeeAddressUpdated1691251909728'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employees" RENAME COLUMN "email" TO "username"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employees" RENAME COLUMN "username" TO "email"`);
    }

}
