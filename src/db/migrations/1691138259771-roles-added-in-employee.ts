import { MigrationInterface, QueryRunner } from "typeorm";

export class RolesAddedInEmployee1691138259771 implements MigrationInterface {
    name = 'RolesAddedInEmployee1691138259771'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employees" ADD "role" character varying NOT NULL DEFAULT 'Developer'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "role"`);
    }

}
