import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchema1750986144370 implements MigrationInterface {
    name = 'InitSchema1750986144370'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "book" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "author" character varying NOT NULL, "publishedAt" TIMESTAMP NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a3afef72ec8f80e6e5c310b28a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "review" ("id" SERIAL NOT NULL, "bookId" integer NOT NULL, "reviewText" character varying NOT NULL, "rating" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_2e4299a343a81574217255c00ca" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "idx_bookId" ON "review" ("bookId") `);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "FK_ae1ec2fd91f77b5df325d1c7b4a" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "FK_ae1ec2fd91f77b5df325d1c7b4a"`);
        await queryRunner.query(`DROP INDEX "public"."idx_bookId"`);
        await queryRunner.query(`DROP TABLE "review"`);
        await queryRunner.query(`DROP TABLE "book"`);
    }

}
