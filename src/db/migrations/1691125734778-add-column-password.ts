import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnPassword1691125734778 implements MigrationInterface {
    name = 'AddColumnPassword1691125734778'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employees" ADD "password" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "password"`);
    }

}
