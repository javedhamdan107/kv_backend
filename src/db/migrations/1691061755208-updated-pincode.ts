import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatedPincode1691061755208 implements MigrationInterface {
    name = 'UpdatedPincode1691061755208'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "pincode"`);
        await queryRunner.query(`ALTER TABLE "address" ADD "pincode" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "pincode"`);
        await queryRunner.query(`ALTER TABLE "address" ADD "pincode" TIMESTAMP NOT NULL DEFAULT now()`);
    }

}
